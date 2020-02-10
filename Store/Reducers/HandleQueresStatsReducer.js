
import { G_GetLevelFromRightResponsesNb } from '../../Helpers/GlobalFunctions'

const initialState = {
    QuestionStatsList: []
}

function HandleQueresStatsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'QUERES_STATS-INITIATE' :   
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE")
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList
            }
            return nextState
        case 'QUERES_STATS-UPDATE' :   // value : queresSeries
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE")
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE value = ", action.value)
            questionStatsList = state.QuestionStatsList.slice()
            const queresSeries = action.value
            for (let i=0; i < queresSeries.length; i++) {
                const queres = queresSeries[i]
                // console.log("queresSeries[", i, "]=", queresSeries[i])
                askedCapital = queres.capital
                isResponseRight = queres.isResponseRight
                console.log("askedCapital = ", askedCapital, " isResponseRight=", isResponseRight)
                elt = questionStatsList.find(function(element) { // Trouve l'élément correspondand dans la QueresStatList
                    return askedCapital.localeCompare(element.Queres.capital) == 0
                  })
                elt.level = queres.afterResponseLevel
                elt.totalPoints = queres.afterResponseTotalPoints
                elt.rightResponsesNb = queres.afterResponseRightResponsesNb
                elt.wrongResponsesNb = queres.afterResponseWrongResponsesNb
            }
            nextState = {
                ...state,
                    QuestionStatsList: questionStatsList
            } 

            return nextState
        default:
            return state;
    }
}

export default HandleQueresStatsReducer