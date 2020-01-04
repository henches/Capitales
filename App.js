import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesDataFull'
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



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    global.G_SeriesLength = 10
    global.G_WrongAnswersNumber = 7
    global.G_SeriesQRList = []
    global.G_StatesList = StatesList
    global.G_InitialQuestionStatsList = []
    global.G_InitState = true // Horrible verrue pour déterminer si la fonction appellée dans Home Screen est appelé pour la première fois ... :-(
  }

  render() {
    getStoredQuestionStats()
    .then(myList => {
      G_InitialQuestionStatsList = myList
    })

    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    )
  }
}

