import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesData' // A changer pour avoir les vraies données



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    global.G_Config = {
        SeriesLength: 2,
          Level0 : {
          QrNb: 2,
          ProposedResponsesNb: 4,
        },
        Level1 : {
          QrNb: 2,
          ProposedResponsesNb: 8,
        },
        Level2 : {
          QrNb: 2,
          ProposedResponsesNb: 8,
        },
        Level3 : {
          QrNb: 2,
        }
    }

    // Variables globales
    global.G_StatesList = StatesList   // récupère la liste des capitales originelle (celle trouvée sur internet, améliorée avec des images)
    global.G_InitialQuestionStatsList = []
    global.G_InitState = true // Horrible verrue pour déterminer si la fonction appellée dans Home Screen est appelé pour la première fois ... :-(
  }

  render() {

    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    )
  }
}

