"use client";

import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { EmojiKeyType } from "@/lib/game-utils";

interface EmojiKeyProps {
  emojiKey: EmojiKeyType;
  isVisible: boolean;
}

export default function EmojiKey({ emojiKey, isVisible }: EmojiKeyProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isVisible) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Emoji Key</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {emojiKey.map(({ emoji, letters }) => (
              <div
                key={emoji}
                className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors"
              >
                <span className="text-2xl mb-1">{emoji}</span>
                <span className="text-lg font-mono">{letters.join(" ")}</span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
