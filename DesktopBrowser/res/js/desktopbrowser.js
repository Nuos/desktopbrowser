/* Generated by SharpKit 5 v5.4.9 */

var IsIE6 = false;
var IsWebKit = false;
IsIE6 = ((window.navigator.userAgent.indexOf("MSIE 6.") != -1) && (window.navigator.userAgent.indexOf("Opera") == -1));
IsWebKit = (window.navigator.userAgent.indexOf("AppleWebKit") != -1);
function ApplyExactTemplate(el, template){
    if (el.getAttribute("_IsTemplated"))
        return null;
    el.setAttribute("_IsTemplated", true);
    var tmp = template.cloneNode(true);
    tmp.id = "";
    $(el).replaceWith(tmp);
    $("#Element", tmp).replaceWith(el);
    return tmp;
};
function ApplyTemplates(){
    $("#Templates").children().each(function (i, templateEl){
        templateEl.setAttribute("_IsTemplated", true);
        var className = "." + templateEl.id;
        $(className).each(function (index, t){
            ApplyExactTemplate(t, templateEl);
        });
    });
};
function ApplyTemplate(el){
    var className = el.className;
    if (className.length > 0){
        var templateEl = document.getElementById(className);
        if (templateEl != null && templateEl.parentElement.id == "Templates")
            return ApplyExactTemplate(el, templateEl);
    }
    return null;
};
function ParseQueryString(search){
    var obj = new Object();
    var pairs = search.substring(1).split("&");
    for (var $i2 = 0,$l2 = pairs.length,pair = pairs[$i2]; $i2 < $l2; $i2++, pair = pairs[$i2]){
        var tokens = pair.split("=");
        obj[decodeURIComponent(tokens[0])] = decodeURIComponent(tokens[1]);
    }
    return obj;
};
function GetFormData(inputMappings, suffix){
    var obj2 = inputMappings;
    var data = new Object();
    for (var p in obj2){
        var id = obj2[p];
        if (suffix != null)
            id += suffix;
        var input = document.getElementById(id);
        if (input == null)
            continue;
        if (input.type == "checkbox")
            data[p] = input.checked;
        else
            data[p] = input.value;
    }
    return data;
};
function GetRepeatedFormData(inputMappings){
    var list =  [];
    var i = 0;
    while (true){
        i++;
        var data = GetFormData(inputMappings, i.toString());
        if (data == null)
            return list;
        list.push(data);
    }
};
function FixBrowserCompatibilityIssues(){
    if (IsIE6 || IsWebKit){
        $("a").each(function (i, el){
            FixAnchor(el);
        });
    }
};
function FixAnchor(el){
    if (el == null || el.nodeName != "A")
        return;
    if (!IsWebKit)
        return;
    var a = el;
    if (a.href == null || a.href.length == 0)
        a.href = "javascript:void(0);";
};
function SmoothScrollTo(id){
    $("html,body").animate({
        scrollTop: $("#" + id).offset().top
    }, "slow");
};
function SmoothScrollToTop(){
    $("html,body").animate({
        scrollTop: 0
    }, "slow");
};
if (typeof(dbr) == "undefined")
    var dbr = {};
