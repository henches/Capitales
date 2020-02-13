import { G_SerializeQueresList } from '../../Helpers/GlobalFunctions'
import { G_GetLevelFromRightResponsesNb, G_GetAdditionalPointsForRightResponseNb , G_GetTotalPointsForRightResponseNb} from '../../Helpers/GlobalFunctions'


const initialState = {
    QueresSeries: []
}

_findIndexInStateList = (normalDirection, statesList, question) => {
    let i = 0;

    while (i < statesList.length) {
        if (normalDirection) {
            if (question.localeCompare(statesList[i].capital) == 0) 
                break
        }
        else {
            if (question.localeCompare(statesList[i].state) == 0) 
                break
        }
        i++
    } 
    return i

}

_createProposedResponsesList = (normalDirection, responsesNb, question) => { // normalDirection : booleen = le sens dans lequel on pose la question : true : "quelle est la capitale du pays", false: "l'inverse"
    // console.log("Reducer HandleQueresSeriesReducer / QUERES_SERIES-INITIATE _createProposedResponsesList  normalDirection = ", normalDirection, "responsesNb = ", responsesNb, " question = ", question)
    
    let myPossibleResponsesList = [];
    
    let cloneStatesList = [...G_StatesList];
    const indexOfRightQueres = this._findIndexInStateList(normalDirection, cloneStatesList, question)
    const rightQueres = cloneStatesList[indexOfRightQueres]
    cloneStatesList.splice(indexOfRightQueres,1); // on enlève la bonne question-réponse de la liste clone des questions-reponses
    for (let i = 0; i < responsesNb-1; i++) {
        randomIndex = Math.floor(Math.random()*cloneStatesList.length); // on choisit une question-réponse au hasard dans la liste des questions répon
        myPossibleResponsesList.push(cloneStatesList[randomIndex]) // on ajoute la Queres dans la liste des réponses qu'on va proposer
        cloneStatesList.splice(randomIndex,1) // on supprime la Queres de la liste clone
    }
    let index = Math.floor(Math.random()*myPossibleResponsesList.length) // on choisit l'endroit de la liste où l'on va insérer la bonne réponse
    myPossibleResponsesList.splice(index, 0, rightQueres) //on insère la bonne réponse dans la liste


    return myPossibleResponsesList
}


function HandleQueresSeriesReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'QUERES_SERIES-INITIATE' :   // value = queresStats
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE value = ', action.value)
            let myQueresSeries = []
            
            let cloneQueresStats = [...action.value] // Recopie de queresSTats
            for (let i = 0; i < G_Config.SeriesLength; i++) {
                // Cherche une question au hasard parmi toutes les queres possibles originelles.
                let index = Math.floor(Math.random()*cloneQueresStats.length);
                let sl = cloneQueresStats[index]
                // console.log("sl = ", sl)
                // en function du niveau de la queres : propose les listes de réponses adaptées
                if (sl.level == 0) {
                    proposedResponsesList = this._createProposedResponsesList(true, G_Config.Level[0].ProposedResponsesNb, sl.Queres.capital)
                }
                else if (sl.level == 1) {
                    proposedResponsesList = this._createProposedResponsesList(true, G_Config.Level[1].ProposedResponsesNb, sl.Queres.capital)
                }
                else if (sl.level == 2) {
                    proposedResponsesList = this._createProposedResponsesList(false, G_Config.Level[2].ProposedResponsesNb, sl.Queres.state)
                }
                else if (sl.level == 3) {
                    proposedResponsesList = []
                }
                else if (sl.level == 4) {
                    proposedResponsesList = []
                }
                // Ajoute le test (question + les réponses proposées) à la série
                myQueresSeries.push( { id: myQueresSeries.length.toString(), 
                    state: sl.Queres.state, capital: sl.Queres.capital, image: sl.Queres.image, 
                    proposedResponses: proposedResponsesList, 
                    level: sl.level, rightResponsesNb: sl.rightResponsesNb, wrongResponsesNb: sl.wrongResponsesNb, totalPoints: sl.totalPoints, 
                    isResponseRight: false, givenResponse: "", isTypo: false, pointsWon: 0, 
                    afterResponseLevel: sl.level, afterResponseRightResponsesNb: 0,  afterResponseWrongResponsesNb: 0, afterResponseTotalPoints: 0 })
                // Supprime la question choisie au hasard pour qu'on le sélectionne plus par la suite
                cloneQueresStats.splice(index,1)
            }
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE myQueresSeries = ', myQueresSeries)
            console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE ')
            console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE myQueresSeries', myQueresSeries)
            
            nextState = {
                ...state,
                QueresSeries : myQueresSeries
            }
            return nextState || state
        case 'QUERES_SERIES-ADD_ANSWER' :   // value = { index = index de la queresSerie en cours,  isResponseRight, givenResponse, isTypo }
            console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER value = ", action.value)
            let queresSeries = [...state.QueresSeries]
            const queres = queresSeries[action.value.index]

            queres.isResponseRight = action.value.isResponseRight
            queres.givenResponse = action.value.givenResponse
            queres.isTypo = action.value.isTypo
            queres.pointsWon = queres.isResponseRight ? G_GetAdditionalPointsForRightResponseNb(queres.rightResponsesNb) : 0

            const afterResponseRightResponsesNb = queres.rightResponsesNb + (queres.isResponseRight ? 1 : 0)
            const afterResponseWrongResponsesNb = queres.wrongResponsesNb + (queres.isResponseRight ? 0 : 1)
            const afterResponseElts = G_GetLevelFromRightResponsesNb(afterResponseRightResponsesNb)

            queres.afterResponseLevel = afterResponseElts.level
            queres.afterResponseRightResponsesNb = afterResponseRightResponsesNb 
            queres.afterResponseWrongResponsesNb = afterResponseWrongResponsesNb 
            //            queres.afterResponseRNbForNextLevel = levelElements.rNbForNextLevel
            queres.afterResponseTotalPoints = G_GetTotalPointsForRightResponseNb(afterResponseRightResponsesNb)


//            console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER elt = ", elt)
            console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER queresSeries = ", G_SerializeQueresList(queresSeries))
            nextState = {
                ...state,
                   QueresSeries: queresSeries
            }
            return nextState || state
        default:
            return state
    }
}


export default HandleQueresSeriesReducer