import { Audio } from 'expo-av'


SoundBigSuccess = new Audio.Sound()
SoundFailure = new Audio.Sound()
SoundSuccess = new Audio.Sound()
SoundPlayerLevelSuccess = new Audio.Sound()

export async function initSounds() {
    
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

    try {
      await SoundSuccess.loadAsync(require('../Sounds/success2.mp3'));
    } catch (error) {
      console.log("ERREUR dans l'initialisation du son Success")
    }

    try {
      await SoundPlayerLevelSuccess.loadAsync(require('../Sounds/success-fanfare-trumpets.mp3'));
    } catch (error) {
      console.log("ERREUR dans l'initialisation du son success-fanfare-trumpets")
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
      else if (soundType == 3)
        await SoundPlayerLevelSuccess.replayAsync()
      } catch (error) {
      console.log("ERREUR dans le play du son")
    }
    
}

