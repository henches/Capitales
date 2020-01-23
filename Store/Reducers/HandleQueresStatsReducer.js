
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
        case 'QUERES_STATS-UPDATE' :   // value : givenResponseList
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE")
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE value = ", action.value)
            questionStatsList = state.QuestionStatsList.slice()
            givenResponsesList = action.value
            for (let i=0; i < givenResponsesList.length; i++) {
                // console.log("givenResponsesList[", i, "]=", givenResponsesList[i])
                askedCapital = givenResponsesList[i].capital
                isResponseRight = givenResponsesList[i].isResponseRight
                console.log("askedCapital = ", askedCapital, " isResponseRight=", isResponseRight)
                elt = questionStatsList.find(function(element) { 
                    return askedCapital.localeCompare(element.Queres.capital) == 0
                  })
                if (isResponseRight) {
                    elt.rightResponsesNb++
                    r = G_GetLevelFromRightResponsesNb(elt.rightResponsesNb)
                    elt.level = r.level
                }
                else 
                    elt.wrongResponsesNb++
//                console.log("après incrément : elt to be updated = ", elt)
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