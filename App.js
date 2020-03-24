import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesListFromFile from './Helpers/statesData' // A changer pour avoir les vraies données
import { initSounds } from './Helpers/SoundFunctions'
import { G_InitPoints } from './Helpers/GlobalFunctions'



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    let i0 = require('./Images/StarLevel-0.png')
    let i1 = require('./Images/ImageLevel-1-atteint.png')
    let nri1 = require('./Images/ImageLevel-1-non-atteint.png')
    let i2 = require('./Images/ImageLevel-2-atteint.png')
    let nri2 = require('./Images/ImageLevel-2-non-atteint.png')
    let i3 = require('./Images/ImageLevel-3-atteint.png')
    let nri3 = require('./Images/ImageLevel-3-non-atteint.png')
    let i4 = require('./Images/ImageLevel-4-atteint.png')
    let nri4 = require('./Images/ImageLevel-4-non-atteint.png')
    
    global.G_Config = {
      SeriesLength: 6,
      Level: [
        {
          QrNb: 2,
          Points : 1,
          ProposedResponsesNb: 4,
          Image: i0
        },
        {
          QrNb: 2,
          Points: 1,
          ProposedResponsesNb: 8,
          Image: i1,
          NotReachedImage:nri1
        },
        {
          QrNb: 2,
          Points: 1,
          ProposedResponsesNb: 8,
          Image: i2,
          NotReachedImage:nri2
        },
        {
          QrNb: 2,
          Points: 1,
          Image: i3,
          NotReachedImage:nri3
        },
        {
          Points: 0,
          Image: i4,
          NotReachedImage:nri4
        }
      ]
    }


    // Variables globales
    global.G_StatesList = StatesListFromFile   // récupère la liste des capitales originelle (celle trouvée sur internet, améliorée avec des images)
    global.G_InitialQuestionStatsList = []  // Va contenir la liste initiale : soit G_StatesListe, soit celle récupérée sur le disque
    global.G_InitState = true // Horrible verrue pour déterminer si la fonction appellée dans Home Screen est appelé pour la première fois ... :-(
    global.G_TotalPoints = 0

    global.G_Zones = ['Monde', 'Europe', 'Afrique', 'AsiePacif', 'Ameriques' ]

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

