// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import HomeScreen from '../Components/HomeScreen'
import SeriesScreen from '../Components/SeriesScreen'
import SeriesResultsScreen from '../Components/SeriesResultsScreen'
import GeneralStatisticsScreen from '../Components/GeneralStatisticsScreen'

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
      title: 'Results'
    }
  },
  GeneralStatisticsScreen: { 
    screen: GeneralStatisticsScreen,
    navigationOptions: {
      title: 'Stats du joueur'
    }
  }
})

export default createAppContainer(SearchStackNavigator)