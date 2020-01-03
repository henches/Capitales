// Navigation/Navigation.js

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import HomeScreen from '../Components/HomeScreen'
import SeriesScreen from '../Components/SeriesScreen'
import SeriesResultsScreen from '../Components/SeriesResultsScreen'
import GlobalQuestionStatsScreen from '../Components/GlobalQuestionStatsScreen'

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
  GlobalQuestionStatsScreen: { 
    screen: GlobalQuestionStatsScreen,
    navigationOptions: {
      title: 'Stats générales'
    }
  }
})

export default createAppContainer(SearchStackNavigator)