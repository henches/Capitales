import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesData' // A changer pour avoir les vraies données



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    i0 = require('./Images/StarLevel-0.png')
    i1 = require('./Images/StarLevel-1.png')
    i2 = require('./Images/StarLevel-2.png')
    i3 = require('./Images/StarLevel-3.png')
    i4 = require('./Images/StarLevel-4.png')
    
    global.G_Config = {
        SeriesLength: 2,
        Level0 : {
          QrNb: 2,
          ProposedResponsesNb: 4,
          Image: i0
        },
        Level1 : {
          QrNb: 2,
          ProposedResponsesNb: 8,
          Image: i1
        },
        Level2 : {
          QrNb: 2,
          ProposedResponsesNb: 8,
          Image: i2
        },
        Level3 : {
          QrNb: 2,
          Image: i3
        },
        Level4 : {
          Image: i4
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

