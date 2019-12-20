
const initialState = {
    GivenAnswersList: []
}

function HandleAnswersList(state = initialState, action) {
    let nextState
    console.log("dans Reducer HandleAnswersList action = ", action)
    console.log("dans Reducer HandleAnswersList state = ", state)
    switch (action.type) {
       case 'ADD-ANSWERED-QUESTION' :   
            const eltGivenAnswersList = {rightAnswer: action.value.rightAnswer, givenAnwser: action.value.givenAnswer}
            console.log("dans Reducer HandleAnswersList myGivenAnswersList  avant push = ", myGivenAnswersList)
            const myGivenAnswersList = state.GivenAnswersList;
            myGivenAnswersList.push(eltGivenAnswersList)
            console.log("dans Reducer HandleAnswersList myGivenAnswersList apres push = ", myGivenAnswersList)
            nextState = {
                ...state,
                        GivenAnswersList: myGivenAnswersList
            }
            console.log("Dans Reducer HandleAnswersList  Nextstate = ", nextState)
            return nextState
        default:
            return state;
    }
}

export default HandleAnswersList