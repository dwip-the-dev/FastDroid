# 🚀 FastDroid

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version 1.0.0"/>
  <img src="https://img.shields.io/github/license/dwip-the-dev/FastDroid" alt="MIT License"/>
  <img src="https://img.shields.io/badge/apps-50%2B-brightgreen" alt="50+ Apps"/>
  <img src="https://img.shields.io/badge/PRs-welcome-orange" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/tracking-none-red" alt="No Tracking"/>
</p>

<p align="center">
  <strong>FastDroid</strong> is a curated directory of open-source Android apps with direct download links to official releases.
  <br/>
  <i>No rebuild queues. No mirrors. No trackers. No bullshit.</i>
  <br/>
  <b>Just fast, transparent app discovery.</b>
</p>


---

## 🧠 Why FastDroid?

Existing app stores for open-source Android apps often have real problems:


| Problem | FastDroid Solution |
| --- | --- |
| Extremely slow downloads | ⚡ Direct from GitHub/GitLab |
| Long rebuild queues | 📦 Zero rebuilding |
| Apps lag behind upstream | 🔗 Latest official releases |
| Opaque build pipelines | 🔍 Full transparency |
| Bloated metadata | 🧼 Minimal, clean data |
| Tracking & analytics | 🛡️ No tracking, no accounts |

FastDroid links directly to the developer's official release artifacts.
That means instant availability, exact upstream binaries, and minimal infrastructure.

---

## ✨ Key Principles

<div align="center">
  <table>
    <tr>
      <td align="center"><b>⚡ Direct Downloads</b></td>
      <td>All APKs are linked directly from original developer release pages. We <i>never</i> host APK files.</td>
    </tr>
    <tr>
      <td align="center"><b>🧭 Curated, Not Crowdsourced</b></td>
      <td>Every app is manually reviewed. Open-source only. No ratings, no algorithms, no popularity contests.</td>
    </tr>
    <tr>
      <td align="center"><b>🔐 Transparency First</b></td>
      <td>Each entry includes source repo, direct download URL, release tag, and optional SHA-256 hash.</td>
    </tr>
    <tr>
      <td align="center"><b>🪶 Lightweight by Design</b></td>
      <td>Static site. No backend. No accounts. No analytics. Works great on slow networks and low-end devices.</td>
    </tr>
  </table>
</div>

---



---

## 🛠️ Contributing

We accept submissions via GitHub Pull Requests only.

### ✅ Requirements

* Open-source app
* Public source repository (GitHub/GitLab preferred)
* Direct APK download link (GitHub/GitLab Releases ideal)
* No cracked/pirated apps
* No closed-source binaries
* No shady telemetry or malware

### 📝 Submission Steps

1. Fork the repository
2. Create a new branch (`your-app-name`)
3. Add:
    * JSON file in `src/data/` (see format above)
    * 512×512 PNG icon in `public/icons/` (optional but recommended)
4. Open a Pull Request

All submissions are reviewed manually within 48 hours.

---

## ⚠️ Disclaimer

**FastDroid does NOT:**

* Host APK files
* Verify cryptographic signatures
* Rebuild apps from source
* Guarantee safety or legality

FastDroid is a **discovery and directory service only.**

**Always:**

* Review the source code
* Verify checksums when provided
* Install software at your own risk

---

## 🧠 Philosophy

FastDroid exists because speed, transparency, and simplicity matter.

If an app is open-source and the developer already provides a release —
there's no reason users should wait.

---
## 📂 Catalog Format

Each app lives in its own JSON file under `src/data/`:

```json
{
  "id": "geometric-weather",
  "name": "GeometricWeather",
  "category": "Weather",
  "icon": "/icons/geometric-weather.png",
  "description": "A weather app displaying forecast and conditions using geometric UI elements with data from trusted sources.",
  "source": "https://github.com/WangDaYeeeeee/GeometricWeather",
  "downloadUrl": "https://github.com/WangDaYeeeeee/GeometricWeather/releases/download/3.013/GeometricWeather.3.013_fdroid.apk",
  "releaseTag": "3.013",
  "sha256": null,
  "lastUpdated": "2026-02-21",
  "featured": false,
  "tags": [
    "weather",
    "forecast",
    "open-source"
  ]
}
```

File naming: `geometric-weather.json` (all lowercase, hyphenated)

At build time, all entries are bundled into the static site.
No runtime fetching, no API calls, no dynamic backend.
Predictable. Auditable. Secure.

---

## 📊 Project Stats

<p align="center">
  <img src="https://img.shields.io/github/stars/dwip-the-dev/FastDroid?style=social" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/dwip-the-dev/FastDroid?style=social" alt="GitHub forks" />
  <img src="https://img.shields.io/github/watchers/dwip-the-dev/FastDroid?style=social" alt="GitHub watchers" />
  <br/>
  <img src="https://img.shields.io/github/last-commit/dwip-the-dev/FastDroid" alt="Last commit" />
  <img src="https://img.shields.io/github/issues-raw/dwip-the-dev/FastDroid" alt="Open issues" />
  <img src="https://img.shields.io/github/issues-pr-raw/dwip-the-dev/FastDroid" alt="Open PRs" />
</p>

---

## 🚀 Roadmap

- [x] Static site generation

- [x] JSON catalog format

- [x] Icon support

- [x] Search & filtering

- [x] "Featured" collections
      
- [ ] Category pages

- [ ] Metadata validation tools

- [ ] Optional integrity verification

---

## 📜 License

The FastDroid codebase is open-source under the MIT License.
Individual apps listed in the catalog are licensed by their respective authors.

---

<p align="center">
  <b>Fast, transparent, open-source Android app discovery.</b>
  <br />
  <a href="https://fastdroid.vercel.app/">🌐 Website</a> •
  <a href="https://github.com/dwip-the-dev/FastDroid">🐙 GitHub</a> •
  <a href="https://github.com/dwip-the-dev/FastDroid/issues">🐛 Report Issue</a>
  <br /><br />
  <img src="https://img.shields.io/badge/made%20with-%E2%9D%A4%EF%B8%8F-red" alt="Made with ❤️" />
  <img src="https://img.shields.io/badge/built%20for-speed-00ADD8" alt="Built for Speed" />
</p>
