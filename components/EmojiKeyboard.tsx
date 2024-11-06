"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EmojiKeyType } from "@/lib/game-utils";

interface EmojiKeyboardProps {
  emojiKey: EmojiKeyType;
  onEmojiClick: (emoji: string) => void;
  className?: string;
}

export default function EmojiKeyboard({ emojiKey, onEmojiClick, className }: EmojiKeyboardProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {emojiKey.map(({ emoji }) => (
        <Button
          key={emoji}
          variant="outline"
          className="text-2xl h-12 hover:bg-secondary/80"
          onClick={() => onEmojiClick(emoji)}
        >
          {emoji}
        </Button>
      ))}
      <Button
        variant="outline"
        className="text-sm h-12 hover:bg-secondary/80"
        onClick={() => onEmojiClick("")}
      >
        ⌫
      </Button>
    </div>
  );
}