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

export const setValueInStorage = async (val: string, key: STORAGE_KEYS) =>
  chrome.storage.local.set({ [key]: val });

export const getValueFromStorage = async (key: STORAGE_KEYS) =>
  (await chrome.storage.local.get([key]))[key];

export const deleteKeyFromStorage = async (key: STORAGE_KEYS) =>
  chrome.storage.local.remove(key);
