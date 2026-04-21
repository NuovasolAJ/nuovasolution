"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function PromptInput({
  placeholder = "Type a message...",
  defaultValue = "",
  onSubmit,
  className,
  disabled = false,
}: PromptInputProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit?.(value.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 bg-white border border-brand-sandDark rounded-2xl px-4 py-3 shadow-sm",
        "focus-within:border-brand-gold focus-within:ring-2 focus-within:ring-brand-gold/20 transition-all",
        className
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex-1 bg-transparent text-brand-navy text-sm outline-none",
          "placeholder:text-brand-stoneLight",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Chat input"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all",
          "bg-brand-navy text-white text-xs font-bold",
          "hover:bg-brand-navyLight active:scale-95",
          (disabled || !value.trim()) && "opacity-40 cursor-not-allowed"
        )}
        aria-label="Send"
      >
        →
      </button>
    </form>
  );
}
