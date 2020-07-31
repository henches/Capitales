// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import HomeScreen from '../Components/HomeScreen'
import SeriesScreen from '../Components/SeriesScreen'
import SeriesResultsScreen from '../Components/SeriesResultsScreen'
import GlobalQuestionStatsScreen from '../Components/GlobalQuestionStatsScreen'
// import LevelScreen from '../Components/LevelScreen'
import ConfigScreen from '../Components/ConfigScreen'

const SearchStackNavigator = createStackNavigator({
  HomeScreen: { 
    screen: HomeScreen,
    navigationOptions: {
      title: 'Accueil'
    }
  },
  SeriesScreen: { 
    screen: SeriesScreen,
    navigationOptions: {
      title: 'SeriesScreen'
    }
  },
  SeriesResultsScreen: { 
    screen: SeriesResultsScreen,
    navigationOptions: {
      title: 'Resultats'
    }
  },
  GlobalQuestionStatsScreen: { 
    screen: GlobalQuestionStatsScreen,
    navigationOptions: {
      title: 'Statistiques'
    }
  },
  ConfigScreen: { 
    screen: ConfigScreen,
    navigationOptions: {
      title: 'Paramètres'
    }
  }
},
{
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
})




export default createAppContainer(SearchStackNavigator)