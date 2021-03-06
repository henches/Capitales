import { createStore, combineReducers } from 'redux'
import HandleQueresSeriesReducer from './Reducers/HandleQueresSeriesReducer'
import HandleQueresStatsReducer from './Reducers/HandleQueresStatsReducer'
import HandleUserPrefsReducer from './Reducers/HandleUserPrefsReducer'
import { persistCombineReducers } from 'redux-persist'


// je ne suis pas parvenu à faire fonctionner les deux reducers en même temps
// Le problème était dans le persist. Quand j'ai oté le persist et suis revenu a un seul reducer cela fonctionnait
// Mais je n'ai pas essayé un double reducer sans persistance

//import storage from 'redux-persist/lib/storage'
// import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

/*
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, { InitiateQueresSeriesReducerReducerReducer }))
*/


export default createStore(combineReducers({ HandleQueresStatsReducer, HandleQueresSeriesReducer, HandleUserPrefsReducer }))