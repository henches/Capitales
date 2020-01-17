import { G_SerializeGivenAnswerList } from '../../Helpers/GlobalFunctions'

const initialState = {
    GivenPossibleResponsesList: []
}

function HandleAnswersListReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
       case 'RAZ-GIVEN-ANSWERS-LIST' :   
            console.log("Reducer HandleAnswersListReducer RAZ-GIven-AnswerList")
            nextState = {
                ...state,
                        GivenAnswersList: []
            }
            return nextState

        case 'ADD-ANSWERED-QUESTION' :   
            const myGivenAnswersList = state.GivenAnswersList;
            const eltGivenAnswersList = { id: myGivenAnswersList.length.toString(), isAnswerRight: action.value.isAnswerRight, rightAnswer: action.value.rightAnswer, givenAnswer: action.value.givenAnswer }
            myGivenAnswersList.push(eltGivenAnswersList)
            nextState = {
                ...state,
                        GivenAnswersList: myGivenAnswersList
            }
            console.log("Reducer HandleAnswersListReducer myGivenAnswersList apres push = ", G_SerializeGivenAnswerList(myGivenAnswersList))
            return nextState
        default:
            return state;
    }
}

export default HandleAnswersListReducer