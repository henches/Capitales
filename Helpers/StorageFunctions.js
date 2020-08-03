import { AsyncStorage } from 'react-native'


Aconst listKeyQuestionStats = 'QuestionStats112'
const listKeyUserPrefs = 'UserPrefs9'

const defaultUserPrefs = {
  soundsActive: true,
  gameFinished: false
}

function initQuestionStats() {
    console.log("InitQuestionStats")
    myQueresStats = []
    const img = 0
    for (let i = 0; i < G_StatesList.length; i++) {
        if (G_StatesList[i].niveau != -1)
          myQueresStats.push({ id: i.toString(), Queres: G_StatesList[i], level: 0, levelImage: null, rightResponsesNb: 0, wrongResponsesNb: 0, totalPoints: 0  })
    }
    return myQueresStats
}

export async function storeQuestionStats (questionsStatsList) {
  //    console.log("storeQuestionStats  1 questionsStatsList=", questionsStatsList)
      try {
          // console.log("storeQuestionStats 2, questionStatsList=", questionsStatsList)
          strQuestionsStatsList = JSON.stringify(questionsStatsList)
  //        console.log("storeQuestionStats 2, questionStatsList=", strQuestionsStatsList)
          await AsyncStorage.setItem(listKeyQuestionStats, strQuestionsStatsList)
          //await AsyncStorage.setItem('Table#1', 'table#1value');
          console.log("storeQuestionStats 3")
      } catch (error) {
        // Error saving data
      }
}
  
export async function storeUserPrefs (userPrefs) {
        console.log("storeUserPrefs  userPrefs===============================================================================================", userPrefs)
        try {
            strUserPrefs = JSON.stringify(userPrefs)
    //        console.log("storeQuestionStats 2, questionStatsList=", strQuestionsStatsList)
            await AsyncStorage.setItem(listKeyUserPrefs, strUserPrefs)
            //await AsyncStorage.setItem('Table#1', 'table#1value');
            console.log("storeUserPrefs ")
        } catch (error) {
          // Error saving data
        }
}
    
export async function getStoredQuestionStats () {
    try {
      // console.log("juste avant getStoredQuestionStatsItem")
      strList = await AsyncStorage.getItem(listKeyQuestionStats)
      // console.log("juste après getStoredQuestionStatsItem strList= ", strList)
      if (strList !== null) {
        list = JSON.parse(strList)
        console.log("la key existe bien : Les QuestionsStats existent bien en base")
        return list
      }
      else {
        console.log("la key n'existe pas, c'est la première fois que l'app est appelée, on initialise la liste des QuestionStats")
        myList = initQuestionStats()
        return myList
      }
    } catch (error) {
      console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR error=', error)
    }
}

export async function getStoredUserPrefs() {
  let myUserPrefs
  try {
    // console.log("getStoredUserPrefs")
    strList = await AsyncStorage.getItem(listKeyUserPrefs)
    // console.log("juste après getStoredQuestionStatsItem strList= ", strList)
    if (strList !== null) {
      myUserPrefs = JSON.parse(strList)
      console.log("la key existe bien : Les UserPrefs existent bien en base")
      return myUserPrefs
    }
    else {
      console.log("la key n'existe pas, on donne les valeurs des users prefs par défaut")
      return defaultUserPrefs
    }
  } catch (error) {
    console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR error=', error)
  }
}

