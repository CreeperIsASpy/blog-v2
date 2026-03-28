[English](./README.md) | [中文](./README_zh-cn.md)

# Astro Blog ShokaX

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/theme-shoka-x/astro-blog-shokax)
[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https://github.com/theme-shoka-x/astro-blog-shokax)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/theme-shoka-x/astro-blog-shokax)

This project is a reconstruction of [Hexo Theme ShokaX](https://github.com/theme-shoka-x/hexo-theme-shokaX) on Astro, built with Astro + Svelte 5 + UnoCSS.

[<img width="3840" height="2160" alt="Two-column preview" src="https://github.com/user-attachments/assets/e740fc5f-c66f-4500-9da8-036477a42af6" />](https://preview.astro.kaitaku.xyz/)

Three-column layout preview:
<img width="3840" height="2160" alt="Three-column preview" src="https://github.com/user-attachments/assets/b854e7bf-ac19-444b-aea3-661657135a10" />

🌐 Live preview (two-column): [https://preview.astro.kaitaku.xyz/](https://preview.astro.kaitaku.xyz/)

## ✨ Features

- Elegant UI that continues the original ShokaX design language
- Built-in light / dark theme support
- Interactive blog installation, configuration, and usage through HyC
- Extensible plugin system powered by Hyacine Plugins
- Rich Markdown / MDX enhancement features
- Tag cloud, timeline view, and category tree support
- Backend-free, high-performance full-text search powered by Pagefind
- Standalone friends links page support
- Built-in moments / status updates support
- Automatically generated smart table of contents (ToC)
- AI summaries and AI article recommendations powered by HyC
- Build-time post encryption based on AES-256-GCM and PBKDF2
- Performance-first design and development philosophy
- More extension capabilities — see the documentation for details

## 📦 Installation

We recommend using [Bun](https://bun.sh/) to run this project. Compatibility with Node.js is not guaranteed.

You can clone this repository directly to get started (and maybe drop us a Star 😜), or use the [interactive installation flow provided by HyC](https://docs.astro.kaitaku.xyz/start/guides/).

Quick start:

```bash
git clone https://github.com/theme-shoka-x/astro-blog-shokax

cd astro-blog-shokax

bun install

# Start the development server
bun run dev

# Build for production
bun run build
```

Your site is now ready to use. If you'd like to customize it, check the full documentation for the next step: [ShokaX Astro Docs](https://docs.astro.kaitaku.xyz/start/guides/)

## 📂 Project Structure

This project follows the standard directory conventions of Astro 5 and Vite:

```tree
astro-blog-shokax
├── src/                          # Source files
│   ├── assets/                   # Images / fonts
│   │   ├── fonts/                # Fonts
│   │   ├── images/               # 🌟 Cover images
│   │   ├── icons/                # Part of RemixIcon assets (used for Shadow DOM)
│   │   ├── avatar.avif           # 🌟 Site owner avatar
│   ├── components/               # Astro / Svelte components
│   ├── content/                  # Content outside collections
│   │   ├── friend-rules.md       # 🌟 Friends link rules
│   ├── i18n/                     # i18n system
│   ├── layouts/                  # Page layouts
│   ├── moments/                  # 🌟 Moments / status content collection
│   ├── pages/                    # Route pages
│   ├── posts/                    # 🌟 Post content collection
│   ├── remark-plugins/           # Markdown extensions
│   ├── stores/                   # Global stores
│   ├── styles/                   # Non-component stylesheets
│   ├── toolkit/                  # Utilities
│   ├── content.config.ts         # Content collections config
│   ├── theme.config.ts           # 🌟 Theme configuration
│   ├── theme.config.template.txt # HyC interactive config template
├── hyacine.yml                   # HyC configuration
├── astro.config.mjs              # 🌟 Astro configuration

# Items marked with 🌟 are the key files/folders you will likely care about when using this theme
```

## ⚙️ HyC Capabilities

ShokaX includes `@hyacine/cli` and `@hyacine/core` and provides the following capabilities:

- AI recommendations and summaries
- Interactive installation and configuration
- Lightweight local CMS
- Blog extension plugins

```shell
# Global installation is recommended, or you can use `bun hyc` later instead of `hyc`
bun add @hyacine/cli -g

hyc sync # Sync database and content collections

# Create a new post
hyc new "Title"

# Publish a post
hyc publish "title/slug/file-name"

# Sort posts by category
hyc sort category

# Start the local CMS and interactive configuration
hyc serve
# Visit the official console at https://hyc.kaitaku.xyz/ to get started

# HyC plugins are currently in Alpha and related documentation is still in progress
# This theme currently enables the Site-Uptime (site age) and Mouse-firework (click effect) plugins by default
# See hyacine.plugin.ts for details
```

## 🚀 Performance

We use [LHCI](https://github.com/GoogleChrome/lighthouse-ci) to test page performance, and each commit includes test results. Our minimum requirement is Lighthouse desktop Performance 92+, and in practice the score is usually around 98–100:

<img width="1702" height="952" alt="lighthouse" src="https://github.com/user-attachments/assets/05b8768f-5f04-4204-8f4f-7f2f6f30e102" />

## 🖌️ Three-Column Layout

We have introduced an experimental three-column layout in ShokaX Astro:

<img width="3840" height="2160" alt="Three-column layout preview" src="https://github.com/user-attachments/assets/47041d58-ae29-40cc-b3fd-31787db83cac" />

You can configure which cards are shown in the right sidebar and in what order. The currently supported cards are:

- Announcement
- Site search
- Calendar
- Recent moments
- Random posts
- Tag cloud

You can enable it by editing the configuration file:

```ts
layout: {
  mode: "three-column",
  rightSidebar: {
    order: ["announcement", "search", "calendar", "recentMoments", "randomPosts", "tagCloud"],
    announcement: true,
    search: true,
    calendar: true,
    recentMoments: true,
    randomPosts: true,
    tagCloud: true,
  },
},
```

The right sidebar is shown only on wide screens (desktop). On mobile, the original two-column layout is used.

## 🤝 Contributing

Pull requests are welcome. The project uses the following workflows to validate changes:

- Lighthouse CI, with the following thresholds:
  - Performance >= 0.92
  - Accessibility >= 0.9
  - Best Practices and SEO >= 0.95
- CodeQL Scan & Code Quality
- ~~E2E testing~~ (currently being introduced)

If CI does not pass, you can still submit a PR and we will help improve it.

This project is licensed under AGPL v3.

## 📄 Notes

### About assets and licensing

- The main styles and design philosophy of this project are inspired by [Shoka](https://github.com/amehime/hexo-theme-shoka). However, this project is an independent implementation. To pay tribute, the original MIT license of Shoka is included in the `licenses` directory as `LICENSE-shoka`.
- This project is an independently developed rewrite of [Hexo ShokaX](https://github.com/theme-shoka-x/hexo-theme-shokaX). It does not directly reuse its code or assets. It is maintained directly by the ShokaX project team, which is also why the project uses the ShokaX name.
- The default avatar image in this project is artwork by [QuAn\_](https://www.pixiv.net/users/6657532). It is included for demonstration purposes only and remains the property of the original author. Please replace it with an asset you are authorized to use before deploying to production.
- This project uses [Maple Mono](https://font.subf.dev/zh-cn/) and [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) as the default fonts. Both are distributed under the OFL 1.1 license, with license texts available at `licenses/LICENSE-maple-mono.txt` and `licenses/OFL.txt` respectively.
  During the build process, fonts may be subsetted, converted, and compressed in compliance with OFL 1.1.
- The default cover images in this project come from [Unsplash](https://unsplash.com/) and are used and distributed under the [Unsplash License](https://unsplash.com/license).
- The project's own `LICENSE` in the repository root applies only to the code assets in this project. For any non-code assets not covered above or not explicitly identified, the root license does not apply and rights should be considered reserved by the original author.

### 🙏 Acknowledgements

The ShokaX development team would like to thank every open source project, user, contributor, and developer who has supported ShokaX in the past, present, and future. Without them, this project would not exist.

These projects in particular have provided tremendous support during development, and we would like to thank them again here (in no particular order):

- [Astro](https://astro.build/): the foundation of this project
- [UnoCSS](https://unocss.dev/): a modern atomic CSS engine that completely solved the icon issues that troubled the team for a long time in earlier iterations
- [Svelte](https://svelte.dev/): the frontend UI framework used in this project, an excellent choice for personal blogs
- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki): directly inspired the team's Astro migration and provided an excellent example to follow
- [Bun](https://bun.sh/): the runtime used in this project, fast and delightful to use
- [Shoka](https://github.com/amehime/hexo-theme-shoka): the origin of ShokaX — without Shoka, ShokaX would not exist
