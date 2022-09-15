/***
// https://gist.github.com/wanglf/7acc591890dc0d8ceff1e7ec9af32a55
***/

// *** SCRIPTS NOT TESTED *** //

/***
// First
***/
!function() {
    (function() {
        for (var e = {
            version: "",
            publisher: "",
            identifier: "",
            getDownloadUrl: function() {
                return ["https://", this.identifier.split(".")[0], ".gallery.vsassets.io/_apis/public/gallery/publisher/", this.identifier.split(".")[0], "/extension/", this.identifier.split(".")[1], "/", this.version, "/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage"].join("")
            },
            getFileName: function() {
                return [this.identifier, "_", this.version, ".vsix"].join("")
            },
            getDownloadButton: function() {
                var e = document.createElement("a");
                return e.innerHTML = "Download VSIX",
                e.href = "javascript:void(0);",
                e.style.fontFamily = "wf_segoe-ui,Helvetica Neue,Helvetica,Arial,Verdana",
                e.style.display = "inline-block",
                e.style.padding = "2px 5px",
                e.style.background = "darkgreen",
                e.style.color = "white",
                e.style.fontWeight = "bold",
                e.style.margin = "2px 5px",
                e.setAttribute("data-url", this.getDownloadUrl()),
                e.setAttribute("data-filename", this.getFileName()),
                e.onclick = function(e) {
                    e.target.onclick = null,
                    e.target.innerHTML = "Downloading VSIX...";
                    var t = new XMLHttpRequest;
                    console.log(e.target.getAttribute("data-url")),
                    t.open("GET", e.target.getAttribute("data-url"), !0),
                    t.responseType = "blob",
                    t.onprogress = function(t) {
                        if (t.lengthComputable) {
                            var r = t.loaded / t.total * 100;
                            e.target.innerHTML = "Downloading VSIX..." + r.toString() + "%"
                        }
                    }
                    ,
                    t.onload = function(t) {
                        if (200 == this.status) {
                            var r = this.response
                              , n = document.createElement("a");
                            n.href = window.URL.createObjectURL(r),
                            n.download = e.target.getAttribute("data-filename"),
                            n.click(),
                            e.target.href = n.href,
                            e.target.download = n.download,
                            e.target.innerHTML = "Download VSIX"
                        } else
                            e.target.innerHTML = "Error. Please reload the page amd try again.",
                            alert("Error " + this.status + " error receiving the document.")
                    }
                    ,
                    t.onerror = function(t) {
                        e.target.innerHTML = "Error. Please reload the page amd try again.",
                        alert("Error " + t.target.status + " occurred while receiving the document. ")
                    }
                    ,
                    t.send()
                }
                ,
                e
            }
        }, t = {
            Version: "version",
            Publisher: "publisher",
            "Unique Identifier": "identifier"
        }, r = document.querySelectorAll(".ux-table-metadata tr"), n = 0; n < r.length; n++) {
            var i = r[n]
              , a = i.querySelectorAll("td");
            if (2 == a.length) {
                var o = a[0].innerText.replace(/^\\s+|\\s+$/g, "")
                  , l = a[1].innerText.replace(/^\\s+|\\s+$/g, "");
                t.hasOwnProperty(o) && (e[t[o]] = l)
            }
        }
        document.querySelector(".vscode-moreinformation").parentElement.appendChild(e.getDownloadButton()).scrollIntoView(),
        e
    }
    )()
}();


/***
// 2nd 
***/
(function() {
    const URL_VSIX_PATTERN = 'https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${extension}/${version}/vspackage';
    let itemName = new URL(window.location.href).searchParams.get('itemName');
    let[publisher,extension] = itemName.split('.');
    let version = document.querySelector('#versionHistoryTab tbody tr .version-history-container-column').textContent;
    let url = URL_VSIX_PATTERN.replace('${publisher}', publisher).replace('${extension}', extension).replace('${version}', version);
    window.open(url, '_blank');

}
)();
