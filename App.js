import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesDataTest' // A changer pour avoir les vraies données
import { getStoredQuestionStats } from './Helpers/StorageFunctions'



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    global.G_SeriesLength = 2
    global.G_WrongAnswersNumber = 7
    global.G_SeriesQRList = []
    global.G_StatesList = StatesList
    global.G_InitialQuestionStatsList = []
    global.G_InitState = true // Horrible verrue pour déterminer si la fonction appellée dans Home Screen est appelé pour la première fois ... :-(
  }

  render() {
    getStoredQuestionStats()  // Récupère la liste des Questions Stats
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

