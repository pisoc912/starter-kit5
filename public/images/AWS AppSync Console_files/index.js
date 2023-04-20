import { importUnifiedConsoleApp as c } from "./loader.js";
(async () => {
  try {
    const { initializeUnifiedConsoleApp: t } = await c();
    t == null || t();
  } catch {
  }
})();
