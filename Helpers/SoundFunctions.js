import { Audio } from 'expo-av'

SoundSuccess = null

export async function initSounds() {
    SoundSuccess = new Audio.Sound();
    SoundFailure = new Audio.Sound();
    
    try {
        await SoundSuccess.loadAsync(require('../Sounds/success2.mp3'));
      } catch (error) {
        console.log("ERREUR dans l'initialisation du son Success")
      }

    try {
        await SoundFailure.loadAsync(require('../Sounds/failure.mp3'));
      } catch (error) {
        console.log("ERREUR dans l'initialisation du son Failure")
      }
  }


export async function playSound(success) {
    try {
      if (success)
        await SoundSuccess.replayAsync()
    else   
        await SoundFailure.replayAsync()
      // sound is playing!
    } catch (error) {
      console.log("ERREUR dans le play du son")
    }
    
}