dbr.SiteExtensions = function (){
};
dbr.SiteExtensions.removeLast = function (s, count){
    if (count == null || count <= 0)
        return s;
    return s.substr(0, s.length - count);
};
dbr.SiteExtensions.ToDefaultDate = function (s){
    if (Q.isNullOrEmpty(s))
        return null;
    return Date.tryParseExact(s, ["yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd"]);
};
dbr.SiteExtensions.ToDefaultDateString = function (date){
    if (date == null)
        return null;
    return date.format("yyyy-MM-dd");
};
dbr.SiteExtensions.ToDefaultDateTimeString = function (date){
    if (date == null)
        return null;
    return date.format("yyyy-MM-dd HH:mm:ss");
};
dbr.SiteExtensions.ToFriendlyRelative2 = function (dt, rel){
    if (rel == null)
        rel = Date.current();
    if (dt.Year == rel.Year){
        if (dt.Month == rel.Month){
            if (dt.Day == rel.Day){
                return dt.format("HH:mm").toLowerCase();
            }
            return dt.format("MMM d");
        }
        return dt.format("MMM d");
    }
    return dt.format("d/M/yy");
};
dbr.SiteServiceClient = function (){
    this.Url = null;
    this.Url = "/api";
};
dbr.SiteServiceClient.prototype.ListFiles = function (req, cb){
    return this.Invoke("ListFiles", req, cb);
};
dbr.SiteServiceClient.prototype.GetFiles = function (req, cb){
    return this.Invoke("GetFiles", req, cb);
};
dbr.SiteServiceClient.prototype.GetFileRelatives = function (req, cb){
    return this.Invoke("GetFileRelatives", req, cb);
};
dbr.SiteServiceClient.prototype.GetFile = function (req, cb){
    return this.Invoke("GetFile", req, cb);
};
dbr.SiteServiceClient.prototype.Execute = function (req, cb){
    return this.Invoke("Execute", req, cb);
};
dbr.SiteServiceClient.prototype.Delete = function (req, cb){
    return this.Invoke("Delete", req, cb);
};
dbr.SiteServiceClient.prototype.Invoke = function (action, prms, callback){
    var xhr = $.ajax({
        url: this.Url + "/" + action,
        data: prms,
        complete: $CreateAnonymousDelegate(this, function (a, b){
            if (callback != null)
                callback(JSON.parse(a.responseText));
        })
    });
    return xhr;
};
if (typeof(dbr.utils) == "undefined")
    dbr.utils = {};
