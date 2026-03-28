export const ROUTES = {
  home: "/",
  page2: "/page/2/",
  moments: "/moments/",
  tags: "/tags/",
  categories: "/categories/",
} as const;

export const POSTS = {
  helloWorld: "/posts/hello-world/",
  encryptedTest: "/posts/encrypted-test/",
  noteMdxDemo: "/posts/note-mdx-demo/",
  postMigrationTest: "/posts/post-migration-test/",
} as const;

export const SEARCH_TERMS = {
  publicPostTitle: "Hello World!",
  encryptedPostTitle: "加密文章测试",
  encryptedOnlyText: "AES-GCM",
} as const;
