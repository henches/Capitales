import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesDataFull'



export default class App extends React.Component {

  constructor() {
    console.log('*************************************************** DEBUT / APP  / constructor *************************************************************************************')
    super()
    global.G_SeriesLength = 10
    global.G_WrongAnswersNumber = 7
    global.G_SeriesQRList = []
    global.G_StatesList = StatesList
  }


  render() {
    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    )
  }
}


