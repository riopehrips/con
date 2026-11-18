
(function () {
  "use strict";

  var BASE = "https://riopehrips.github.io/con";
  var VIDEO = BASE + "/video/";

  function getId() {
    var p = new URLSearchParams(location.search);

    return (
      p.get("id") ||
      p.get("lagabo") ||
      p.get("GetFoldersAndFiles") ||
      ""
    );
  }

  var id = getId();

  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(id)) {
    document.body.textContent = "Invalid filename";
    return;
  }

  var filename = id.endsWith(".html") ? id : id + ".html";

  fetch(VIDEO + encodeURIComponent(filename), {
    cache: "no-store"
  })
    .then(function (r) {
      if (!r.ok) throw new Error("File not found");
      return r.text();
    })
    .then(function (html) {
      document.open();
      document.write(html);
      document.close();
    })
    .catch(function (e) {
      console.error("[Art Error]", e);
      document.body.textContent = "HTML file not found: " + filename;
    });
})();
