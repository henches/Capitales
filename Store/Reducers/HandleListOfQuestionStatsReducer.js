
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
        case 'UPDATE-QUESTION-STATS' :   
            console.log("Reducer HandleListOfQuestionStatsReducer UPDATE-QUESTION-STATS")
            questionStatsList = state.QuestionStatsList.slice()
            givenAnswersList = action.value
            for (let i=0; i < givenAnswersList.length; i++) {
                // console.log("givenAnswersList[", i, "]=", givenAnswersList[i])
                askedCapital = givenAnswersList[i].rightAnswer.capital
                isAnswerRight = givenAnswersList[i].isAnswerRight
                console.log("askedCapital = ", askedCapital, " isAnswerRight=", isAnswerRight)
                elt = questionStatsList.find(function(element) { 
                    return askedCapital.localeCompare(element.QueRes.capital) == 0
                  })
                if (isAnswerRight)
                    elt.RightAnswersNb++
                else 
                    elt.WrongAnswersNb++
                console.log("après incrément : elt to be updated = ", elt)
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