/* Generated by SharpKit 5 v5.4.9 */

if (typeof(dbr) == "undefined")
    var dbr = {};
if (typeof(dbr.grid) == "undefined")
    dbr.grid = {};
dbr.grid.Grid = function (el, opts){
    this.SearchTimer = null;
    this.TotalPages = null;
    this.CurrentList = null;
    this.tbSearch = null;
    this.OrderByCol = null;
    this.OrderByColClickCount = null;
    this.Options = null;
    this.El = null;
    this.CurrentListBeforePaging = null;
    this.El = el;
    this.Options = opts;
    this.SearchTimer = new Timer($CreateDelegate(this, this.Search));
    this.Render();
};
dbr.grid.Grid.prototype.Render = function (){
    this.Verify();
    this.RenderSearch();
    this.RenderPager();
    this.RenderTable();
};
dbr.grid.Grid.prototype.Verify = function (){
    if (this.Options.Columns == null)
        this.Options.Columns =  [];
    if (this.Options.PageIndex == null)
        this.Options.PageIndex = 0;
    if (this.Options.PageSize == null)
        this.Options.PageSize = 20;
    if (this.Options.Items == null)
        this.Options.Items =  [];
    this.Options.Columns.forEach($CreateAnonymousDelegate(this, function (col){
        if (col.Name == null && col.Prop != null)
            col.Name = dbr.Extensions2.ItemProp$1(this.Options.Items, col.Prop);
        if (col.Getter == null && col.Prop != null)
            col.Getter = col.Prop;
        if (col.Getter == null && col.Name != null)
            col.Getter = $CreateAnonymousDelegate(this, function (t){
                return t[col.Name];
            });
        if (col.Title == null && col.Name != null)
            col.Title = col.Name;
        if (col.Visible == null)
            col.Visible = true;
    }));
    this.CurrentList = this.Options.Items;
    this.ApplyQuery();
    this.ApplyOrderBy();
    this.ApplyPaging();
};
dbr.grid.Grid.prototype.ApplyOrderBy = function (){
    if (this.Options.OrderBy == null)
        return;
    if (this.Options.OrderByDesc)
        this.CurrentList = this.CurrentList.orderByDescending(this.Options.OrderBy);
    else
        this.CurrentList = this.CurrentList.orderBy(this.Options.OrderBy);
};
dbr.grid.Grid.prototype.ApplyPaging = function (){
    this.TotalPages = Math.ceil(this.CurrentList.length / this.Options.PageSize);
    if (this.Options.PageIndex >= this.TotalPages)
        this.Options.PageIndex = this.TotalPages - 1;
    if (this.Options.PageIndex < 0)
        this.Options.PageIndex = 0;
    var from = this.Options.PageIndex * this.Options.PageSize;
    var until = from + this.Options.PageSize;
    this.CurrentListBeforePaging = this.CurrentList;
    this.CurrentList = this.CurrentList.slice(from, until);
};
dbr.grid.Grid.prototype.ApplyQuery = function (){
    if (Q.isNullOrEmpty(this.Options.Query))
        return;
    var tokens = this.Options.Query.toLowerCase().split(" ");
    this.CurrentList = this.CurrentList.where($CreateAnonymousDelegate(this, function (obj){
        var line = this.Options.Columns.select($CreateAnonymousDelegate(this, function (col){
            return col.Getter(obj);
        })).join(" ").toLocaleLowerCase();
        var match = tokens.all($CreateAnonymousDelegate(this, function (token){
            return line.contains(token);
        }));
        return match;
    }));
};
dbr.grid.Grid.prototype.Search = function (){
    this.Render();
};
dbr.grid.Grid.prototype.OrderBy = function (col){
    if (this.OrderByCol != col){
        this.OrderByColClickCount = 1;
        this.OrderByCol = col;
        this.Options.OrderBy = $CreateAnonymousDelegate(this, function (t){
            return this.OrderByCol.Getter(t);
        });
        this.Options.OrderByDesc = false;
    }
    else {
        this.OrderByColClickCount++;
        if (this.OrderByColClickCount == 2){
            this.Options.OrderByDesc = true;
        }
        else if (this.OrderByColClickCount == 3){
            this.Options.OrderBy = null;
            this.OrderByCol = null;
            this.OrderByColClickCount = null;
        }
    }
    this.Render();
};
dbr.grid.Grid.prototype.RenderTable = function (){
    var table = this.El.getAppend("table");
    var thead = table.getAppend("thead");
    var tbody = table.getAppend("tbody");
    var tfoot = table.getAppendRemove("tfoot", this.Options.FooterItem != null ? 1 : 0);
    var visibleColumns = this.Options.Columns.where($CreateAnonymousDelegate(this, function (t){
        return t.Visible == true;
    }));
    var ths = thead.getAppend("tr").bindChildrenToList("th", visibleColumns, $CreateAnonymousDelegate(this, function (th, col){
        this.RenderHeaderCell(col, th);
    }));
    var list = this.CurrentList;
    tbody.bindChildrenToList("tr", list, $CreateAnonymousDelegate(this, function (tr, obj, i){
        var trClass = "";
        if (this.Options.RowClass != null)
            trClass = this.Options.RowClass(obj, i);
        if (tr[0].className != trClass)
            tr[0].className = trClass;
        tr.bindChildrenToList("td", visibleColumns, $CreateAnonymousDelegate(this, function (td, col){
            this.RenderCell(col, obj, td);
        }));
    }));
    if (this.Options.FooterItem != null){
        tfoot.getAppend("tr").bindChildrenToList("th", visibleColumns, $CreateAnonymousDelegate(this, function (th, col){
            this.RenderCell(col, this.Options.FooterItem, th);
        }));
    }
    if (visibleColumns.first($CreateAnonymousDelegate(this, function (t){
        return t.Width != null;
    })) != null){
        table.css("width", "");
        var widths = visibleColumns.select($CreateAnonymousDelegate(this, function (col, i){
            var th = ths[i];
            if (col.Width == null)
                return th.offsetWidth;
            return col.Width;
        }));
        visibleColumns.forEach($CreateAnonymousDelegate(this, function (col, i){
            var th = ths[i];
            if (col.Width == null)
                th.style.width = th.offsetWidth + "px";
        }));
        var totalWidth = widths.sum();
        table.css("width", totalWidth + "px");
    }
};
dbr.grid.Grid.prototype.RenderHeaderCell = function (col, th){
    if (col.RenderHeaderCell != null){
        col.RenderHeaderCell(col, th);
        return;
    }
    th.off();
    th.mousedown($CreateAnonymousDelegate(this, function (e){
        if (e.which != 1)
            return;
        e.preventDefault();
        this.OrderBy(col);
    }));
    th.text((col.Title != null ? col.Title : col.Name));
    var classes =  [];
    if (col.Class != null)
        classes.push(col.Class);
    if (col == this.OrderByCol){
        classes.push("OrderBy");
        if (!this.Options.OrderByDesc)
            classes.push("Asc");
        if (this.Options.OrderByDesc)
            classes.push("Desc");
    }
    th[0].className = classes.join(" ");
    if (col.Width != null)
        th.css("width", col.Width + "px");
};
dbr.grid.Grid.prototype.RenderCell = function (col, item, td){
    if (col.RenderCell != null){
        col.RenderCell(col, item, td);
        return;
    }
    var value = item;
    if (col.Getter != null)
        value = col.Getter(item);
    var sValue = value;
    if (col.Format != null && value != null)
        sValue = col.Format(value);
    if (sValue == null)
        sValue = "";
    td.text(sValue).attr("title", sValue);
    var classes =  [];
    if (col.Class != null)
        classes.push(col.Class);
    if (col.ClassFunc != null)
        classes.push(col.ClassFunc(value));
    var cn = classes.join(" ");
    if (td[0].className != cn)
        td[0].className = cn;
};
dbr.grid.Grid.prototype.RenderSearch = function (){
    var searchEl = this.El.getAppend(".Search").addClass("form-inline");
    this.tbSearch = searchEl.getAppend("input.tbSearch").addClass("form-control").attr("placeholder", "Find");
    if (this.tbSearch.data("x") == null){
        this.tbSearch.data("x", true);
        this.tbSearch.on("input", $CreateAnonymousDelegate(this, function (e){
            this.Options.Query = this.tbSearch.val();
            this.SearchTimer.set(1);
        }));
    }
};
dbr.grid.Grid.prototype.RenderPager = function (){
    this.El.toggleClass("HasNoPages", this.TotalPages == 0);
    this.El.toggleClass("HasOnePage", this.TotalPages == 1);
    this.El.toggleClass("HasManyPages", this.TotalPages > 1);
    this.El.toggleClass("HasPrevPage", this.Options.PageIndex > 0);
    this.El.toggleClass("HasNextPage", this.Options.PageIndex < this.TotalPages - 1);
    var pages = Array.generateNumbers(0, this.TotalPages);
    var pager = this.El.getAppend(".Pager");
    pager.getAppend("a.PrevPage").text("Prev").off().mousedown($CreateAnonymousDelegate(this, function (e){
        e.preventDefault();
        this.Options.PageIndex--;
        this.Render();
    }));
    var info = pager.getAppend(".PagerInfo");
    info.text(this.Options.PageIndex + 1 + " / " + this.TotalPages + " (Total: " + this.CurrentListBeforePaging.length + ")");
    pager.getAppend("a.NextPage").text("Next").off().mousedown($CreateAnonymousDelegate(this, function (e){
        e.preventDefault();
        this.Options.PageIndex++;
        this.Render();
    }));
};
dbr.grid.Grid.prototype.GetItem = function (el){
    return dbr.Extensions2.DataItem$1(el.closest("tr"));
};
dbr.grid.Grid.Get = function (el){
    return el.data("Grid");
};
dbr.grid.Extensions5 = function (){
};
dbr.grid.Extensions5.ToGrid = function (list, j, opts){
    opts.Items = list;
    return j.Grid(opts);
};
jQuery.fn.Grid = function (opts){
    this.toArray().forEach($CreateAnonymousDelegate(this, function (el){
        var el2 = $(el);
        var grid = el2.data("Grid");
        if (grid != null){
            grid.Options = opts;
            grid.El = $(el);
            grid.Render();
        }
        else {
            grid = new dbr.grid.Grid(el2, opts);
            el2.data("Grid", grid);
            grid.Render();
        }
    }));
    return this;
};
$Inherit(jQuery, $);

