import { G_SerializeQueresList } from '../../Helpers/GlobalFunctions'

const initialState = {
    QuestionsCounter: 0
}

function HandleNextQuestionReducer(state = initialState, action) {
    let nextState
    let myQuestionsCounter = action.value
    StatesList = global.G_StatesList;
//    console.log("dans Reducer HandleNextQuestionReducer action = ", action, " Value = ", myQuestionsCounter)
    switch (action.type) {
        case 'RAZ-SERIES' :   
            console.log("Reducer HandleNextQuestionReducer / RAZ-SERIES")
            nextState = {
                ...state,
                        QuestionsCounter: 0
            }
            return nextState
        default:
            return state;
    }
}

export default HandleNextQuestionReducer