import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesData' // A changer pour avoir les vraies données
import { initSounds } from './Helpers/SoundFunctions'
import { G_InitPoints } from './Helpers/GlobalFunctions'



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
      Level: [
        {
          QrNb: 2,
          Points : 1,
          ProposedResponsesNb: 4,
          Image: i0
        },
        {
          QrNb: 2,
          Points: 2,
          ProposedResponsesNb: 8,
          Image: i1
        },
        {
          QrNb: 2,
          Points: 3,
          ProposedResponsesNb: 8,
          Image: i2
        },
        {
          QrNb: 2,
          Points: 5,
          Image: i3
        },
        {
          Points: 0,
          Image: i4
        }
      ]
    }

    // Variables globales
    global.G_StatesList = StatesList   // récupère la liste des capitales originelle (celle trouvée sur internet, améliorée avec des images)
    global.G_InitialQuestionStatsList = []
    global.G_InitState = true // Horrible verrue pour déterminer si la fonction appellée dans Home Screen est appelé pour la première fois ... :-(
    global.G_TotalPoints = 0

    global.G_Points = []
    G_InitPoints()
    global.G_MaxPoints = G_Points[G_Points.length-1]*G_StatesList.length

    initSounds()
  }


  render() {

    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    )
  }
}

