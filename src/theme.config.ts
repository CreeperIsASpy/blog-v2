// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  siteName: "仿生猫的小窝",
  locale: "zh-CN", // 网站语言: "zh-CN" | "en"
  nav: [
    {
      href: "/",
      text: "首页",
      icon: "i-ri-home-line",
    },
    {
      text: "文章",
      href: "/random/",
      icon: "i-ri-quill-pen-fill",
      dropbox: {
        enable: true,
        items: [
          {
            href: "/categories/",
            text: "分类",
            icon: "i-ri-book-shelf-fill",
          },
          {
            href: "/tags/",
            text: "标签",
            icon: "i-ri-price-tag-3-fill",
          },
          {
            href: "/archives/",
            text: "归档",
            icon: "i-ri-archive-line",
          },
        ],
      },
    },
    {
      text: "友链",
      href: "/friends/",
      icon: "i-ri-link",
    },
    {
      text: "动态",
      href: "/moments/",
      icon: "i-ri-chat-quote-line",
    },
  ],
  brand: {
    title: "仿生猫的小窝",
    subtitle: "只要不被世界改变，你就改变了世界。",
    logo: "✨",
  },
  cover: {
    enable: true,
    preload: true,
    fixedCover: {
      enable: true,
      url: "cover-banner",
    },
    nextGradientCover: false, // 文章导航使用渐变背景
  },
  sidebar: {
    author: "CreeperIsASpy",
    description: "A 13-year-old boy with few thoughts but big dreams.",
    social: {
      github: {
        url: "https://github.com/CreeperIsASpy",
        icon: "i-ri-github-fill",
      },
      twitter: {
        url: "https://x.com/Creeper1sASpy",
        icon: "i-ri-twitter-x-line",
      },
      email: {
        url: "mailto:mail@creeperspy.top",
        icon: "i-ri-mail-line",
      },
    },
  },
  footer: {
    since: 2025,
    icon: {
      name: "sakura rotate",
      color: "var(--color-pink)",
    },
    count: true,
    powered: true,
    icp: {
      enable: true,
      // icon: '/beian-icon.png',
      icpnumber: "萌ICP备20250384号",
      icpurl: "https://icp.gov.moe/?keyword=20250384",
      // beian: '网安备案号',
      // recordcode: 'xxxxx',
    },
  },
  tagCloud: {
    startColor: "var(--grey-6)",
    endColor: "var(--color-blue)",
  },
  widgets: {
    randomPosts: true,
    recentComments: true,
    recentCommentsLimit: 10,
  },
  comments: {
    enable: false,
    waline: {
      serverURL: "https://waline.creeperspy.top",
      lang: "zh-CN",
    },
  },
  hyc: {
    // HYC 扩展总开关：关闭后其所有子功能不可用
    enable: false,
    aiSummary: {
      // AI 摘要卡片开关（受 hyc.enable 总开关控制）
      enable: true,
      // 卡片标题
      title: "AI 摘要",
      // 是否显示摘要使用的模型名称
      showModel: true,
    },
    aiRecommend: {
      // AI 相近文章推荐开关（受 hyc.enable 总开关控制）
      enable: true,
      // 默认展示前 3 篇
      limit: 3,
      // 最低相似度阈值（0.4 = 40%）
      minSimilarity: 0.4,
    },
  },
  nyxPlayer: {
    enable: true,
    preset: "shokax",
    darkModeTarget: ':root[data-theme="dark"]',
    urls: [
      {
        name: "仿生猫梦见苦力怕 | 我喜欢的音乐",
        url: "https://music.163.com/#/playlist?id=13876822200",
      },
    ],
  },
  visibilityTitle: {
    enable: true,
    leaveTitle: "👀 你先忙，我等你回来~",
    returnTitle: "🎉 欢迎回来！",
    restoreDelay: 3000,
  },
  home: {
    selectedCategories: [{ name: "笔记" }, { name: "前端" }],
    pageSize: 5,
    title: {
      behavior: "custom",
      customTitle: "仿生猫的小窝！",
    },
  },
  layout: {
    mode: "two-column",
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
  friends: {
    title: "友链",
    description: "友情链接！",
    // avatar: "https://example.com/your-avatar.png",
    // color: "var(--color-pink)",
    // siteImage: "https://example.com/your-site-preview.png",
    links: [
      {
        url: "https://pclc.cc/",
        title: "PCL Community",
        desc: "很棒的开发组织，虽然我退了，但还是很棒。",
        author: "PCL-Community @ GitHub",
        avatar: "https://avatars.githubusercontent.com/u/165488354?s=200&v=4",
        color: "var(--color-orange)",
        siteImage: "https://www.pclc.cc/img/ogimage.png",
      },
      {
        url: "https://org.creeperspy.top/",
        title: "Ignis Studio",
        desc: "我的开发组织。",
        author: "CreeperIsASpy @ GitHub",
        avatar: "https://avatars.githubusercontent.com/u/240111334?s=400&v=4",
        color: "var(--color-red)",
      },
      {
        url: "https://mfn233.github.io/",
        title: "MFn 的个人网站",
        desc: "是我个人站的抄袭对象（",
        author: "MFn233 @ GitHub",
        avatar: "https://avatars.githubusercontent.com/u/103323756?v=4",
        color: "var(--color-blue)",
      },
      {
        url: "https://cylorine.studio",
        title: "Cylorine Studio",
        desc: "很好的组织，帮风花引流。",
        author: "CylorineStudio @ GitHub",
        avatar: "https://avatars.githubusercontent.com/u/176894598?s=200&v=4",
        color: "var(--color-green)",
      },
    ],
  },
  copyright: {
    license: "CC-BY-NC-SA-4.0",
    show: true,
  },
});
