import { create } from "zustand";

export const useSettingsStore =
  create((set, get) => ({
    geminiKeys: [],
    activeKeyId: null,

    loadKeys: () => {
      const keys = JSON.parse(
        localStorage.getItem(
          "gemini_keys"
        ) || "[]"
      );

      const active =
        localStorage.getItem(
          "active_gemini_key"
        );

      set({
        geminiKeys: keys,
        activeKeyId: active,
      });
    },

    addKey: (key, name) => {
      const newKey = {
        id: crypto.randomUUID(),
        key,
        name:
          name ||
          `Key ${
            get().geminiKeys.length + 1
          }`,
        usageCount: 0,
        createdAt: Date.now(),
      };

      const updated = [
        ...get().geminiKeys,
        newKey,
      ];

      localStorage.setItem(
        "gemini_keys",
        JSON.stringify(updated)
      );

      if (!get().activeKeyId) {
        localStorage.setItem(
          "active_gemini_key",
          newKey.id
        );
      }

      set({
        geminiKeys: updated,
        activeKeyId:
          get().activeKeyId || newKey.id,
      });
    },

    removeKey: (id) => {
      const updated =
        get().geminiKeys.filter(
          (k) => k.id !== id
        );

      localStorage.setItem(
        "gemini_keys",
        JSON.stringify(updated)
      );

      set({
        geminiKeys: updated,
      });
    },

    setActiveKey: (id) => {
      localStorage.setItem(
        "active_gemini_key",
        id
      );

      set({
        activeKeyId: id,
      });
    },

    incrementUsage: (id) => {
      const updated =
        get().geminiKeys.map((k) =>
          k.id === id
            ? {
                ...k,
                usageCount:
                  k.usageCount + 1,
              }
            : k
        );

      localStorage.setItem(
        "gemini_keys",
        JSON.stringify(updated)
      );

      set({
        geminiKeys: updated,
      });
    },
  }));