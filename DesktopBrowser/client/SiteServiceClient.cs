﻿using System.Collections.Generic;
using SharpKit.JavaScript;
using DesktopBrowser.client.utils;
using DesktopBrowser.Server.Utils;
using DesktopBrowser.Server;
using SharpKit.Html;
using SharpKit.jQuery;

namespace DesktopBrowser.client
{

    [JsType(JsMode.Prototype)]
    public class SiteServiceClient
    {
        public SiteServiceClient()
        {
            Url = "/api";
        }

        public jqXHR GetFiles(SiteRequest req, JsAction<JsArray<File>> cb)
        {
            return Invoke("GetFiles", req, cb);
        }

        public jqXHR GetFileRelatives(string path, JsAction<FileRelativesInfo> cb)
        {
            return Invoke("GetFileRelatives", new { path }, cb);
        }

        public jqXHR GetFile(string path, JsAction<File> cb)
        {
            return Invoke("GetFileRelatives2", new { Value = path }, cb);
        }

        public jqXHR Execute(string filename, JsAction<object> cb)
        {
            return Invoke("GetFileRelatives2", new { Value = filename }, cb);
        }

        public jqXHR Delete(string path, JsAction<object> cb)
        {
            return Invoke("GetFileRelatives2", new { Value = path }, cb);
        }

        #region Utils

        [JsMethod(IgnoreGenericArguments = true)]
        protected virtual jqXHR Invoke<T>(JsString action, object prms, JsAction<T> callback)
        {
            var xhr = jQuery.ajax(new AjaxSettings
            {
                url = Url + "/" + action,
                data = prms,
            });
            return xhr;
        }
        public JsString Url { get; set; }
        #endregion

    }



}