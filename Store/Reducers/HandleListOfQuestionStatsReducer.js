
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
            list = state.QuestionStatsList.slice()
            console.log('list[2]', list[2])
            list[2].RightAnswersNb++
            nextState = {
                ...state,
                    QuestionStatsList: list
            }
            return nextState
        default:
            return state;
    }
}

export default HandleListOfQuestionStatsReducer