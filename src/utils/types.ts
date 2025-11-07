export type TestDuration = 15 | 30 | 60;

export type CharState = 'correct' | 'incorrect' | 'pending';

export interface Stats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
}
