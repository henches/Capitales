import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import StatesList from './Helpers/statesData'


export default class App extends React.Component {

  constructor() {
    console.log('-------------------------------- DEBUT de lAPP  CONSTRUCTOR------------------------------------')
    super()
    global.G_SeriesLength = 2
    global.G_WrongAnswersNumber = 7
    global.G_SeriesQRList = []
    global.G_StatesList = StatesList

// Ce qui suit est merdique : cela devrait être dans le reducer InitiateQRSeriesReducer. MAis je ne suis pas parvenu à faire fonctionner les deux reducers en même temps
// Le problème était dans le persist. Quand j'ai oté le persist et suis revenu a un seul reducer cela fonctionnait
// Mais je n'ai pas essayé un double reducer sans persistance

    let seriesQRList = []
    let cloneStatesList = [...StatesList]
    for (var i = 0; i < G_SeriesLength; i++) {
        index = Math.floor(Math.random()*cloneStatesList.length);
        seriesQRList.push(cloneStatesList[index])
        cloneStatesList.splice(index,1)
    }
    G_SeriesQRList = seriesQRList;
    console.log("dans App : G_SeriesQRList = ", G_SeriesQRList)
// Merdique jusqu'ici donc

    // Tentons ...
    /*
    const action = { type: "INITIATE-SERIES", value: 0 }
    this.props.dispatch(action)
    */


    global.G_SerializeQRList= function G_SerializeQRList(aQRList) {
        s = ""
        for (var i = 0; i < aQRList.length; i++) {
            s = s + " " + aQRList[i].state;
        }
        return s
    }
  }


  render() {
    console.log('-------------------------------- RENDER APP ------------------------------------')
    return (
        <Provider store={Store}>
            <Navigation/>
        </Provider>
    )
  }
}


