import { expect, test } from "@playwright/test";
import { ROUTES } from "../support/routes";

test("@regression 主题切换后刷新仍保持", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(ROUTES.home);

  const initialTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });

  await page.getByRole("button", { name: "Toggle theme" }).click();

  await expect
    .poll(async () => {
      return page.evaluate(() => {
        return document.documentElement.getAttribute("data-theme");
      });
    })
    .not.toBe(initialTheme);

  const toggledTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });

  await expect
    .poll(async () => {
      return page.evaluate(() => {
        return window.localStorage.getItem("shokax-color-scheme");
      });
    })
    .toBe(toggledTheme);

  await page.reload();

  await expect
    .poll(async () => {
      return page.evaluate(() => {
        return document.documentElement.getAttribute("data-theme");
      });
    })
    .toBe(toggledTheme);

  await expect
    .poll(async () => {
      return page.evaluate(() => {
        return window.localStorage.getItem("shokax-color-scheme");
      });
    })
    .toBe(toggledTheme);
});

test("@regression Ctrl/Cmd+K 可唤起搜索面板", async ({ page }) => {
  await page.goto(ROUTES.home);

  await page.getByRole("button", { name: "Search" }).click();
  const searchDialog = page.getByRole("dialog", { name: "Search" });
  await expect(searchDialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(searchDialog).not.toBeVisible();

  const shortcut = process.platform === "darwin" ? "Meta+K" : "Control+K";
  await page.keyboard.press(shortcut);
  await expect(searchDialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(searchDialog).not.toBeVisible();
});
