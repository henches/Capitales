import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesListFromFile from './Helpers/statesData' // A changer pour avoir les vraies données
import { initSounds } from './Helpers/SoundFunctions'



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    let i1 = require('./Images/ImageLevel1.png')
    let i2 = require('./Images/ImageLevel2.png')
    let i3 = require('./Images/ImageLevel3.png')
    let i4 = require('./Images/ImageLevel4.png')
    
    global.PlayerLevelStyle = [
      { text: "Débutant", backgroundColor: 'lightGrey', textColor: 'black'},
      { text: "Débutant+", backgroundColor: 'darkgrey', textColor: 'black'},
      { text: "Débutant avancé", backgroundColor: 'lemonchiffon', textColor: 'black'},
      { text: "Intermédiaire", backgroundColor: 'yellow', textColor: 'black'},
      { text: "Intérmédiaire+", backgroundColor: 'gold', textColor: 'black'},
      { text: "Intermédiaire avancé", backgroundColor: 'greenyellow', textColor: 'black'},
      { text: "Expérimenté", backgroundColor: 'yellowgreen', textColor: 'white'},
      { text: "Expérimenté+", backgroundColor: 'darkolivegreen', textColor: 'white'},
      { text: "Expérimenté avancé", backgroundColor: 'red', textColor: 'white'},
      { text: "Maitre", backgroundColor: 'brown', textColor: 'white'},
      { text: "Dieu", backgroundColor: 'black', textColor: 'white'}
  ]
  
    global.G_Config = {
      MaxPlayerLevelNumber: 11,
      SeriesLength: 3,
      Level: [
        {
          QrNb: 1,
          Points : 1,
          ProposedResponsesNb: 4,
        },
        {
          QrNb: 1,
          Points: 1,
          ProposedResponsesNb: 8,
          Image: i1,
        },
        {
          QrNb: 1,
          Points: 1,
          ProposedResponsesNb: 8,
          Image: i2,
        },
        {
          QrNb: 1,
          Points: 1,
          Image: i3,
        },
        {
          Points: 0,
          Image: i4,
        }
      ]
    }


    // Variables globales
    global.G_StatesList = StatesListFromFile   // récupère la liste des capitales originelle (celle trouvée sur internet, améliorée avec des images)
    global.G_InitialQuestionStatsList = []  // Va contenir la liste initiale : soit G_StatesListe, soit celle récupérée sur le disque
    global.G_InitState = true // Horrible verrue pour déterminer si la fonction appellée dans Home Screen est appelé pour la première fois ... :-(

    
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

