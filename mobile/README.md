# SimRacing Vault Mobile

Minimal Expo validation app for the shared `src/core` modules.

## Run

```bash
cd mobile
npm install
npm run start
```

Use the Expo CLI prompt to open iOS or Android.

## EAS Build From GitHub Actions

The repository includes a manual GitHub Actions workflow at:

```txt
.github/workflows/mobile-build.yml
```

It runs EAS Build from the `mobile/` directory and can build:

- Android APK with the `preview` profile
- iOS IPA for a physical device with the `preview` profile

It does not publish to app stores.

## Required GitHub Secret

Add this repository secret:

```txt
EXPO_TOKEN
```

Create it from Expo:

```bash
npm install -g eas-cli
eas login
eas token:create
```

Copy the generated token, then add it in GitHub:

```txt
GitHub repo > Settings > Secrets and variables > Actions > New repository secret
Name: EXPO_TOKEN
Value: <your Expo token>
```

## iOS Credentials Requirement

The GitHub workflow runs EAS with `--non-interactive`, so iOS credentials and provisioning must already be available in EAS before launching an iOS build from GitHub.

Prepare them once with:

```bash
cd mobile
eas login
eas credentials -p ios
```

Use an Apple Developer account and make sure the bundle identifier is:

```txt
com.said.simracingvault
```

Android APK builds do not need Apple credentials.

## Run The Workflow

In GitHub:

```txt
Actions > Mobile EAS Build > Run workflow
```

Choose `platform`:

- `android` for APK only
- `ios` for IPA only
- `all` for both

The workflow runs:

```bash
eas build -p android --profile preview --non-interactive
eas build -p ios --profile preview --non-interactive
```

## Download APK / IPA

After the workflow starts, EAS prints build links in the GitHub Actions logs.

You can also find builds in:

```txt
https://expo.dev/accounts/<your-account>/projects/simracing-vault/builds
```

Open the finished build and download:

- `.apk` for Android
- `.ipa` for iOS

## Install IPA With Sideloadly

1. Download the `.ipa` from the EAS build page.
2. Open Sideloadly on Windows.
3. Connect the iPhone with USB.
4. Trust the computer on the iPhone if prompted.
5. Drag the `.ipa` into Sideloadly.
6. Select the connected iPhone.
7. Enter your Apple ID when prompted.
8. Click `Start`.
9. On the iPhone, open:

```txt
Settings > General > VPN & Device Management
```

Trust the developer profile, then open SimRacing Vault.
