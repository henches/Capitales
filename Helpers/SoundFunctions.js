import { Audio } from 'expo-av'


SoundSuccess = new Audio.Sound();
SoundBigSuccess = new Audio.Sound();
SoundFailure = new Audio.Sound();

export async function initSounds() {
    
    try {
      await SoundSuccess.loadAsync(require('../Sounds/success2.mp3'));
    } catch (error) {
      console.log("ERREUR dans l'initialisation du son Success")
    }

    try {
      await SoundBigSuccess.loadAsync(require('../Sounds/bigsuccess.wav'));
    } catch (error) {
      console.log("ERREUR dans l'initialisation du son bigsuccess")
    }

    try {
        await SoundFailure.loadAsync(require('../Sounds/failure.mp3'));
      } catch (error) {
        console.log("ERREUR dans l'initialisation du son Failure")
      }
  }


export async function playSound(soundType) {
    try {
      if (soundType == 0)
        await SoundSuccess.replayAsync()
      else if (soundType == 1)
        await SoundBigSuccess.replayAsync()
      else if (soundType == 2)
        await SoundFailure.replayAsync()
      } catch (error) {
      console.log("ERREUR dans le play du son")
    }
    
}

