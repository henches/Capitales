import { storeQuestionStats } from '../../Helpers/StorageFunctions'
import { InitPointsManager, AddPointsForZone, SetPointsProgressDisplayed, GetIntegerZoneFromStringZone, SetOldPointsForZone } from '../../Helpers/PointsManager'


const initialState = {
    pM: null, // PointsManager
    QuestionStatsList: []
}

function HandleQueresStatsReducer(state = initialState, action) {
    let nextState = null
    let myPM = null
    switch (action.type) {
        case 'QUERES_STATS-INITIATE' :   
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE")
            myPM = InitPointsManager(G_InitialQuestionStatsList)
            // console.log("Reducer HandleQueresStatsReducer myPM= ", myPM)
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList,
                    pM: myPM
            }
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE nextState = ", nextState )
            return nextState
        case 'QUERES_STATS-UPDATE' :   // value : queresSeries
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE")
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE value = ", action.value)
            let questionStatsList = state.QuestionStatsList.slice()
            myPM = state.pM
            const queresSeries = action.value
            SetOldPointsForZone(myPM) // recopie les points dans OldPoints avant d'incrémenter les points (permettra l'animation)
            for (let i=0; i < queresSeries.length; i++) {
                const queres = queresSeries[i]
                // console.log("queresSeries[", i, "]=", queresSeries[i])
                let askedCapital = queres.capital
                let isResponseRight = queres.isResponseRight
                console.log("askedCapital = ", askedCapital, " isResponseRight=", isResponseRight)
                let elt = questionStatsList.find(function(element) { // Trouve l'élément correspondand dans la QueresStatList
                    return askedCapital.localeCompare(element.Queres.capital) == 0
                  })
                elt.level = queres.afterResponseLevel
                elt.totalPoints = queres.afterResponseTotalPoints
                elt.rightResponsesNb = queres.afterResponseRightResponsesNb
                elt.wrongResponsesNb = queres.afterResponseWrongResponsesNb
                const integerZone = GetIntegerZoneFromStringZone(myPM, queres.continent)
                AddPointsForZone(myPM, integerZone, queres.pointsWon)
                AddPointsForZone(myPM, G_Monde, queres.pointsWon)
            }
            SetPointsProgressDisplayed(myPM, false)

            storeQuestionStats(questionStatsList) // on sauvegarde cette liste sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de la liste')
            })

            nextState = {
                ...state,
                    QuestionStatsList: questionStatsList,
                    pM: myPM
            } 
            return nextState
        case 'QUERES_STATS-DISPLAYED' :   // value : null
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-DISPLAYED")
            myPM = state.pM
            SetPointsProgressDisplayed(myPM, true)
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