!(function e(t, n, a) {
  function r(i, s) {
    if (!n[i]) {
      if (!t[i]) {
        var l = "function" == typeof require && require;
        if (!s && l) return l(i, !0);
        if (o) return o(i, !0);
        var d = new Error("Cannot find module '" + i + "'");
        throw ((d.code = "MODULE_NOT_FOUND"), d);
      }
      var c = (n[i] = {
        exports: {}
      });
      t[i][0].call(
        c.exports,
        function(e) {
          var n = t[i][1][e];
          return r(n ? n : e);
        },
        c,
        c.exports,
        e,
        t,
        n,
        a
      );
    }
    return n[i].exports;
  }
  for (
    var o = "function" == typeof require && require, i = 0; i < a.length; i++
  )
    r(a[i]);
  return r;
})({
    1: [
      function(e, t, n) {
        "use strict";

        function a(e, t) {
          for (; u.firstChild;) u.removeChild(u.firstChild);
          var n = document.createElement("img");
          (n.src = e),
          u.appendChild(n),
            (btnGenerate.onclick = function(e) {
              for (e.stopPropagation(), e.preventDefault(); g.firstChild;)
                g.removeChild(g.firstChild);
              r(n, function(e) {
                (g.style.width = n.width + "px"),
                (g.style.height = n.height + "px"),
                (g.style.margin = "0 auto"),
                (e.style.display = "none"),
                c.load(g, e.src, {
                    onComplete: function() {
                      console.log("AlphaJPEG.load onComplete?");
                      var n = document.getElementById("btnDownload");
                      setTimeout(function() {
                          btnGenerate.scrollIntoView();
                        }, 10),
                        (n.onclick = function() {
                          l(e, t);
                        });
                    }.bind(e),
                  }),
                  (t = t.replace(".png", ".alpha.jpg"));
                var a = "data:image/jpeg;base64,",
                  r = Math.round((3 * (e.src.length - a.length)) / 4);
                previewTitle.innerHTML =
                  "Preview (" + Math.round((r / 1024) * 100) / 100 + "k)";
              });
            });
        }

        function r(e, t) {
          var n = document.getElementById("qualitySetting").value;
          o(e, function(e) {
            s(e, n, t);
          });
        }

        function o(e, t) {
          var n = document.createElement("canvas"),
            a = e.width,
            r = e.height;
          (n.width = a),
          (n.height = 2 * r),
          (n.style.width = 2 * a + "px"),
          (n.style.height = r + "px");
          var o = n.getContext("2d");
          o.drawImage(e, 0, 0), o.fillRect(a, 0, a, r);
          for (
            var s = o.getImageData(0, 0, a, r),
              l = s.data,
              d = o.getImageData(a, 0, a, r),
              c = d.data,
              p = 0,
              u = l.length; p < u; p += 4
          ) {
            var g = Number(l[p + 3]);
            (c[p + 0] = 0),
            (c[p + 1] = 0),
            (c[p + 2] = 0),
            (c[p + 0] = g),
            (c[p + 1] = g),
            (c[p + 2] = g),
            (c[p + 3] = 255),
            (l[p + 3] = 255);
          }
          return o.putImageData(s, 0, 0), o.putImageData(d, 0, r), i(n, t);
        }

        function i(e, t) {
          var n = e.toDataURL(),
            a = document.createElement("img");
          return (
            (a.src = n),
            console.log("imagesrc1", a.width, a.height),
            (a.onload = function() {
              console.log("imagesrc2", a.width, a.height), t(a);
            }),
            a
          );
        }

        function s(e, t, n) {
          var a = document.createElement("img");
          return (
            (a.src = d.compress(e, t, "image/jpeg", function() {}).src),
            (a.onload = function() {
              setTimeout(function() {
                n(a);
              }, 10);
            }),
            a
          );
        }

        function l(e, t) {
          for (
            var n = atob(e.src.split(",")[1]),
              a = new ArrayBuffer(n.length),
              r = new Uint8Array(a),
              o = 0; o < n.length; o++
          )
            r[o] = 255 & n.charCodeAt(o);
          try {
            var i = new Blob([a], {
              type: "application/octet-stream"
            });
          } catch (s) {
            var l = new(window.WebKitBlobBuilder || window.MozBlobBuilder)();
            l.append(a);
            var i = l.getBlob("application/octet-stream");
          }
          if ("function" == typeof window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(i, t);
          else {
            var d = document.createElement("a");
            (d.style.display = "none"),
            document.body.appendChild(d),
              d.setAttribute("href", e.src),
              d.setAttribute("download", t),
              d.click();
          }
        }
        var d = e("j-i-c"),
          c = e("alpha-jpeg"),
          p =
          (document.getElementById("container"),
            document.getElementById("dropArea"),
            document.getElementById("blankArea"),
            document.getElementById("sourceTitle")),
          u = document.getElementById("source"),
          g = document.getElementById("preview");
        u.addEventListener("dragover", function(e) {
            e.stopPropagation(),
              e.preventDefault(),
              (e.dataTransfer.dropEffect = "copy");
          }),
          u.addEventListener("drop", function(e) {
            e.stopPropagation(), e.preventDefault();
            for (var t, n = e.dataTransfer.files, r = 0;
              (t = n[r]); r++)
              if (t.type.match(/image.*/)) {
                var o = new FileReader();
                (o.onload = function(e) {
                  a(e.target.result, t.name),
                    (p.innerHTML =
                      "Source (" +
                      Math.round((t.size / 1024) * 100) / 100 +
                      "k)");
                }),
                o.readAsDataURL(t);
                break;
              }
          });
      },
      {
        "alpha-jpeg": 2,
        "j-i-c": 3
      },
    ],
    2: [
      function(e, t, n) {
        function a() {
          var e = this;
          e.load = function(e, t, n) {
            var a = function() {};
            "string" == typeof e && (e = document.querySelector(e));
            var r = 1,
              o = "canvas";
            n || (n = {}),
              n.hasOwnProperty("onComplete") && (a = n.onComplete),
              n.hasOwnProperty("pixelRatio") && (r = n.pixelRatio),
              n.hasOwnProperty("renderer") && (o = n.renderer);
            var i = document.createElement("canvas"),
              s = document.createElement("img"),
              l = document.createElement("div"),
              d = document.createElement("div");
            (s.crossOrigin = "Anonymous"),
            (s.src = t),
            "svg" == o &&
              (s.onload = function() {
                var w = s.width,
                  h = s.height;
                (d.style.width = w / r + "px"),
                (d.style.height = h / 2 / r + "px"),
                (l.style.position = "relative"),
                (l.style.transform = "scale(" + 1 / r + ")"),
                (l.style.transformOrigin = "top left"),
                (l.style.webkitTransform = "scale(" + 1 / r + ")"),
                (l.style.webkitTransformOrigin = "top left"),
                (l.style.width = w + "px"),
                (l.style.height = h / 2 + "px"),
                (l.style.overflow = "hidden"),
                (l.style.opacity = "0.999999");
                var i = w,
                  c = h / 2,
                  p = w,
                  u = h,
                  g = t,
                  m = new Date(),
                  h =
                  (m.getTime(),
                    g
                    .split("/")[g.split("/").length - 1].replace(
                      /[|&\-;$%@_."<>=()+,]/g,
                      ""
                    )),
                  f = "imageMask" + h,
                  v = "imageSource" + h,
                  y =
                  '<svg id="' +
                  h +
                  '" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' +
                  i +
                  " " +
                  c +
                  '" class="svg-elem"><defs><mask id="' +
                  f +
                  '"><image id="' +
                  v +
                  '" width="' +
                  p +
                  '" height="' +
                  u +
                  '" xlink:href="' +
                  g +
                  '" x="-' +
                  i +
                  '"></image></mask></defs><image mask="url(#' +
                  f +
                  ')" id="sourceImage" width="' +
                  p +
                  '" height="' +
                  u +
                  '" xlink:href="' +
                  g +
                  '"></image></svg>';
                l.innerHTML = y;
                var w = l.children[0];
                navigator.userAgent.indexOf("Safari") != -1 &&
                  navigator.userAgent.indexOf("Chrome") == -1 ?
                  (w.onload = function() {
                    a(w);
                  }) :
                  a(w),
                  d.appendChild(l),
                  e.appendChild(d);
              }),
              "canvas" == o &&
              (s.onload = function() {
                console.log('canvas 1');
                var w = s.width,
                  h = s.height;
                (i.width = w),
                (i.height = h),
                (i.style.width = w / r + "px"),
                (i.style.height = h / r + "px"),
                (l.style.width = w  / r + "px"),
                (l.style.height = h / 2 / r + "px"),
                (l.style.overflow = "hidden");
                var o = i.getContext("2d");
                o.drawImage(s, 0, 0);
                for (
                  var d = o.getImageData(0, 0, w , h / 2),
                    c = d.data,
                    p = o.getImageData(0, h / 2, w, h),
                    u = p.data,
                    g = 0,
                    m = c.length; g < m; g += 4
                ) {
                  var h = u[g];
                  c[g + 3] = h;
                }
                o.putImageData(d, 0, 0),
                  l.appendChild(i),
                  e.appendChild(l),
                  a(l);
              });
          };
        }
        t.exports = new a();
      },
      {},
    ],
    3: [
      function(e, t, n) {
        var a = {
          compress: function(e, t, n, a) {
            var r = "image/jpeg";
            "undefined" != typeof n && "png" == n && (r = "image/png"),
              console.log("source_img_obj", e.width, e.height);
            var o = document.createElement("canvas");
            (o.width = e.naturalWidth), (o.height = e.naturalHeight);
            var i = (o.getContext("2d").drawImage(e, 0, 0), "data:,"),
              s = new Image(),
              i = o.toDataURL(r, t / 100);
            return (
              (s.src = i),
              (s.style.display = "none"),
              console.log("newImageData", i, i.length),
              (s.onload = function() {
                a(s);
              }),
              s
            );
          },
          upload: function(e, t, n, a, r, o, i, s) {
            void 0 === XMLHttpRequest.prototype.sendAsBinary &&
              (XMLHttpRequest.prototype.sendAsBinary = function(e) {
                var t = Array.prototype.map.call(e, function(e) {
                  return 255 & e.charCodeAt(0);
                });
                this.send(new Uint8Array(t).buffer);
              });
            var l = "image/jpeg";
            ".png" == a.substr(-4).toLowerCase() && (l = "image/png");
            var d = e.src;
            d = d.replace("data:" + l + ";base64,", "");
            var c = new XMLHttpRequest();
            c.open("POST", t, !0);
            var p = "someboundary";
            if (
              (c.setRequestHeader(
                  "Content-Type",
                  "multipart/form-data; boundary=" + p
                ),
                s && "object" == typeof s)
            )
              for (var u in s) c.setRequestHeader(u, s[u]);
            i &&
              i instanceof Function &&
              (c.upload.onprogress = function(e) {
                e.lengthComputable && i((e.loaded / e.total) * 100);
              }),
              c.sendAsBinary(
                [
                  "--" + p,
                  'Content-Disposition: form-data; name="' +
                  n +
                  '"; filename="' +
                  a +
                  '"',
                  "Content-Type: " + l,
                  "",
                  atob(d),
                  "--" + p + "--",
                ].join("\r\n")
              ),
              (c.onreadystatechange = function() {
                4 == this.readyState &&
                  (200 == this.status ?
                    r(this.responseText) :
                    this.status >= 400 &&
                    o &&
                    o instanceof Function &&
                    o(this.responseText));
              });
          },
        };
        t.exports = a;
      },
      {},
    ],
  }, {},
  [1]
);!(function e(t, n, a) {
  function r(i, s) {
    if (!n[i]) {
      if (!t[i]) {
        var l = "function" == typeof require && require;
        if (!s && l) return l(i, !0);
        if (o) return o(i, !0);
        var d = new Error("Cannot find module '" + i + "'");
        throw ((d.code = "MODULE_NOT_FOUND"), d);
      }
      var c = (n[i] = {
        exports: {}
      });
      t[i][0].call(
        c.exports,
        function(e) {
          var n = t[i][1][e];
          return r(n ? n : e);
        },
        c,
        c.exports,
        e,
        t,
        n,
        a
      );
    }
    return n[i].exports;
  }
  for (
    var o = "function" == typeof require && require, i = 0; i < a.length; i++
  )
    r(a[i]);
  return r;
})({
    1: [
      function(e, t, n) {
        "use strict";

        function a(e, t) {
          for (; u.firstChild;) u.removeChild(u.firstChild);
          var n = document.createElement("img");
          (n.src = e),
          u.appendChild(n),
            (btnGenerate.onclick = function(e) {
              for (e.stopPropagation(), e.preventDefault(); g.firstChild;)
                g.removeChild(g.firstChild);
              r(n, function(e) {
                (g.style.width = n.width + "px"),
                (g.style.height = n.height + "px"),
                (g.style.margin = "0 auto"),
                (e.style.display = "none"),
                c.load(g, e.src, {
                    onComplete: function() {
                      console.log("AlphaJPEG.load onComplete?");
                      var n = document.getElementById("btnDownload");
                      setTimeout(function() {
                          btnGenerate.scrollIntoView();
                        }, 10),
                        (n.onclick = function() {
                          l(e, t);
                        });
                    }.bind(e),
                  }),
                  (t = t.replace(".png", ".alpha.jpg"));
                var a = "data:image/jpeg;base64,",
                  r = Math.round((3 * (e.src.length - a.length)) / 4);
                previewTitle.innerHTML =
                  "Preview (" + Math.round((r / 1024) * 100) / 100 + "k)";
              });
            });
        }

        function r(e, t) {
          var n = document.getElementById("qualitySetting").value;
          o(e, function(e) {
            s(e, n, t);
          });
        }

        function o(e, t) {
          var n = document.createElement("canvas"),
            a = e.width,
            r = e.height;
          (n.width = a),
          (n.height = 2 * r),
          (n.style.width = 2 * a + "px"),
          (n.style.height = r + "px");
          var o = n.getContext("2d");
          o.drawImage(e, 0, 0), o.fillRect(a, 0, a, r);
          for (
            var s = o.getImageData(0, 0, a, r),
              l = s.data,
              d = o.getImageData(a, 0, a, r),
              c = d.data,
              p = 0,
              u = l.length; p < u; p += 4
          ) {
            var g = Number(l[p + 3]);
            (c[p + 0] = 0),
            (c[p + 1] = 0),
            (c[p + 2] = 0),
            (c[p + 0] = g),
            (c[p + 1] = g),
            (c[p + 2] = g),
            (c[p + 3] = 255),
            (l[p + 3] = 255);
          }
          return o.putImageData(s, 0, 0), o.putImageData(d, 0, r), i(n, t);
        }

        function i(e, t) {
          var n = e.toDataURL(),
            a = document.createElement("img");
          return (
            (a.src = n),
            console.log("imagesrc1", a.width, a.height),
            (a.onload = function() {
              console.log("imagesrc2", a.width, a.height), t(a);
            }),
            a
          );
        }

        function s(e, t, n) {
          var a = document.createElement("img");
          return (
            (a.src = d.compress(e, t, "image/jpeg", function() {}).src),
            (a.onload = function() {
              setTimeout(function() {
                n(a);
              }, 10);
            }),
            a
          );
        }

        function l(e, t) {
          for (
            var n = atob(e.src.split(",")[1]),
              a = new ArrayBuffer(n.length),
              r = new Uint8Array(a),
              o = 0; o < n.length; o++
          )
            r[o] = 255 & n.charCodeAt(o);
          try {
            var i = new Blob([a], {
              type: "application/octet-stream"
            });
          } catch (s) {
            var l = new(window.WebKitBlobBuilder || window.MozBlobBuilder)();
            l.append(a);
            var i = l.getBlob("application/octet-stream");
          }
          if ("function" == typeof window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(i, t);
          else {
            var d = document.createElement("a");
            (d.style.display = "none"),
            document.body.appendChild(d),
              d.setAttribute("href", e.src),
              d.setAttribute("download", t),
              d.click();
          }
        }
        var d = e("j-i-c"),
          c = e("alpha-jpeg"),
          p =
          (document.getElementById("container"),
            document.getElementById("dropArea"),
            document.getElementById("blankArea"),
            document.getElementById("sourceTitle")),
          u = document.getElementById("source"),
          g = document.getElementById("preview");
        u.addEventListener("dragover", function(e) {
            e.stopPropagation(),
              e.preventDefault(),
              (e.dataTransfer.dropEffect = "copy");
          }),
          u.addEventListener("drop", function(e) {
            e.stopPropagation(), e.preventDefault();
            for (var t, n = e.dataTransfer.files, r = 0;
              (t = n[r]); r++)
              if (t.type.match(/image.*/)) {
                var o = new FileReader();
                (o.onload = function(e) {
                  a(e.target.result, t.name),
                    (p.innerHTML =
                      "Source (" +
                      Math.round((t.size / 1024) * 100) / 100 +
                      "k)");
                }),
                o.readAsDataURL(t);
                break;
              }
          });
      },
      {
        "alpha-jpeg": 2,
        "j-i-c": 3
      },
    ],
    2: [
      function(e, t, n) {
        function a() {
          var e = this;
          e.load = function(e, t, n) {
            var a = function() {};
            "string" == typeof e && (e = document.querySelector(e));
            var r = 1,
              o = "canvas";
            n || (n = {}),
              n.hasOwnProperty("onComplete") && (a = n.onComplete),
              n.hasOwnProperty("pixelRatio") && (r = n.pixelRatio),
              n.hasOwnProperty("renderer") && (o = n.renderer);
            var i = document.createElement("canvas"),
              s = document.createElement("img"),
              l = document.createElement("div"),
              d = document.createElement("div");
            (s.crossOrigin = "Anonymous"),
            (s.src = t),
            "svg" == o &&
              (s.onload = function() {
                var w = s.width,
                  h = s.height;
                (d.style.width = w / r + "px"),
                (d.style.height = h / 2 / r + "px"),
                (l.style.position = "relative"),
                (l.style.transform = "scale(" + 1 / r + ")"),
                (l.style.transformOrigin = "top left"),
                (l.style.webkitTransform = "scale(" + 1 / r + ")"),
                (l.style.webkitTransformOrigin = "top left"),
                (l.style.width = w + "px"),
                (l.style.height = h / 2 + "px"),
                (l.style.overflow = "hidden"),
                (l.style.opacity = "0.999999");
                var i = w,
                  c = h / 2,
                  p = w,
                  u = h,
                  g = t,
                  m = new Date(),
                  h =
                  (m.getTime(),
                    g
                    .split("/")[g.split("/").length - 1].replace(
                      /[|&\-;$%@_."<>=()+,]/g,
                      ""
                    )),
                  f = "imageMask" + h,
                  v = "imageSource" + h,
                  y =
                  '<svg id="' +
                  h +
                  '" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' +
                  i +
                  " " +
                  c +
                  '" class="svg-elem"><defs><mask id="' +
                  f +
                  '"><image id="' +
                  v +
                  '" width="' +
                  p +
                  '" height="' +
                  u +
                  '" xlink:href="' +
                  g +
                  '" x="-' +
                  i +
                  '"></image></mask></defs><image mask="url(#' +
                  f +
                  ')" id="sourceImage" width="' +
                  p +
                  '" height="' +
                  u +
                  '" xlink:href="' +
                  g +
                  '"></image></svg>';
                l.innerHTML = y;
                var w = l.children[0];
                navigator.userAgent.indexOf("Safari") != -1 &&
                  navigator.userAgent.indexOf("Chrome") == -1 ?
                  (w.onload = function() {
                    a(w);
                  }) :
                  a(w),
                  d.appendChild(l),
                  e.appendChild(d);
              }),
              "canvas" == o &&
              (s.onload = function() {
                console.log('canvas 2');
                var w = s.width,
                  h = s.height;
                (i.width = w),
                (i.height = h),
                (i.style.width = w / r + "px"),
                (i.style.height = h / r + "px"),
                (l.style.width = w  / r + "px"),
                (l.style.height = h / 2 / r + "px"),
                (l.style.overflow = "hidden");
                var o = i.getContext("2d");
                o.drawImage(s, 0, 0);
                for (
                  var d = o.getImageData(0, 0, w , h / 2),
                    c = d.data,
                    p = o.getImageData(0, h / 2, w, h),
                    u = p.data,
                    g = 0,
                    m = c.length; g < m; g += 4
                ) {
                  var h = u[g];
                  c[g + 3] = h;
                }
                o.putImageData(d, 0, 0),
                  l.appendChild(i),
                  e.appendChild(l),
                  a(l);
              });
          };
        }
        t.exports = new a();
      },
      {},
    ],
    3: [
      function(e, t, n) {
        var a = {
          compress: function(e, t, n, a) {
            var r = "image/jpeg";
            "undefined" != typeof n && "png" == n && (r = "image/png"),
              console.log("source_img_obj", e.width, e.height);
            var o = document.createElement("canvas");
            (o.width = e.naturalWidth), (o.height = e.naturalHeight);
            var i = (o.getContext("2d").drawImage(e, 0, 0), "data:,"),
              s = new Image(),
              i = o.toDataURL(r, t / 100);
            return (
              (s.src = i),
              (s.style.display = "none"),
              console.log("newImageData", i, i.length),
              (s.onload = function() {
                a(s);
              }),
              s
            );
          },
          upload: function(e, t, n, a, r, o, i, s) {
            void 0 === XMLHttpRequest.prototype.sendAsBinary &&
              (XMLHttpRequest.prototype.sendAsBinary = function(e) {
                var t = Array.prototype.map.call(e, function(e) {
                  return 255 & e.charCodeAt(0);
                });
                this.send(new Uint8Array(t).buffer);
              });
            var l = "image/jpeg";
            ".png" == a.substr(-4).toLowerCase() && (l = "image/png");
            var d = e.src;
            d = d.replace("data:" + l + ";base64,", "");
            var c = new XMLHttpRequest();
            c.open("POST", t, !0);
            var p = "someboundary";
            if (
              (c.setRequestHeader(
                  "Content-Type",
                  "multipart/form-data; boundary=" + p
                ),
                s && "object" == typeof s)
            )
              for (var u in s) c.setRequestHeader(u, s[u]);
            i &&
              i instanceof Function &&
              (c.upload.onprogress = function(e) {
                e.lengthComputable && i((e.loaded / e.total) * 100);
              }),
              c.sendAsBinary(
                [
                  "--" + p,
                  'Content-Disposition: form-data; name="' +
                  n +
                  '"; filename="' +
                  a +
                  '"',
                  "Content-Type: " + l,
                  "",
                  atob(d),
                  "--" + p + "--",
                ].join("\r\n")
              ),
              (c.onreadystatechange = function() {
                4 == this.readyState &&
                  (200 == this.status ?
                    r(this.responseText) :
                    this.status >= 400 &&
                    o &&
                    o instanceof Function &&
                    o(this.responseText));
              });
          },
        };
        t.exports = a;
      },
      {},
    ],
  }, {},
  [1]
);!(function e(t, n, a) {
  function r(i, s) {
    if (!n[i]) {
      if (!t[i]) {
        var l = "function" == typeof require && require;
        if (!s && l) return l(i, !0);
        if (o) return o(i, !0);
        var d = new Error("Cannot find module '" + i + "'");
        throw ((d.code = "MODULE_NOT_FOUND"), d);
      }
      var c = (n[i] = {
        exports: {}
      });
      t[i][0].call(
        c.exports,
        function(e) {
          var n = t[i][1][e];
          return r(n ? n : e);
        },
        c,
        c.exports,
        e,
        t,
        n,
        a
      );
    }
    return n[i].exports;
  }
  for (
    var o = "function" == typeof require && require, i = 0; i < a.length; i++
  )
    r(a[i]);
  return r;
})({
    1: [
      function(e, t, n) {
        "use strict";

        function a(e, t) {
          for (; u.firstChild;) u.removeChild(u.firstChild);
          var n = document.createElement("img");
          (n.src = e),
          u.appendChild(n),
            (btnGenerate.onclick = function(e) {
              for (e.stopPropagation(), e.preventDefault(); g.firstChild;)
                g.removeChild(g.firstChild);
              r(n, function(e) {
                (g.style.width = n.width + "px"),
                (g.style.height = n.height + "px"),
                (g.style.margin = "0 auto"),
                (e.style.display = "none"),
                c.load(g, e.src, {
                    onComplete: function() {
                      console.log("AlphaJPEG.load onComplete?");
                      var n = document.getElementById("btnDownload");
                      setTimeout(function() {
                          btnGenerate.scrollIntoView();
                        }, 10),
                        (n.onclick = function() {
                          l(e, t);
                        });
                    }.bind(e),
                  }),
                  (t = t.replace(".png", ".alpha.jpg"));
                var a = "data:image/jpeg;base64,",
                  r = Math.round((3 * (e.src.length - a.length)) / 4);
                previewTitle.innerHTML =
                  "Preview (" + Math.round((r / 1024) * 100) / 100 + "k)";
              });
            });
        }

        function r(e, t) {
          var n = document.getElementById("qualitySetting").value;
          o(e, function(e) {
            s(e, n, t);
          });
        }

        function o(e, t) {
          var n = document.createElement("canvas"),
            a = e.width,
            r = e.height;
          (n.width = a),
          (n.height = 2 * r),
          (n.style.width = 2 * a + "px"),
          (n.style.height = r + "px");
          var o = n.getContext("2d");
          o.drawImage(e, 0, 0), o.fillRect(a, 0, a, r);
          for (
            var s = o.getImageData(0, 0, a, r),
              l = s.data,
              d = o.getImageData(a, 0, a, r),
              c = d.data,
              p = 0,
              u = l.length; p < u; p += 4
          ) {
            var g = Number(l[p + 3]);
            (c[p + 0] = 0),
            (c[p + 1] = 0),
            (c[p + 2] = 0),
            (c[p + 0] = g),
            (c[p + 1] = g),
            (c[p + 2] = g),
            (c[p + 3] = 255),
            (l[p + 3] = 255);
          }
          return o.putImageData(s, 0, 0), o.putImageData(d, 0, r), i(n, t);
        }

        function i(e, t) {
          var n = e.toDataURL(),
            a = document.createElement("img");
          return (
            (a.src = n),
            console.log("imagesrc1", a.width, a.height),
            (a.onload = function() {
              console.log("imagesrc2", a.width, a.height), t(a);
            }),
            a
          );
        }

        function s(e, t, n) {
          var a = document.createElement("img");
          return (
            (a.src = d.compress(e, t, "image/jpeg", function() {}).src),
            (a.onload = function() {
              setTimeout(function() {
                n(a);
              }, 10);
            }),
            a
          );
        }

        function l(e, t) {
          for (
            var n = atob(e.src.split(",")[1]),
              a = new ArrayBuffer(n.length),
              r = new Uint8Array(a),
              o = 0; o < n.length; o++
          )
            r[o] = 255 & n.charCodeAt(o);
          try {
            var i = new Blob([a], {
              type: "application/octet-stream"
            });
          } catch (s) {
            var l = new(window.WebKitBlobBuilder || window.MozBlobBuilder)();
            l.append(a);
            var i = l.getBlob("application/octet-stream");
          }
          if ("function" == typeof window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(i, t);
          else {
            var d = document.createElement("a");
            (d.style.display = "none"),
            document.body.appendChild(d),
              d.setAttribute("href", e.src),
              d.setAttribute("download", t),
              d.click();
          }
        }
        var d = e("j-i-c"),
          c = e("alpha-jpeg"),
          p =
          (document.getElementById("container"),
            document.getElementById("dropArea"),
            document.getElementById("blankArea"),
            document.getElementById("sourceTitle")),
          u = document.getElementById("source"),
          g = document.getElementById("preview");
        u.addEventListener("dragover", function(e) {
            e.stopPropagation(),
              e.preventDefault(),
              (e.dataTransfer.dropEffect = "copy");
          }),
          u.addEventListener("drop", function(e) {
            e.stopPropagation(), e.preventDefault();
            for (var t, n = e.dataTransfer.files, r = 0;
              (t = n[r]); r++)
              if (t.type.match(/image.*/)) {
                var o = new FileReader();
                (o.onload = function(e) {
                  a(e.target.result, t.name),
                    (p.innerHTML =
                      "Source (" +
                      Math.round((t.size / 1024) * 100) / 100 +
                      "k)");
                }),
                o.readAsDataURL(t);
                break;
              }
          });
      },
      {
        "alpha-jpeg": 2,
        "j-i-c": 3
      },
    ],
    2: [
      function(e, t, n) {
        function a() {
          var e = this;
          e.load = function(e, t, n) {
            var a = function() {};
            "string" == typeof e && (e = document.querySelector(e));
            var r = 1,
              o = "canvas";
            n || (n = {}),
              n.hasOwnProperty("onComplete") && (a = n.onComplete),
              n.hasOwnProperty("pixelRatio") && (r = n.pixelRatio),
              n.hasOwnProperty("renderer") && (o = n.renderer);
            var i = document.createElement("canvas"),
              s = document.createElement("img"),
              l = document.createElement("div"),
              d = document.createElement("div");
            (s.crossOrigin = "Anonymous"),
            (s.src = t),
            "svg" == o &&
              (s.onload = function() {
                var w = s.width,
                  h = s.height;
                (d.style.width = w / r + "px"),
                (d.style.height = h / 2 / r + "px"),
                (l.style.position = "relative"),
                (l.style.transform = "scale(" + 1 / r + ")"),
                (l.style.transformOrigin = "top left"),
                (l.style.webkitTransform = "scale(" + 1 / r + ")"),
                (l.style.webkitTransformOrigin = "top left"),
                (l.style.width = w + "px"),
                (l.style.height = h / 2 + "px"),
                (l.style.overflow = "hidden"),
                (l.style.opacity = "0.999999");
                var i = w,
                  c = h / 2,
                  p = w,
                  u = h,
                  g = t,
                  m = new Date(),
                  h =
                  (m.getTime(),
                    g
                    .split("/")[g.split("/").length - 1].replace(
                      /[|&\-;$%@_."<>=()+,]/g,
                      ""
                    )),
                  f = "imageMask" + h,
                  v = "imageSource" + h,
                  y =
                  '<svg id="' +
                  h +
                  '" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' +
                  i +
                  " " +
                  c +
                  '" class="svg-elem"><defs><mask id="' +
                  f +
                  '"><image id="' +
                  v +
                  '" width="' +
                  p +
                  '" height="' +
                  u +
                  '" xlink:href="' +
                  g +
                  '" x="-' +
                  i +
                  '"></image></mask></defs><image mask="url(#' +
                  f +
                  ')" id="sourceImage" width="' +
                  p +
                  '" height="' +
                  u +
                  '" xlink:href="' +
                  g +
                  '"></image></svg>';
                l.innerHTML = y;
                var w = l.children[0];
                navigator.userAgent.indexOf("Safari") != -1 &&
                  navigator.userAgent.indexOf("Chrome") == -1 ?
                  (w.onload = function() {
                    a(w);
                  }) :
                  a(w),
                  d.appendChild(l),
                  e.appendChild(d);
              }),
              "canvas" == o &&
              (s.onload = function() {
                console.log('canvas 3');
                var w = s.width,
                  h = s.height;
                (i.width = w),
                (i.height = h),
                (i.style.width = w / r + "px"),
                (i.style.height = h / r + "px"),
                (l.style.width = w  / r + "px"),
                (l.style.height = h / 2 / r + "px"),
                (l.style.overflow = "hidden");
                var o = i.getContext("2d");
                o.drawImage(s, 0, 0);
                for (
                  var d = o.getImageData(0, 0, w , h / 2),
                    c = d.data,
                    p = o.getImageData(0, h / 2, w, h),
                    u = p.data,
                    g = 0,
                    m = c.length; g < m; g += 4
                ) {
                  var h = u[g];
                  c[g + 3] = h;
                }
                o.putImageData(d, 0, 0),
                  l.appendChild(i),
                  e.appendChild(l),
                  a(l);
              });
          };
        }
        t.exports = new a();
      },
      {},
    ],
    3: [
      function(e, t, n) {
        var a = {
          compress: function(e, t, n, a) {
            var r = "image/jpeg";
            "undefined" != typeof n && "png" == n && (r = "image/png"),
              console.log("source_img_obj", e.width, e.height);
            var o = document.createElement("canvas");
            (o.width = e.naturalWidth), (o.height = e.naturalHeight);
            var i = (o.getContext("2d").drawImage(e, 0, 0), "data:,"),
              s = new Image(),
              i = o.toDataURL(r, t / 100);
            return (
              (s.src = i),
              (s.style.display = "none"),
              console.log("newImageData", i, i.length),
              (s.onload = function() {
                a(s);
              }),
              s
            );
          },
          upload: function(e, t, n, a, r, o, i, s) {
            void 0 === XMLHttpRequest.prototype.sendAsBinary &&
              (XMLHttpRequest.prototype.sendAsBinary = function(e) {
                var t = Array.prototype.map.call(e, function(e) {
                  return 255 & e.charCodeAt(0);
                });
                this.send(new Uint8Array(t).buffer);
              });
            var l = "image/jpeg";
            ".png" == a.substr(-4).toLowerCase() && (l = "image/png");
            var d = e.src;
            d = d.replace("data:" + l + ";base64,", "");
            var c = new XMLHttpRequest();
            c.open("POST", t, !0);
            var p = "someboundary";
            if (
              (c.setRequestHeader(
                  "Content-Type",
                  "multipart/form-data; boundary=" + p
                ),
                s && "object" == typeof s)
            )
              for (var u in s) c.setRequestHeader(u, s[u]);
            i &&
              i instanceof Function &&
              (c.upload.onprogress = function(e) {
                e.lengthComputable && i((e.loaded / e.total) * 100);
              }),
              c.sendAsBinary(
                [
                  "--" + p,
                  'Content-Disposition: form-data; name="' +
                  n +
                  '"; filename="' +
                  a +
                  '"',
                  "Content-Type: " + l,
                  "",
                  atob(d),
                  "--" + p + "--",
                ].join("\r\n")
              ),
              (c.onreadystatechange = function() {
                4 == this.readyState &&
                  (200 == this.status ?
                    r(this.responseText) :
                    this.status >= 400 &&
                    o &&
                    o instanceof Function &&
                    o(this.responseText));
              });
          },
        };
        t.exports = a;
      },
      {},
    ],
  }, {},
  [1]
);