import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const listKeyQuestionStats = 'QuestionStats168'
const listKeyUserPrefs = 'UserPrefs52'

const defaultUserPrefs = {
  soundsActive: true,
  gameFinished: false
}

function initQuestionStats() {
    console.log("InitQuestionStats")
    myQueresStats = []
    for (let i = 0; i < G_StatesList.length; i++) {
        if (G_StatesList[i].niveau != -1)
          myQueresStats.push({ id: i.toString(), Queres: G_StatesList[i], level: 0, levelImage: null, rightResponsesNb: 0, wrongResponsesNb: 0, totalPoints: 0  })
    }
    return myQueresStats
}


export async function testStorage() {
  const dataTest = "DATATEST"
  try {
    await AsyncStorage.setItem(dataTest, "test")
    console.log("Ecriture ", dataTest)
    try {
      let s = await AsyncStorage.getItem(dataTest)
      if (s !== null) {
        console.log("la lecture fonctionne bien", s)
        return s
      }
      else {
        console.log("problème de lecture de la donnée test")
        return "errtest"
      }
    } catch (error) {
      Alert.alert(  
        "Problème de lecture des données", dataTest, [  {  text: 'OK', onPress: () => console.log('OK'),  style: 'OK',  } ]  )
    }
  }
  catch (error) {
    Alert.alert("Test écriture disque", dataTest, [  {  text: 'OK',  onPress: () => console.log('OK'),  style: 'OK' } ]  )
  }
}

export async function storeQuestionStats (questionsStatsList) {
  //    console.log("storeQuestionStats  1 questionsStatsList=", questionsStatsList)
  try {
    // console.log("storeQuestionStats 2, questionStatsList=", questionsStatsList)
    let strQuestionsStatsList = JSON.stringify(questionsStatsList)
    // console.log("storeQuestionStats 2, questionStatsList=", strQuestionsStatsList)
    await AsyncStorage.setItem(listKeyQuestionStats, strQuestionsStatsList)
    //await AsyncStorage.setItem('Table#1', 'table#1value');
    console.log("storeQuestionStats 3")
  } catch (error) {
    Alert.alert(  
      "Problème d'écriture des données",  
      "QuestionStatList",  
        [  
          {  
            text: 'OK',  
            onPress: () => console.log('OK'),  
            style: 'OK',  
          }
        ]  
        )
      }
}

export async function storeUserPrefs (userPrefs) {
  console.log("storeUserPrefs  userPrefs===============================================================================================", userPrefs)
  try {
      let strUserPrefs = JSON.stringify(userPrefs)
      // console.log("storeQuestionStats 2, questionStatsList=", strQuestionsStatsList)
      await AsyncStorage.setItem(listKeyUserPrefs, strUserPrefs)
      //await AsyncStorage.setItem('Table#1', 'table#1value');
      console.log("storeUserPrefs ")
  } catch (error) {
    // Error saving data
    Alert.alert(  
    "Problème d'écriture des données",  
    "QuestionStatList",  
      [  
        {  
          text: 'OK',  
          onPress: () => console.log('OK'),  
          style: 'OK',  
        }
      ]  
    )
  }
}
    
export async function getStoredQuestionStats () {
    try {
      //console.log("juste avant getStoredQuestionStatsItem")
      let strList = await AsyncStorage.getItem(listKeyQuestionStats)
      //console.log("juste après getStoredQuestionStatsItem strList= ", strList)
      if (strList !== null) {
        console.log("la key existe bien : Les QuestionsStats existent bien en base")
        return JSON.parse(strList)
      }
      else {
        console.log("la key n'existe pas, c'est la première fois que l'app est appelée, on initialise la liste des QuestionStats")
        return initQuestionStats()
      }
    } catch (error) {
      console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR error=', error)
      Alert.alert(  
        "Problème de lecture des données",  
        "QuestionStatList",  
          [  
            {  
              text: 'OK',  
              onPress: () => console.log('OK'),  
              style: 'OK',  
            }
          ]  
          )
    }
}

export async function getStoredUserPrefs() {
  try {
    console.log("getStoredUserPrefs")
    let strList = await AsyncStorage.getItem(listKeyUserPrefs)
    //console.log("juste après getStoredUserPrefs strList= ", strList)
    if (strList !== null) {
      //console.log("la key existe bien : Les UserPrefs existent bien en base")
      return JSON.parse(strList)
    }
    else {
      console.log("la key n'existe pas, on donne les valeurs des users prefs par défaut")
      return defaultUserPrefs
    }
  } catch (error) {
    console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR error=', error)
    Alert.alert(  
      "Problème d'écriture des données",  
      "UserPrefs",  
        [  
          {  
            text: 'OK',  
            onPress: () => console.log('OK'),  
            style: 'OK',  
          }
        ]  
      )
  }
}

