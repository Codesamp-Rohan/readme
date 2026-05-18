"use client";

import { useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { Eye, EyeOff } from "lucide-react";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

export default function SettingsModal({onClose}) {
    const geminiKeys = useSettingsStore((state) => state.geminiKeys);
    const addKey = useSettingsStore((state) => state.addKey);
    const removeKey = useSettingsStore((state) => state.removeKey);
    const activeKeyId = useSettingsStore((state) => state.activeKeyId);
    const setActiveKey = useSettingsStore((state) => state.setActiveKey);
    const [keyVisible, setKeyVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

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
                    <span className="flex items-center gap-2 text-lg font-semibold text-[--text-primary]">
                        <Image src="/assets/key.png" alt="Settings" width={16} height={16} className="inline-block" />
                        <h3>Gemini API Key</h3>
                    </span>

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
                    className="w-full px-3 py-1 !text-sm border border-[--border] rounded-lg bg-[--foreground] outline-none text-[--text-secondary] !font-mono"
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
                    if (!value) return;
                    addKey(value, name);
                    setName("");
                    setValue("");
                }}
                    className="mt-4 w-full px-3 py-2 text-sm rounded-lg bg-[--secondary-foreground] text-[--secondary] font-medium"
                >
                    Save Key
                </button>

                <div className="mt-4 space-y-2">
  {geminiKeys.map((key) => (
    <div
      key={key.id}
      className={`px-2 py-1 rounded-lg border flex items-center justify-between hover:bg-[var(--foreground)] cursor-pointer transition-[200ms] ${
        activeKeyId === key.id
          ? "border-l-green-500 border-l-4"
          : "border-[--border]"
      }`}
    >
      <div className="flex flex-col items-start">
        <p className="!m-0 !text-sm font-medium !font-mono">
          {key.key.slice(0, 14)}...
        </p>

        <p className="!m-0 !text-xs text-zinc-400 !font-mono" style={{ margin: 0 }}>
          {key.usageCount} uses
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            setActiveKey(key.id)
          }
          className="rounded-lg bg-[--card-foreground] !text-[var(--accent)] px-2 py-1 text-sm transition-all bg-primary hover:bg-[var(--card-foreground)] hover:border-[var(--accent-foreground)] border-[var(--primary)] !hover:text-[var(--text-primary)] hover:translate-y-[-1px] transition-[0.3s"
        >
          Active
        </button>

        <button
          onClick={() =>
            removeKey(key.id)
          }
          className="rounded-lg  bg-[#ff000033] text-[#ff0000] px-2 py-1 text-sm transition-all hover:bg-accent hover:translate-y-[-1px] transition-[0.3s]"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
            </div>
        </div>
    );
}