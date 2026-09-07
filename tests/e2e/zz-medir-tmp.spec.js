import { test } from "@playwright/test";
test("dump home registro", async ({ page }) => {
  page.on("console", m => console.log("PAGE:", m.text()));
  await page.goto("/");
  await page.waitForTimeout(2500);
  const t = await page.evaluate(() => document.querySelector("#registro").innerText);
  console.log("TEXTO:\n" + t);
  const links = await page.evaluate(() => [...document.querySelectorAll("#registro a")].map(a=>a.href.slice(0,80)));
  console.log("LINKS: " + JSON.stringify(links, null, 1));
});
