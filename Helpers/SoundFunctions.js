import { Audio } from 'expo-av'


let SoundBigSuccess = 0
let SoundFailure = 0
let SoundSuccess2 = 0
let SoundPlayerLevelSuccess = 0

export async function initSounds() {
  SoundBigSuccess = new Audio.Sound()
  SoundFailure = new Audio.Sound()
  SoundSuccess2 = new Audio.Sound()
  SoundPlayerLevelSuccess = new Audio.Sound()
  
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
      await SoundSuccess2.loadAsync(require('../Sounds/success-bell.wav'));
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
    let sound = 0

    console.log("PLYA SOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    if (soundType == 0)
      sound = SoundSuccess2
    else if (soundType == 1)
      sound = SoundBigSuccess
    else if (soundType == 2)
      sound = SoundFailure
    else if (soundType == 3)
      sound = SoundPlayerLevelSuccess
    try {
        await sound.replayAsync()
    } catch (error) {
      console.log("ERREUR dans le play du son")
    }
    
}

