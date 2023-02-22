import { STORAGE_KEYS } from "./constants";

export const isChatGptExtensionEnabled = async () => {
  const val = await chrome.storage.local.get([
    STORAGE_KEYS.enableChatGptExtension,
  ]);
  return val[STORAGE_KEYS.enableChatGptExtension];
};

export const setChatGptExtensionEnableStatus = async (enable: boolean) => {
  chrome.storage.local.set({ [STORAGE_KEYS.enableChatGptExtension]: enable });
};
