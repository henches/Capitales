import { AsyncStorage } from 'react-native'


const listKey = 'QuestionStats75'

function initQuestionStats() {
    console.log("InitQuestionStats")
    myQueresStats = []
    for (let i = 0; i < G_StatesList.length; i++) {
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
        await AsyncStorage.setItem(listKey, strQuestionsStatsList)
        //await AsyncStorage.setItem('Table#1', 'table#1value');
        console.log("storeQuestionStats 3")
    } catch (error) {
      // Error saving data
    }
}

export async function getStoredQuestionStats () {
    try {
      // console.log("juste avant getStoredQuestionStatsItem")
      strList = await AsyncStorage.getItem(listKey)
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
