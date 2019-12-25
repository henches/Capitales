
const initialState = {
    GivenAnswersList: []
}

function HandleAnswersList(state = initialState, action) {
    let nextState
    console.log("dans Reducer HandleAnswersList action = ", action)
    console.log("dans Reducer HandleAnswersList state = ", state)
    switch (action.type) {
       case 'ADD-ANSWERED-QUESTION' :   
            const myGivenAnswersList = state.GivenAnswersList;
            const eltGivenAnswersList = { id: myGivenAnswersList.length.toString(), isAnswerRight: action.value.isAnswerRight, rightAnswer: action.value.rightAnswer, givenAnswer: action.value.givenAnswer }
            console.log("*****************************************************************dans Reducer HandleAnswersList")
            console.log("dans Reducer HandleAnswersList myGivenAnswersList  avant push = ", myGivenAnswersList)
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