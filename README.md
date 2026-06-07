# Portal Dash Site

Static website for [portaldash.com](https://portaldash.com), hosted on GitHub Pages.

## Pages

| URL | File |
|-----|------|
| [portaldash.com](https://portaldash.com) | `index.html` |
| [portaldash.com/keepthereceipt](https://portaldash.com/keepthereceipt) | `keepthereceipt/index.html` |
| [portaldash.com/keepthereceipt/privacy](https://portaldash.com/keepthereceipt/privacy) | `keepthereceipt/privacy/index.html` |

## Local preview

From this folder, run a simple static server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Open `http://localhost:8080`. Paths like `/keepthereceipt/` work the same as on GitHub Pages when served from the site root.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `portaldash/portaldash.com` or your username.github.io repo).
2. Push the contents of this folder to the repo.
3. In the repo: **Settings → Pages**
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`
4. Add a **Custom domain:** `portaldash.com`
5. At your domain registrar, add DNS records for GitHub Pages:
   - **A records** for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `your-username.github.io` (optional, if you use www)
6. Enable **Enforce HTTPS** once DNS has propagated.

The `CNAME` file in this repo tells GitHub Pages to use `portaldash.com`.

## Updating content

- **App list:** edit `index.html`
- **Keep the Receipt page:** edit `keepthereceipt/index.html`
- **Privacy policy:** replace the placeholder in `keepthereceipt/privacy/index.html`
- **Store links:** update the App Store / Google Play buttons on the app page when listings are live
- **Theme:** header button cycles System → Light → Dark (default is System, following OS/browser preference). Choice is saved in `localStorage`.

## Project structure

```
portaldash-website/
├── CNAME
├── index.html
├── css/style.css
├── js/theme.js
├── assets/keep-the-receipt-icon.png
├── keepthereceipt/
│   ├── index.html
│   └── privacy/index.html
└── README.md
```
