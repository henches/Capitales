//import StatesList from '../../Helpers/statesData'

const initialState = {
    AnswersList: [],
    RightAnswer: {},
    QuestionsCounter: 0
}

function InitiateNextQuestion(state = initialState, action) {
    let nextState
    let myQuestionsCounter = action.value
    StatesList = global.G_StatesList;
//    console.log("dans Reducer InitiateNextQuestion action = ", action, " Value = ", myQuestionsCounter)
    switch (action.type) {
       case 'INITIATE-NEXT-QUESTION' :   
            let myAnswersList = [];
            let myRightAnswer = G_SeriesQRList[myQuestionsCounter]
            cloneStatesList = [...StatesList];
            cloneStatesList.splice(cloneStatesList.indexOf(myRightAnswer),1); // on enlève la bonne question-réponse de la liste clone des questions-reponses
            for (var i = 0; i < G_WrongAnswersNumber; i++) {
                index = Math.floor(Math.random()*cloneStatesList.length); // on choisit une question-réponse au hasard dans la liste des questions répon
                myAnswersList.push(cloneStatesList[index]) // on ajoute la QR dans la liste des réponses qu'on va proposer
                cloneStatesList.splice(index,1) // on supprime la QR de la liste clone
            }
            index = Math.floor(Math.random()*myAnswersList.length) // on choisit l'endroit de la liste où l'on va insérer la bonne réponse
            myAnswersList.splice(index, 0, myRightAnswer) //on insère la bonne réponse dans la liste

            nextState = {
                ...state,
                        AnswersList: myAnswersList,
                        RightAnswer: myRightAnswer,
                        QuestionsCounter: myQuestionsCounter
            }
//            console.log("Dans Reducer Initiate Next Question nextState = ", nextState)
            return nextState
        default:
            return state;
    }
}

export default InitiateNextQuestion