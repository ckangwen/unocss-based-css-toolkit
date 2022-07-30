import type { UserConfigDefaults } from "@unocss/core";
import { evaluateUserConfig } from "../utils/evaluateUserConfig";
import { defaultConfigRaw } from "../defaults";

export const defaultConfig = ref<UserConfigDefaults | undefined>();

export async function load() {
  try {
    defaultConfig.value = await evaluateUserConfig(defaultConfigRaw);
  } catch (e) {
    console.error(e);
  }
}

load();