dbr.utils.JsArrayEnumerator = function (array){
    this.Array = null;
    this.Index = 0;
    this.Array = array;
    this.Index = -1;
};
dbr.utils.JsArrayEnumerator.prototype.MoveNext = function (){
    this.Index++;
    return this.Index < this.Array.length;
};
dbr.utils.JsArrayEnumerator.prototype.get_Current = function (){
    return this.Array[this.Index];
};
dbr.utils.JsArrayEnumerator.prototype.Dispose = function (){
};
dbr.utils.JsArrayEnumerator.prototype.Reset = function (){
    this.Index = -1;
};
Array.prototype.GetEnumerator = function (){
    return new dbr.utils.JsArrayEnumerator(this);
};
$Inherit(Array, Array);
dbr.utils.JsExtensions = function (){
};
dbr.utils.JsExtensions.Trim = function (s){
    return s.replace(new RegExp("^\\s*"), "").replace(new RegExp("\\s*$"), "");
};
dbr.utils.JsExtensions.AsJsArray = function (list){
    throw $CreateException(new System.Exception.ctor(), new Error());
};
dbr.utils.JsExtensions.AsJsArray = function (array){
    throw $CreateException(new System.Exception.ctor(), new Error());
};
dbr.utils.JsExtensions.AsList = function (list){
    throw $CreateException(new System.Exception.ctor(), new Error());
};
dbr.utils.JsExtensions.IndexOf = function (array, item){
    var i = 0;
    for (var $i3 = 0,$l3 = array.length,item2 = array[$i3]; $i3 < $l3; $i3++, item2 = array[$i3]){
        if (item2 == item)
            return i;
        i++;
    }
    return -1;
};
dbr.utils.JsExtensions.Remove = function (array, item){
    var i = 0;
    for (var $i4 = 0,$l4 = array.length,item2 = array[$i4]; $i4 < $l4; $i4++, item2 = array[$i4]){
        if (item2 == item){
            array.splice(i, 1);
            return true;
        }
        i++;
    }
    return false;
};
dbr.utils.JsExtensions.RemoveAt = function (array, index){
    array.splice(index, 1);
};
dbr.utils.JsExtensions.Clear = function (array){
    array.splice(0, array.length);
};
dbr.utils.JsExtensions.Contains = function (array, item){
    for (var $i5 = 0,$l5 = array.length,item2 = array[$i5]; $i5 < $l5; $i5++, item2 = array[$i5]){
        if (item2 == item)
            return true;
    }
    return false;
};
dbr.utils.JsExtensions.Insert = function (array, index, item){
    array.splice(index, 0, item);
};
dbr.utils.jQueryExtensions = function (){
};
dbr.utils.jQueryExtensions.isChecked = function (j, value){
    if (arguments.length == 1)
        return j.attr("checked");
    else {
        j.attr("checked", value);
        return undefined;
    }
};
dbr.utils.jQueryExtensions.val = function (j, visible){
    if (visible)
        j.show();
    else
        j.hide();
};
dbr.utils.Keys = function (){
};
dbr.utils.Keys.Enter = 13;
dbr.utils.Keys.PageUp = 33;
dbr.utils.Keys.PageDown = 34;
dbr.utils.Keys.End = 35;
dbr.utils.Keys.Home = 36;
dbr.utils.Keys.Up = 38;
dbr.utils.Keys.Down = 40;
dbr.utils.ClientExtensions = function (){
};
dbr.utils.ClientExtensions.RegexEscape = function (text){
    return text.replace(new RegExp("[-[\\]{}()*+?.,\\\\^$|#\\s]", "g"), "\\$&");
};
dbr.PropHelper = function (){
};
dbr.PropHelper.prototype.Prop = function (prop){
    return dbr.Utils.Prop(prop);
};
dbr.Extensions2 = function (){
};
dbr.Extensions2.GetNext$1 = function (list, item){
    var index = list.indexOf(item);
    if (index < 0 || (index + 1) >= list.length)
        return null;
    return list[index + 1];
};
dbr.Extensions2.GetPrev$1 = function (list, item){
    var index = list.indexOf(item);
    if (index <= 0)
        return null;
    return list[index - 1];
};
dbr.Extensions2.GetSibling$1 = function (list, item, offset){
    if (offset == null || offset == 0)
        return item;
    var index = list.indexOf(item);
    if (index < 0)
        return null;
    var newIndex = index += offset;
    if (newIndex < 0 || newIndex >= list.length)
        return null;
    return list[newIndex];
};
dbr.Extensions2.GetSiblingOrEdge$1 = function (list, item, offset){
    if (offset == null || offset == 0)
        return item;
    var index = list.indexOf(item);
    var newIndex = index += offset;
    if (newIndex < 0 || newIndex >= list.length){
        if (offset > 0)
            return list.last();
        return list.first();
    }
    return list[newIndex];
};
dbr.Extensions2.ToFloatOrNull = function (s){
    var x = parseFloat(s);
    if (isNaN(x))
        return null;
    return x;
};
dbr.Extensions2.ToIntOrNull = function (s){
    var x = parseInt(s);
    if (isNaN(x))
        return null;
    return x;
};
dbr.Extensions2.Abs = function (x){
    return Math.abs(x);
};
dbr.Extensions2.ForEachWithPrev$1 = function (list, action){
    var prev = Default(T);
    for (var $i6 = 0,$l6 = list.length,item = list[$i6]; $i6 < $l6; $i6++, item = list[$i6]){
        action(item, prev);
        prev = item;
    }
};
dbr.Extensions2.ItemProp$1 = function (list, prop){
    return dbr.Utils.Prop(prop);
};
dbr.Extensions2.ToDate = function (yyyy_mm_dd){
    if (Q.isNullOrEmpty(yyyy_mm_dd))
        return null;
    return Date.tryParseExact(yyyy_mm_dd, "yyyy-MM-dd");
};
dbr.Extensions2.ToDefaultDateString = function (date){
    if (date == null)
        return null;
    return date.format("yyyy-MM-dd");
};
dbr.Extensions2.ToDateValue = function (yyyy_mm_dd){
    return dbr.Extensions2.ToDate(yyyy_mm_dd).valueOf();
};
dbr.Extensions2.Trigger = function (action){
    if (action != null)
        action();
};
dbr.Extensions2.GetPropertyName$1 = function (obj, prop){
    return dbr.Utils.Prop(prop);
};
dbr.Extensions2.InvokeAsyncParallel = function (list, finalCallback){
    var count = 0;
    var total = list.length;
    var cb = function (){
        count++;
        if (count == total){
            dbr.Extensions2.Trigger(finalCallback);
        }
    };
    list.forEach(function (t){
        t(cb);
    });
};
dbr.Extensions2.GetCreateChildDivWithClass = function (el, className){
    var ch = el.children("." + className);
    if (ch.length == 0)
        ch = $("<div/>").addClass(className).appendTo(el);
    return ch;
};
dbr.Extensions2.DataItem$1 = function (j){
    return j.data("DataItem");
};
dbr.utils.Selection = function (){
    this.SelectedItems = null;
    this.AllItems = null;
    this.Changed = null;
    this.SelectedItems =  [];
    this.AllItems =  [];
};
dbr.utils.Selection.prototype.Toggle = function (list, item){
    var index = list.indexOf(item);
    if (index < 0)
        list.push(item);
    else
        list.removeAt(index);
};
dbr.utils.Selection.prototype.Click = function (item, ctrl, shift){
    var sel = this.SelectedItems.toArray();
    var lastActive = this.SelectedItems.last();
    var anchor = this.SelectedItems.first();
    if (ctrl){
        this.Toggle(sel, item);
    }
    else if (shift && anchor != null){
        var index1 = this.AllItems.indexOf(anchor);
        var index2 = this.AllItems.indexOf(item);
        var minIndex = Math.min(index1, index2);
        var maxIndex = Math.max(index1, index2);
        var slice = this.AllItems.slice(minIndex, maxIndex + 1);
        sel.clear();
        sel.add(anchor);
        sel.addRange(slice.where($CreateAnonymousDelegate(this, function (t){
            return t != anchor;
        })));
    }
    else {
        sel.clear();
        sel.push(item);
    }
    if (sel.itemsEqual(this.SelectedItems))
        return;
    var prevSelection = this.SelectedItems;
    this.SelectedItems = sel;
    this.OnChanged({
        From: prevSelection,
        To: this.SelectedItems
    });
};
dbr.utils.Selection.prototype.KeyDown = function (e){
    var keyCode = e.keyCode;
    var ctrl = e.ctrlKey;
    var sel = this.SelectedItems.toArray();
    var lastActive = this.SelectedItems.last();
    if (lastActive == null){
        if (this.AllItems.length > 0){
            this.SetSelection( [this.AllItems[0]]);
            e.preventDefault();
        }
        return;
    }
    var offset = 0;
    if (keyCode == dbr.utils.Keys.Down)
        offset = 1;
    else if (keyCode == dbr.utils.Keys.Up)
        offset = -1;
    else if (keyCode == dbr.utils.Keys.PageDown)
        offset = this.AllItems.length;
    else if (keyCode == dbr.utils.Keys.PageUp)
        offset = this.AllItems.length * -1;
    var sibling = dbr.Extensions2.GetSiblingOrEdge$1(this.AllItems, lastActive, offset);
    if (sibling == null || sibling === lastActive)
        return;
    e.preventDefault();
    if (ctrl)
        this.AddToSelection(sibling);
    else
        this.SetSelection( [sibling]);
};
dbr.utils.Selection.prototype.AddToSelection = function (item){
    if (this.SelectedItems.contains(item))
        return;
    var sel = this.SelectedItems.toArray();
    sel.push(item);
    this.SetSelection(sel);
};
dbr.utils.Selection.prototype.SetSelection = function (sel){
    if (sel.itemsEqual(this.SelectedItems) || sel == this.SelectedItems)
        return;
    var prevSelection = this.SelectedItems;
    this.SelectedItems = sel;
    this.OnChanged({
        From: prevSelection,
        To: this.SelectedItems
    });
};
dbr.utils.Selection.prototype.OnChanged = function (e){
    var diff = e.From.diff(e.To);
    e.Added = diff.added;
    e.Removed = diff.removed;
    if (this.Changed != null)
        this.Changed(e);
};
dbr.Utils = function (){
};
dbr.Utils.data = null;
dbr.Utils.CalcChangePct = function (from, to){
    var pct = ((to / from) - 1);
    return pct;
};
dbr.Utils.ObjToClass = function (obj, defaultTypeForNull){
    var sb =  [];
    var mappings = (function (){
        var $v2 = new Object();
        $v2 ["object"] = "JsObject";
        $v2 ["number"] = "JsNumber";
        $v2 ["boolean"] = "JsBoolean";
        $v2 ["string"] = "JsString";
        return $v2;
    })();
    sb.push("public class Obj");
    sb.push("{");
    for (var p in obj){
        var value = obj[p];
        var type = typeof(value);
        var type2 = (mappings[type] != null ? mappings[type] : type);
        if (value == null)
            type2 = (defaultTypeForNull != null ? defaultTypeForNull : "object");
        sb.push("public " + type2 + " " + p + " { get; set; }");
    }
    sb.push("}");
    return sb.join("\n");
};
dbr.Utils.PropHelper = function (){
    var x = new dbr.PropHelper();
    return x.Prop;
};
dbr.Utils.Prop = function (prop){
    var code;
    if (prop["isDelegate"])
        code = prop["func"].toString();
    else
        code = prop.toString();
    return code.substringBetween(".", ";");
};
dbr.Utils.listToMatrix = function (list, xProp, yProp, valueProp, aggregateFunc, yieldCallback){
    if (aggregateFunc == null)
        aggregateFunc = function (values){
            return values.sum();
        };
    var xPropSelector = Q.createSelectorFunction(xProp);
    var yPropSelector = Q.createSelectorFunction(yProp);
    var valuePropSelector = Q.createSelectorFunction(valueProp);
    var xs = list.select(xPropSelector).distinct();
    var ys = list.select(yPropSelector).distinct();
    xs.forEach(function (x, xIndex){
        var row =  [x];
        ys.forEach(function (y, yIndex){
            var values = list.where(function (t){
                return xPropSelector(t) == x && yPropSelector(t) == y;
            }).select(valuePropSelector);
            var aggregated = aggregateFunc(values);
            yieldCallback(x, y, aggregated, xIndex, yIndex);
        });
    });
};
dbr.Utils.listToMatrixRows = function (list, xProp, yProp, valueProp, aggregateFunc){
    var header =  [];
    var rows =  [];
    dbr.Utils.listToMatrix(list, xProp, yProp, valueProp, aggregateFunc, function (x, y, value, xIndex, yIndex){
        if (xIndex == 0){
            if (yIndex == 0)
                header.push(xProp);
            header.push(y);
        }
        if (yIndex == 0)
            rows[xIndex] =  [x, value];
        else
            rows[xIndex].push(value);
    });
    rows.insert(0, header);
    return rows;
};
dbr.Utils.listToMatrixObject = function (list, xProp, yProp, valueProp, aggregateFunc){
    var byX = new Object();
    dbr.Utils.listToMatrix(list, xProp, yProp, valueProp, aggregateFunc, function (x, y, value, xIndex, yIndex){
        var xx = x;
        var yy = y;
        if (byX[xx] == null)
            byX[xx] = new Object();
        byX[xx][yy] = value;
    });
    return byX;
};
dbr.Utils.cleanUpRows = function (rows){
    rows.forEach(function (row){
        row.forEach(function (value, i){
            if (value === undefined)
                row[i] = null;
        });
    });
    return rows;
};
dbr.Utils.clearTextNodes = function (el){
    if (el == null)
        el = document.body;
    $(el).find("*+*").toArray().forEach(function (el2){
        var prev = el2.previousSibling;
        while (prev != null && prev.nodeType == 3){
            var tmp = prev;
            prev = prev.previousSibling;
            tmp.remove();
        }
    });
};
dbr.Utils.createTabControl = function (div){
    var tabs = div.children("div");
    var ul = div.getAppend("ul.nav.nav-tabs");
    var lis = ul.getAppendRemove("li", tabs.length).toArray();
    var btns = tabs.toArray().select(function (tab, i){
        var li = $(lis[i]);
        var btn = li.getAppend("a").text(tab.title).data("target", "#" + tab.id);
        tab.title = "";
        return btn[0];
    });
    var btns2 = $(btns);
    btns2.mousedown(function (e){
        e.preventDefault();
        var target = $(e.target);
        target.tab("show");
        var tab = $(target.data("target"));
        tab.trigger("tabchanged");
    });
    div.getAppend(".tab-content").append(tabs);
    tabs.addClass("tab-pane");
    tabs.first().addClass("active");
    btns2.first().tab("show");
};
dbr.Utils._Unwrap = function (obj){
    var keys = Object.keys(obj);
    if (keys.length == 2 && keys.contains("_value") && keys.contains("_name")){
        return obj["_value"];
    }
    return obj;
};
dbr.Utils._xmlToJson = function (el){
    if (el.nodeType == 3)
        return el.data;
    if (el.nodeType != 1)
        return undefined;
    var obj = new Object();
    obj["_name"] = el.nodeName;
    for (var i = 0; i < el.attributes.length; i++){
        var att = el.attributes[i];
        obj[att.name] = att.value;
    }
    for (var i = 0; i < el.childNodes.length; i++){
        var node2 = el.childNodes[i];
        if (node2.nodeType == 1){
            var el2 = node2;
            var prop = el2.nodeName;
            var objValue = obj[prop];
            if (objValue != null){
                var list;
                if (objValue instanceof Array){
                    list = objValue;
                }
                else {
                    list =  [objValue];
                    obj[el2.nodeName] = list;
                }
                list.push(dbr.Utils._Unwrap(dbr.Utils._xmlToJson(el2)));
                continue;
            }
            obj[el2.nodeName] = dbr.Utils._Unwrap(dbr.Utils._xmlToJson(el2));
        }
        else {
            var value = dbr.Utils._xmlToJson(node2);
            obj._value = value;
        }
    }
    return obj;
};
dbr.Utils.xmlToJson = function (xml){
    if (typeof(xml) == "string")
        xml = $.parseXML(xml);
    var el = xml.documentElement;
    var obj = dbr.Utils._xmlToJson(el);
    return obj;
};
dbr.Utils.parseDutchFloat = function (s){
    s = s.replaceAll(".", "d").replaceAll(",", ".").replaceAll("d", ",");
    return parseFloat(s);
};
dbr.Utils.proxy = function (url, q, data, cb){
    var qurl = url;
    if (q != null)
        qurl = url += "?" + QueryString.stringify(q);
    var q2 = {
        url: qurl
    };
    var x = {
        url: "proxy.ashx?" + $.param(q2),
        data: data,
        success: function (t, b, c){
            if (cb != null)
                cb(t, null);
        },
        error: function (jqXHR, textStatus, errorThrown){
            if (cb != null)
                cb(Default(T), errorThrown);
        }
    };
    x.method = data != null ? "POST" : "GET";
    $.ajax(x);
};
dbr.utils.DataServiceProxy = function (){
    this.DataServiceUrl = null;
    this.DataServiceUrl = "DataService.ashx";
};
dbr.utils.DataServiceProxy.CreateRequest = function (){
    if (window.XMLHttpRequest)
  return new XMLHttpRequest();

else if (window.ActiveXObject)
     return new ActiveXObject('MSXML2.XMLHTTP.3.0');
else
    throw new Error('Your browser does not support ajax requests');
};
dbr.utils.DataServiceProxy.WebGetAsync = function (url, callback){
    var req = dbr.utils.DataServiceProxy.CreateRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function (){
        if (req.readyState == 4){
            callback(req);
        }
    };
    req.send(null);
};
dbr.utils.DataServiceProxy.WebPostFormAsync = function (url, form, callback){
    var req = dbr.utils.DataServiceProxy.CreateRequest();
    req.open("POST", url, true);
    req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function (){
        if (req.readyState == 4){
            callback(req);
        }
    };
    var sb =  [];
    dbr.utils.DataServiceProxy.SerializeForm(form, sb);
    req.send(sb.join(""));
};
dbr.utils.DataServiceProxy.SerializeForm = function (form, sb){
    var first = true;
    for (var p in form){
        if (first)
            first = false;
        else
            sb.push("&");
        sb.push(p);
        sb.push("=");
        sb.push(encodeURIComponent(form[p]));
    }
};
dbr.utils.DataServiceProxy.prototype.InvokeAsync = function (req, callback, useGetMethod){
    var callback2 = $CreateAnonymousDelegate(this, function (t){
        var res = {};
        if (t.status == 200){
            var code = t.responseText;
            res = JSON.parse(code);
        }
        else {
            res.Error = "Http error code " + t.status + ", " + t.statusText;
        }
        callback(res);
    });
    var url = this.DataServiceUrl;
    var sb =  [];
    if (useGetMethod){
        sb.push(url, "?z=z");
        dbr.utils.DataServiceProxy.SerializeToQueryString(req, sb);
        url = sb.join("");
        dbr.utils.DataServiceProxy.WebGetAsync(url, callback2);
    }
    else {
        var body = JSON.stringify(req);
        dbr.utils.DataServiceProxy.WebPostFormAsync(url, new Object({
            req: body
        }), callback2);
    }
};
dbr.utils.DataServiceProxy.SerializeToQueryString = function (req, sb){
    if (req.AssemblyName != null)
        sb.push("&a=" + req.AssemblyName);
    if (req.TypeName != null)
        sb.push("&t=" + req.TypeName);
    if (req.MethodName != null)
        sb.push("&m=" + req.MethodName);
    if (req.InstanceSessionKey != null)
        sb.push("&isk=" + req.InstanceSessionKey);
    if (req.Parameters != null){
        var prms = req.Parameters;
        for (var i = 0; i < prms.length; i++){
            sb.push("&p");
            sb.push((i + 1).toString());
            sb.push("=");
            sb.push(encodeURIComponent(prms[i].toString()));
        }
    }
};

