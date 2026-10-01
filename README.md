# Vetrix promotional website

A responsive PHP landing page for the Vetrix clinic web app and pet-owner mobile app. No build step or database is required. The mobile login preview uses the supplied app screenshot; the clinic dashboard and feature walkthroughs are illustrative and use sample data.

The site uses Vetrix blue, an enlarged screenshot dialog, accessible feature tabs, active navigation indicators, and gentle entrance/hover animations. Reduced-motion preferences disable animations. `enhancements.css` contains the latest design and responsive interaction styles. `script.js` handles the menu, dialog, tabs, and section indicators.

## Local preview

With XAMPP Apache running, open `http://localhost/website%20vetrix/`.

Alternatively run `php -S 127.0.0.1:8095 -t .` in this directory and open `http://127.0.0.1:8095`.

## Enable app downloads

1. Copy your **signed release Android APK** into `downloads/vetrix.apk`.
2. Reload the site. The Android button automatically becomes **Download for Android**, displays the file size, and serves the APK through `download.php`.
3. Or enter your Google Play URL in `android_store_url` in `config.php`; this takes priority over the local APK. Set `ios_store_url` when an App Store release is available.

Until a release is provided, the site honestly displays “Coming soon”. A missing download returns HTTP 404 with a link back to the site. No APK or store listing is included in this project.

## Publish

Upload this directory to a PHP-enabled HTTPS host. Set `web_app_url` in `config.php` to your actual deployed clinic URL; its default `/vetrix/` matches the adjacent local project. Set your mobile app's production API URL before building the signed APK so installed apps can reach the system outside your Wi-Fi network. A localhost website cannot be downloaded from by public visitors: publish the site and APK on a reachable host, then share the website URL.

The artwork and mobile screenshot are served locally from `assets/`. See `assets/ARTWORK.md` for the generated pet image prompt and source details. Google Fonts is optional; the layout falls back to system sans-serif fonts if unavailable. There are no trackers, signup forms, or external JavaScript dependencies.
