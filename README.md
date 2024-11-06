# Emoji Decoder minigame

A fun minigame where a player is presented with a word, a list of emojis that each correspond to a letter, and has to convert the word into the emoji equivalent within a short time limit.

## Example

Password: "SUNFLOWER"
Time Limit: 45 seconds

Emoji Key (3 letters per emoji):
🌞 = A, B, C
🌙 = D, E, F
🌎 = G, H, I
🌈 = J, K, L
🌊 = M, N, O
🌴 = P, Q, R
🌷 = S, T, U
🌵 = V, W, X
🌺 = Y, Z

Correct Answer:
🌷🌷🌊🌙🌈🌊🌵🌙🌴

![Emoji Decoder minigame](assets/Screenshot.png)


## 🛠 Tech Stack

- **Framework**: Next.js 14, react 18
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Analytics**: Umami


## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local && nvim .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```
