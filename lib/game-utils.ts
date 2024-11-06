import { shuffle } from "./utils";

const emojis = ["🌞", "🌙", "🌎", "🌈", "🌊", "🌴", "🌷", "🌵", "🌺"];
const letterGroups = [
  ["A", "B", "C"],
  ["D", "E", "F"],
  ["G", "H", "I"],
  ["J", "K", "L"],
  ["M", "N", "O"],
  ["P", "Q", "R"],
  ["S", "T", "U"],
  ["V", "W", "X"],
  ["Y", "Z"],
];

export type EmojiKeyType = {
  emoji: string;
  letters: string[];
}[];

function generateRandomLetterGroups() {
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const shuffledLetters = shuffle([...allLetters]);
  const groups: string[][] = [];

  // Create 9 groups (to match number of emojis)
  for (let i = 0; i < 9; i++) {
    // Last group might have fewer letters
    const groupSize = i === 8 ? 2 : 3;
    groups.push(shuffledLetters.slice(i * 3, (i * 3) + groupSize));
  }

  return groups;
}

export function generateRandomEmojiKey(): EmojiKeyType {
  const shuffledEmojis = shuffle([...emojis]);
  const randomLetterGroups = generateRandomLetterGroups();

  return randomLetterGroups.map((letters, index) => ({
    emoji: shuffledEmojis[index],
    letters,
  }));
}


export function createLetterToEmojiMap(emojiKey: EmojiKeyType): { [key: string]: string } {
  return emojiKey.reduce((acc, { emoji, letters }) => {
    letters.forEach((letter) => {
      acc[letter] = emoji;
    });
    return acc;
  }, {} as { [key: string]: string });
}

export function convertWordToEmojis(word: string, letterToEmojiMap: { [key: string]: string }): string {
  return word
    .toUpperCase()
    .split("")
    .map((letter) => letterToEmojiMap[letter] || letter)
    .join("");
}

export function calculateTimeLimit(difficulty: string, currentScore: number): number {
  const baseTime = {
    easy: 45,
    medium: 30,
    hard: 20
  }[difficulty] || 45;

  // Reduce time by 1 second for every 500 points
  const reduction = Math.floor(currentScore / 500);
  return Math.max(baseTime - reduction, 10); // Minimum 10 seconds
}