class SoundManager {
  private static sounds: { [key: string]: HTMLAudioElement } = {};

  static preload() {
    this.sounds = {
      correct: new Audio('/sounds/correct.mp3'),
      wrong: new Audio('/sounds/wrong.mp3'),
      tick: new Audio('/sounds/tick.mp3')
    };
  }

  static play(sound: keyof typeof SoundManager.sounds) {
    this.sounds[sound]?.play().catch(() => {});
  }
}

export default SoundManager;