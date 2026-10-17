# MS BROOM Android App

This project wraps the supplied MS BROOM HTML/CSS/JavaScript website in an Android WebView. Website files and product images are bundled locally in `app/src/main/assets/www/`.

## Build APK with GitHub Actions
1. Upload the contents of this project ZIP into the root of your GitHub repository (not the ZIP as a single file).
2. Commit to the `main` branch.
3. Open Actions → Build MS BROOM APK and wait for the workflow to finish.
4. Open the successful run and download the `MS-BROOM-debug-APK` artifact. Extract the artifact ZIP to get `app-debug.apk`.

For local builds, use Android Studio with JDK 17 and Android SDK 35, then run `gradle assembleDebug`.
