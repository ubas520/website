<?php
// Fixed filename: requests cannot select files elsewhere on the server.
$path = __DIR__ . '/downloads/vetrix.apk';
if (!is_file($path) || !is_readable($path)) {
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vetrix download</title><h1>The app download is not available yet.</h1><p>Please check back for the next release.</p><a href="./#download">Back to Vetrix</a></html>';
    exit;
}
header('Content-Type: application/vnd.android.package-archive');
header('Content-Disposition: attachment; filename="vetrix.apk"');
header('Content-Length: ' . filesize($path));
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
readfile($path);
