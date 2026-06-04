"use client";

import { useState, type KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";

export function TagInput() {
  const form = useFormContext();
  const keywords: string[] = form.watch("keywords") || [];
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (keywords.length >= 10) {
      toast.warning("最多添加10个关键词");
      return;
    }
    if (keywords.includes(trimmed)) {
      toast.warning("关键词已存在");
      return;
    }
    form.setValue("keywords", [...keywords, trimmed]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    form.setValue(
      "keywords",
      keywords.filter((_, i) => i !== index)
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !inputValue && keywords.length > 0) {
      removeTag(keywords.length - 1);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        知识点关键词{" "}
        <span className="text-muted-foreground font-normal">
          ({keywords.length}/10)
        </span>
      </Label>
      <div className="flex flex-wrap gap-1.5 p-2 border rounded-lg bg-background min-h-[42px] items-center">
        {keywords.map((tag, i) => (
          <Badge
            key={`${tag}-${i}`}
            variant="secondary"
            className="gap-1 pr-1 cursor-default"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">移除 {tag}</span>
            </button>
          </Badge>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={keywords.length === 0 ? "输入关键词后按回车" : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm py-1"
        />
      </div>
    </div>
  );
}
