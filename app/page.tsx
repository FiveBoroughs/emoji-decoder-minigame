"use client";

import EmojiKey from "@/components/EmojiKey";
import EmojiKeyboard from "@/components/EmojiKeyboard";
import GameTimer from "@/components/GameTimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  convertWordToEmojis,
  createLetterToEmojiMap,
  generateRandomEmojiKey,
  type EmojiKeyType,
} from "@/lib/game-utils";
import { cn } from "@/lib/utils";
import { Timer, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameActive, setGameActive] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [emojiKey, setEmojiKey] = useState<EmojiKeyType>([]);
  const [letterToEmojiMap, setLetterToEmojiMap] = useState<{
    [key: string]: string;
  }>({});
  const { toast } = useToast();

  const words = {
    easy: ["SUN", "CAT", "DOG", "HAT", "BIRD"],
    medium: ["FLOWER", "PLANET", "ROCKET", "DRAGON"],
    hard: ["SUNFLOWER", "STARLIGHT", "MOONBEAM", "RAINBOW"],
  };

  const handleEmojiClick = (emoji: string) => {
    if (emoji === "") {
      setUserInput((prev) => prev.slice(0, -1));
    } else {
      setUserInput((prev) => prev + emoji);
    }
  };

  const startGame = () => {
    const newEmojiKey = generateRandomEmojiKey();
    const newLetterToEmojiMap = createLetterToEmojiMap(newEmojiKey);
    const wordList = words[difficulty as keyof typeof words];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    setEmojiKey(newEmojiKey);
    setLetterToEmojiMap(newLetterToEmojiMap);
    setPassword(randomWord);
    setUserInput("");
    setTimeLeft(difficulty === "easy" ? 45 : difficulty === "medium" ? 30 : 20);
    setGameActive(true);
  };

  const checkAnswer = useCallback(() => {
    const correctEmojiSequence = convertWordToEmojis(
      password,
      letterToEmojiMap,
    );
    if (userInput === correctEmojiSequence) {
      const timeBonus = Math.floor(timeLeft * 10);
      const newScore = score + 100 + timeBonus;
      setScore(newScore);
      toast({
        title: "Correct! 🎉",
        description: `You earned ${100 + timeBonus} points!`,
      });
    } else {
      toast({
        title: "Wrong answer! 😢",
        description: "Try again!",
        variant: "destructive",
      });
    }
    setGameActive(false);
  }, [letterToEmojiMap, password, score, timeLeft, toast, userInput]);

  useEffect(() => {
    if (timeLeft === 0 && gameActive) {
      checkAnswer();
    }
  }, [checkAnswer, gameActive, timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <main className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Emoji Decoder
          </h1>
          <p className="text-muted-foreground">
            Decode the password using the emoji key!
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-bold">Score: {score}</span>
              </div>
              <div className="flex gap-2">
                {["easy", "medium", "hard"].map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDifficulty(level)}
                    className={cn(
                      "capitalize",
                      difficulty === level && "font-bold",
                    )}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {gameActive ? (
              <>
                <div className="mb-4">
                  <Badge variant="outline" className="mb-2">
                    <Timer className="w-4 h-4 mr-1" />
                    Time Left
                  </Badge>
                  <GameTimer
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    gameActive={gameActive}
                  />
                  <Progress value={(timeLeft / 45) * 100} className="mt-2" />
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Decode This:</h2>
                  <div className="text-4xl font-mono bg-secondary p-4 rounded-lg">
                    {password}
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Your answer will appear here..."
                    value={userInput}
                    readOnly
                    className="text-center text-2xl"
                  />
                  <EmojiKeyboard
                    emojiKey={emojiKey}
                    onEmojiClick={handleEmojiClick}
                    className="mb-4"
                  />
                  <Button
                    onClick={checkAnswer}
                    className="w-full"
                    size="lg"
                    variant="default"
                  >
                    Submit Answer
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Button
                  onClick={startGame}
                  size="lg"
                  className="animate-pulse"
                  variant="default"
                >
                  Start Game
                </Button>
              </div>
            )}
          </Card>

          <EmojiKey emojiKey={emojiKey} isVisible={gameActive} />
        </div>
      </main>
    </div>
  );
}
