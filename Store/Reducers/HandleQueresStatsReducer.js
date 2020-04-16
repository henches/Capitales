import { storeQuestionStats } from '../../Helpers/StorageFunctions'
import { GetPlayerLevel, InitPointsManager, AddPointsForZone, GetIntegerZoneFromStringZone, SetOldPointsForZone } from '../../Helpers/PointsManager'


const initialState = {
    pM: null, // PointsManager
    QuestionStatsList: [],
    PlayerLevel: 0
}

function HandleQueresStatsReducer(state = initialState, action) {
    let nextState = null
    let myPM = null
    let myPlayerLevel = null
    switch (action.type) {
        case 'QUERES_STATS-INITIATE' :   
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE")
            myPM = InitPointsManager(G_InitialQuestionStatsList)
            myPlayerLevel = GetPlayerLevel(myPM)
            // console.log("Reducer HandleQueresStatsReducer myPM= ", myPM)
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList,
                    pM: myPM,
                    PlayerLevel: myPlayerLevel
            }
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE nextState = ", nextState )
            return nextState
        case 'QUERES_STATS-UPDATE' :   // value : queresSeries
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE")
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE value = ", action.value)
            let questionStatsList = state.QuestionStatsList.slice()
            myPM = state.pM.slice()
            const queresSeries = action.value
            let tempoLevel = 0
            SetOldPointsForZone(myPM, tempoLevel) // recopie les points dans OldPoints avant d'incrémenter les points (permettra l'animation)
            for (let i=0; i < queresSeries.length; i++) {
                const queres = queresSeries[i]
                // console.log("queresSeries[", i, "]=", queresSeries[i])
                let askedCapital = queres.capital
                let isResponseRight = queres.isResponseRight
                console.log("askedCapital = ", askedCapital, " isResponseRight=", isResponseRight)
                let elt = questionStatsList.find(function(element) { // Trouve l'élément correspondant dans la QueresStatList
                    return askedCapital.localeCompare(element.Queres.capital) == 0
                  })
                elt.level = queres.afterResponseLevel
                elt.totalPoints = queres.afterResponseTotalPoints
                elt.rightResponsesNb = queres.afterResponseRightResponsesNb
                elt.wrongResponsesNb = queres.afterResponseWrongResponsesNb
                const integerZone = GetIntegerZoneFromStringZone(queres.continent)
                AddPointsForZone(myPM, integerZone, queres.pointsWon, tempoLevel)
                AddPointsForZone(myPM, G_Monde, queres.pointsWon, tempoLevel)
                myPlayerLevel = GetPlayerLevel(myPM)
            }
            storeQuestionStats(questionStatsList) // on sauvegarde cette liste sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de la liste')
            })

            nextState = {
                ...state,
                    QuestionStatsList: questionStatsList,
                    pM: myPM,
                    PlayerLevel: myPlayerLevel
            } 
            return nextState
        case 'QUERES_STATS-DISPLAYED' :   // value : null
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-DISPLAYED")
            tempoLevel = 0
            myPM = state.pM.slice()
            SetOldPointsForZone(myPM, tempoLevel) // recopie les points dans OldPoints (l'animation est finie)
  

            nextState = {
                ...state,
                    pM: myPM
            } 
            return nextState
        default:
            return state;
    }
}

export default HandleQueresStatsReducer