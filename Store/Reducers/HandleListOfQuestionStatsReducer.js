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
      questionsStatsList = await AsyncStorage.getItem('QuestionStats')
      console.log("juste aprrès getStoredQuestionStatsItem questionsStatsList= ", questionsStatsList)
      if (questionsStatsList !== null) {
        console.log("la key existe bien : Les QuestionsStats existent bien en base")
        console.log('valeur de QuestionStats', questionsStatList)
      }
      else {
        console.log("la key n'existe pas, c'est la première fois que l'app est appelée, on initialise la liste des QuestionStats")
        questionsStatsList = initQuestionStats()
        storeQuestionStats(questionsStatsList)
      }
    } catch (error) {
      console.log('ERREUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUR')
      console.log(error)
    }
    return questionsStatsList
}
 
const initialState = {
    ListOfQuestionStats: []
}

function HandleListOfQuestionStatsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
       case 'TEST' :   
            console.log("Reducer HandleListOfQuestionStatsReducer TEST")
 //           const myListOfQuestionStats = getStoredQuestionStats()
            getStoredQuestionStats()
                .then(data) {
                    console.log("Data", data)
                }
                .catch(error) {
                    console.log("error", error)
                }
            console.log("Reducer HandleListOfQuestionStatsReducer TEST myListOfQuestionStats=", myListOfQuestionStats)
            nextState = {
                ...state,
                        ListOfQuestionStats: myListOfQuestionStats
            }
            return nextState

        default:
            return state;
    }
}

export default HandleListOfQuestionStatsReducer