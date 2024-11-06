export interface HighScore {
  score: number;
  date: string;
  difficulty: string;
}

export function saveHighScore(score: number, difficulty: string) {
  const scores = getHighScores();
  scores.push({
    score,
    difficulty,
    date: new Date().toISOString()
  });

  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);

  localStorage.setItem('highScores', JSON.stringify(topScores));
}

export function getHighScores(): HighScore[] {
  const scores = localStorage.getItem('highScores');
  return scores ? JSON.parse(scores) : [];
}