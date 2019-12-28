import { G_SerializeQRList } from '../../Helpers/GlobalFunctions'

const initialState = {
    AnswersList: [],
    RightAnswer: {},
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
                        AnswersList: [],
                        RightAnswer: {},
                        QuestionsCounter: 0
            }
            return nextState
        case 'INITIATE-NEXT-QUESTION-OF-THE-SERIES' :   
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
            console.log("Reducer HandleNextQuestionReducer / INITIATE-NEXT-QUESTION-OF-THE-SERIES AnswersList =", G_SerializeQRList(myAnswersList))

            return nextState
        default:
            return state;
    }
}

export default HandleNextQuestionReducer