/*
import { AsyncStorage } from 'react-native'

storeQuestionStats = async (questionsStatsList) => {
    console.log("storeQuestionStats  1")
    try {
      console.log("storeQuestionStats 2")
 //     await AsyncStorage.setItem('QuestionStats', questionsStatsList);
    } catch (error) {
      // Error saving data
    }
}

initQuestionStats = () => {
    console.log("InitQuestionStats")
    myListOfQuestionStats = []
    for (let i = 0; i < G_StatesList.length; i++) {
        myListOfQuestionStats.push({ id : i.toString(), QR: G_StatesList[i], RightAnswersNb: i*2, WrongAnswersNb: (G_StatesList.length-i)*3 })
    }
    return myListOfQuestionStats
}

getStoredQuestionStats = async () => {
    try {
      console.log("juste avant getStoredQuestionStatsItem")
      list = await AsyncStorage.getItem('QuestionStats')
      console.log("juste après getStoredQuestionStatsItem list= ", list)
      if (list !== null) {
        console.log("la key existe bien : Les QuestionsStats existent bien en base")
        console.log('valeur de QuestionStats', list)
        return list
      }
      else {
        console.log("la key n'existe pas, c'est la première fois que l'app est appelée, on initialise la liste des QuestionStats")
        myList = initQuestionStats()
//        storeQuestionStats(questionsStatsList)
        return myList
      }
    } catch (error) {
      console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR error=', error)
    }
}
*/

const initialState = {
    QuestionStatsList: []
}

function HandleListOfQuestionStatsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'INIT-QUESTION-STATS' :   
            console.log("Reducer HandleListOfQuestionStatsReducer INIT-QUESTION-STATS")
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList
            }
            return nextState
        case 'UPDATE-QUESTION-STATS' :   
            console.log("Reducer HandleListOfQuestionStatsReducer UPDATE-QUESTION-STATS")
            list = state.QuestionStatsList.slice()
            console.log('list[2]', list[2])
            list[2].RightAnswersNb++
            nextState = {
                ...state,
                    QuestionStatsList: list
            }
            return nextState
        default:
            return state;
    }
}

export default HandleListOfQuestionStatsReducer