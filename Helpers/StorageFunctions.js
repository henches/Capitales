import { AsyncStorage } from 'react-native'

function initQuestionStats() {
    console.log("InitQuestionStats")
    myListOfQuestionStats = []
    for (let i = 0; i < G_StatesList.length; i++) {
        myListOfQuestionStats.push({ id : i.toString(), QR: G_StatesList[i], RightAnswersNb: i*2, WrongAnswersNb: (G_StatesList.length-i)*3 })
    }
    return myListOfQuestionStats
}

export async function storeQuestionStats (questionsStatsList) {
    console.log("storeQuestionStats  1")
    try {
        // console.log("storeQuestionStats 2, questionStatsList=", questionsStatsList)
        strQuestionsStatsList = JSON.stringify(questionsStatsList)
        console.log("storeQuestionStats 2, questionStatsList=", strQuestionsStatsList)
        await AsyncStorage.setItem('QuestionStats', strQuestionsStatsList)
        //await AsyncStorage.setItem('Table#1', 'table#1value');
        console.log("storeQuestionStats 3")
    } catch (error) {
      // Error saving data
    }
}

export async function getStoredQuestionStats () {
    try {
      console.log("juste avant getStoredQuestionStatsItem")
      strList = await AsyncStorage.getItem('QuestionStats')
      console.log("juste après getStoredQuestionStatsItem strList= ", strList)
      if (strList !== null) {
        list = JSON.parse(strList)
        console.log("la key existe bien : Les QuestionsStats existent bien en base")
        // console.log('valeur de QuestionStats list =', list)
        return list
      }
      else {
        console.log("la key n'existe pas, c'est la première fois que l'app est appelée, on initialise la liste des QuestionStats")
        myList = initQuestionStats()
//        storeQuestionStats(JSON.stringify(questionsStatsList))
        return myList
      }
    } catch (error) {
      console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR error=', error)
    }
}
