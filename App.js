import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesListFromFile from './Helpers/statesData' // A changer pour avoir les vraies données
import { initSounds } from './Helpers/SoundFunctions'
import { Dimensions } from 'react-native';



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    const { width, height } = Dimensions.get('window');
    console.log("width, height : ", width, " ", height)
    super()
    let i0 = require('./Images/star1.png')
    let i1 = require('./Images/star2.png')
    let i2 = require('./Images/star3.png')
    let i3 = require('./Images/star4.png')
    let i4 = require('./Images/couronne.png')
    
    global.PlayerLevelStyle = [
      { text: "Débutant", backgroundColor: '#f2fce9', textColor: 'black'},
      { text: "Débutant+", backgroundColor: '#d7f6bc', textColor: 'black'},
      { text: "Débutant avancé", backgroundColor: '#c9f3a5', textColor: 'black'},
      { text: "Intermédiaire", backgroundColor: '#afed78', textColor: 'black'},
      { text: "Intérmédiaire+", backgroundColor: '#a1ea62', textColor: 'black'},
      { text: "Intermédiaire avancé", backgroundColor: '#86e335', textColor: 'black'},
      { text: "Expérimenté", backgroundColor: '#6dca1c', textColor: 'white'},
      { text: "Expérimenté+", backgroundColor: '#61b418', textColor: 'white'},
      { text: "Expérimenté avancé", backgroundColor: '#559d15', textColor: 'white'},
      { text: "Maitre", backgroundColor: '#228b22', textColor: 'white'},
      { text: "Dieu", backgroundColor: '#006400', textColor: 'white'},
      { backgroundColor: '#305a0c' },
      { backgroundColor: '#013220' }
  ]
  
    global.G_Config = {
      MaxPlayerLevelNumber: 11,
      SeriesLength: 10,
      Level: [
        {
          QrNb: 1,
          Points : 1,
          ProposedResponsesNb: 4,
          Image: i0,
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

