import * as __unocss from "unocss";
import MyPresetUI from "my-unocss-preset-ui";
import type { UserConfig } from "@unocss/core";
import { $fetch } from "ohmyfetch";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

const CDN_BASE = "https://esm.sh/";
const modulesCache = new Map<string, Promise<unknown> | unknown>();
modulesCache.set("unocss", __unocss);
modulesCache.set("my-unocss-preset-ui", MyPresetUI);

export async function evaluateUserConfig<U = UserConfig>(
  configStr: string
): Promise<U | undefined> {
  const code = configStr
    .replace(
      /import\s*(.*?)\s*from\s*(['"])unocss\2/g,
      'const $1 = await __import("unocss");'
    )
    .replace(
      /import\s*(.*?)\s*from\s*(['"])my-unocss-preset-ui\2/g,
      'const $1 = await __import("my-unocss-preset-ui");'
    )
    .replace(
      /import\s*(\{[\s\S]*?\})\s*from\s*(['"])([\w-@/]+)\2/g,
      'const $1 = await __import("$3");'
    )
    .replace(
      /import\s*(.*?)\s*from\s*(['"])([\w-@/]+)\2/g,
      'const $1 = (await __import("$3")).default;'
    )
    .replace(/export default /, "return ")
    .replace(/\bimport\s*\(/, "__import(");

  // bypass vite interop
  // eslint-disable-next-line no-new-func
  const _import = new Function("a", "return import(a);");
  const __import = (name: string): any => {
    if (!modulesCache.has(name)) {
      modulesCache.set(
        name,
        name.endsWith(".json")
          ? $fetch(CDN_BASE + name, { responseType: "json" }).then((r) => ({
              default: r,
            }))
          : _import(CDN_BASE + name)
      );
    }
    return modulesCache.get(name);
  };

  const fn = new AsyncFunction("__import", code);
  const result = await fn(__import);

  if (result) {
    return result;
  }
}
