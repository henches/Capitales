
const initialState = {
    QuestionStatsList: []
}

function HandleListOfQuestionStatsReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'INIT-QUESTION-STATS' :   
            console.log("Reducer HandleListOfQuestionStatsReducer INIT-QUESTION-STATS")
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList
            }
            return nextState
        case 'UPDATE-QUESTION-STATS' :   // value : givenResponseList
            console.log("Reducer HandleListOfQuestionStatsReducer UPDATE-QUESTION-STATS")
//            console.log("Reducer HandleListOfQuestionStatsReducer UPDATE-QUESTION-STATS value = ", action.value)
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
                if (isResponseRight)
                    elt.RightResponsesNb++
                else 
                    elt.WrongResponsesNb++
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

export default HandleListOfQuestionStatsReducer