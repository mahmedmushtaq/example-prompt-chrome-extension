import { MESSAGE_KEYS, STORAGE_KEYS } from "../globals/constants";
import {
  deleteKeyFromStorage,
  getValueFromStorage,
  setValueInStorage,
} from "../globals/helpers";

window.onload = async () => {
  async function init() {
    window.addEventListener(
      "message",
      async (event) => {
        // We only accept messages from this window to itself [i.e. not from any iframes]
        if (event.source != window) return;

        if (
          event?.data?.type === MESSAGE_KEYS.SEND_MSG_EXAMPLE_PROMPT_EXTENSION
        ) {
          await setValueInStorage(
            event.data.text,
            STORAGE_KEYS.storeCopiedPrompt
          );

          const data = {
            type: MESSAGE_KEYS.RECEIVED_MSG_EXAMPLE_PROMPT_EXTENSION,
            data: "done",
          };
          window.postMessage(data, "*");
        }
      },
      false
    );

    const textAreaEl = document.querySelector(
      "[data-id^='root']"
    ) as HTMLTextAreaElement;
    if (!textAreaEl) {
      return console.log(
        "unable to locate textarea. Please consult to admin for this case"
      );
    }

    const valueFromStorage = await getValueFromStorage(
      STORAGE_KEYS.storeCopiedPrompt
    );

    textAreaEl.focus();
    document.execCommand("insertText", false, valueFromStorage);
    await deleteKeyFromStorage(STORAGE_KEYS.storeCopiedPrompt);
  }

  init();
};
