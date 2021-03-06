import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesListFromFile from './Helpers/statesData' // A changer pour avoir les vraies données
import { initSounds } from './Helpers/SoundFunctions'
import { Dimensions, View, ActivityIndicator, StatusBar } from 'react-native'
import * as Font from 'expo-font'



export default class App extends React.Component {

  state = {
    fontsLoaded: false
  }


  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()

    global.G_ScreenWidth = Dimensions.get('window').width  // SERVIRA A UNE ENORME VERRUE : parce que je n'ai pas réussi a trouver la largeur de la fenetre de ProgressSymbol
    console.log("G_ScreenWidth = ", G_ScreenWidth)

    let i0 = 1
    let i1 = 1
    let i2 = 1
    let i3 = 1
    let i4 = 1
    
    global.PlayerLevelStyle = [
      { text: "0 - Débutant", backgroundColor: '#f2fce9', textColor: 'black'},
      { text: "1 - Débutant+", backgroundColor: '#d7f6bc', textColor: 'black'},
      { text: "2 - Débutant avancé", backgroundColor: '#c9f3a5', textColor: 'black'},
      { text: "3 - Intermédiaire", backgroundColor: '#afed78', textColor: 'black'},
      { text: "4 - Intermédiaire+", backgroundColor: '#a1ea62', textColor: 'black'},
      { text: "5 - Intermédiaire avancé", backgroundColor: '#86e335', textColor: 'black'},
      { text: "6 - Expérimenté", backgroundColor: '#6dca1c', textColor: 'white'},
      { text: "7 - Expérimenté+", backgroundColor: '#61b418', textColor: 'white'},
      { text: "8 - Expérimenté avancé", backgroundColor: '#559d15', textColor: 'white'},
      { text: "9 - Maître", backgroundColor: '#228b22', textColor: 'white'},
      { text: "10 - Grand Maître", backgroundColor: '#006400', textColor: 'white'},
      { text: "SEIGNEUR des CAPITALES", backgroundColor: 'black', textColor: 'white'},
      { backgroundColor: '#305a0c' },
      { backgroundColor: '#013220' }
    ]
  
    global.G_Config = {
      MaxPlayerLevelNumber: 12,
      SeriesLength: 6,
      Level: [
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
    global.G_AppIcon = require('./assets/capitale-icon.png'),

    initSounds()
  }

  async componentDidMount() {
    await Font.loadAsync({
        //font1 can be any name. This'll be used in font-family
        'fontFunhouse': require('./assets/fonts/Funhouse-Regular.ttf'),                         
        'CapitalesFont_Light': require('./assets/fonts/ComicSansMS_Regular.ttf'),                         
        'CapitalesFont_Medium': require('./assets/fonts/ComicSansMS_Bold.ttf'),                         
    })
    this.setState({ fontsLoaded: true })
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
          <Provider store={Store}>
              <Navigation/>
          </Provider>
      )
    }
    else 
      return (
        <View >
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
      )
  }
}

