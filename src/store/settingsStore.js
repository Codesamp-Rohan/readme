import { create } from "zustand";

export const useSettingsStore = create((set) => ({
    geminiKey:
        typeof window !== "undefined"
            ? localStorage.getItem("gemini_key") || ""
            : "",

    setGeminiKey: (key) => {
        localStorage.setItem("gemini_key", key);

        set({
            geminiKey: key,
        });
    },
}));