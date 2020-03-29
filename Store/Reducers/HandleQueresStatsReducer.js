
import { InitPointsManager, AddPointsForZone } from '../../Helpers/PointsManager'


const initialState = {
    pM: null, // PointsManager
    QuestionStatsList: []
}

function HandleQueresStatsReducer(state = initialState, action) {
    let nextState
    let myPM
    switch (action.type) {
        case 'QUERES_STATS-INITIATE' :   
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE")
            myPM = InitPointsManager(G_InitialQuestionStatsList)
            // console.log("Reducer HandleQueresStatsReducer myPM= ", myPM)
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList,
                    pM: InitPointsManager(G_InitialQuestionStatsList) 
            }
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE nextState = ", nextState )
            return nextState
        case 'QUERES_STATS-UPDATE' :   // value : queresSeries
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE")
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE value = ", action.value)
            let questionStatsList = state.QuestionStatsList.slice()
            myPM = state.pM
            const queresSeries = action.value
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
                AddPointsForZone(myPM, 0, queres.pointsWon)
            }
            nextState = {
                ...state,
                    QuestionStatsList: questionStatsList,
                    pM: myPM,
                    titi: 30,
                    toto: 40
            } 
            return nextState
        default:
            return state;
    }
}

export default HandleQueresStatsReducer