"use client";

import { useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { Eye, EyeOff } from "lucide-react";
import { Copy, Check } from "lucide-react";

export default function SettingsModal({onClose}) {
    const geminiKey = useSettingsStore((state) => state.geminiKey);
    const setGeminiKey = useSettingsStore((state) => state.setGeminiKey);
    const [keyVisible, setKeyVisible] = useState(false);
    const [value, setValue] = useState(geminiKey);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        setCopied(true);
        navigator.clipboard.writeText(value);
        setInterval(() => {
            setCopied(false)
        }, [500])
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[--background] border border-[--border] p-6 rounded-2xl w-[400px] border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                    <h3>
                        Gemini API Key
                    </h3>

                    <button onClick={onClose} className={ "text-xl font-semibold text-[--text-primary]"}>
                        ✕
                    </button>
                </div>
                <span className="flex items-center gap-2 relative">
                <input
                    type={keyVisible ? "text" : "password"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="your gemin-api-key ..."
                    className="w-full px-3 py-1 border border-[--border] rounded-lg bg-[--foreground] outline-none text-[--text-secondary]"
                />
                    <button onClick={() => setKeyVisible(!keyVisible)}>
                        {keyVisible ? (
                            <Eye className="w-5 h-5 text-[--text-secondary]" />
                        ) : (
                            <EyeOff className="w-5 h-5 text-[--text-secondary]" />
                        )}
                    </button>
                    <button onClick={copyToClipboard} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)" }}>
                        {copied ? (
                        <Check
                            size={18}
                            className="text-green-500"
                        />
                    ) : (
                        <Copy
                            size={18}
                            className="text-[--text-secondary]"
                        />
                    )}

        </button>

                </span>

                <button
                    onClick={() => {
                        setGeminiKey(value);

                        onClose();
                    }}
                    className="mt-4 w-full px-3 py-2 text-sm rounded-lg bg-[--secondary-foreground] text-[--secondary] font-medium"
                >
                    Save Key
                </button>
            </div>
        </div>
    );
}