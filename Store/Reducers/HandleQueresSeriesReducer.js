import { G_SerializeQueresList } from '../../Helpers/GlobalFunctions'
import { G_GetLevelFromRightResponsesNb, G_GetAdditionalPointsForRightResponseNb , G_GetTotalPointsForRightResponseNb} from '../../Helpers/PointsManager'


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

_createProposedResponsesList = (normalDirection, responsesNb, question, continent) => { // normalDirection : booleen = le sens dans lequel on pose la question : true : "quelle est la capitale du pays", false: "l'inverse"
    // console.log("Reducer HandleQueresSeriesReducer / QUERES_SERIES-INITIATE _createProposedResponsesList  normalDirection = ", normalDirection, "responsesNb = ", responsesNb, " question = ", question)
    
    let myPossibleResponsesList = [];
    
    let cloneStatesList = [...G_StatesList];
    const indexOfRightQueres = this._findIndexInStateList(normalDirection, cloneStatesList, question)
    const rightQueres = cloneStatesList[indexOfRightQueres]
    cloneStatesList.splice(indexOfRightQueres,1); // on enlève la bonne question-réponse de la liste clone des questions-reponses
    filterListByOtherContinents(cloneStatesList, continent) // Supprime les éléments de la liste qui ne sont pas du continent de la question
    for (let i = 0; i < responsesNb-1; i++) {
        randomIndex = Math.floor(Math.random()*cloneStatesList.length); // on choisit une question-réponse au hasard dans la liste des questions répon
        myPossibleResponsesList.push(cloneStatesList[randomIndex]) // on ajoute la Queres dans la liste des réponses qu'on va proposer
        cloneStatesList.splice(randomIndex,1) // on supprime la Queres de la liste clone
    }
    let index = Math.floor(Math.random()*myPossibleResponsesList.length) // on choisit l'endroit de la liste où l'on va insérer la bonne réponse
    myPossibleResponsesList.splice(index, 0, rightQueres) //on insère la bonne réponse dans la liste


    return myPossibleResponsesList
}


function filterListByPlayerLevel(queresStatList, level) {
    let i = queresStatList.length
    while (i--) {
        //console.log("filterListByPlayerLevel: level = ", level, " queresStatList[i].Queres.niveau = ", queresStatList[i].Queres.niveau)
        if (queresStatList[i].Queres.niveau != level) {
            //console.log("filterListByPlayerLevel: suppression de ", queresStatList[i].Queres.state)
            queresStatList.splice(i, 1);
        }
    } 
}

function filterListByQueresLevel(queresStatList, level) {
    let i = queresStatList.length
    while (i--) {
        console.log("filterListByPlayerLevel: level = ", level, " queresStatList[i].level = ", queresStatList[i].level)
        if (queresStatList[i].level == level) {
            console.log("filterListByPlayerLevel: suppression de ", queresStatList[i].Queres.state)
            queresStatList.splice(i, 1);
        }
    } 
}

function filterListByOtherContinents(statList, continent) {
    let i = statList.length
    while (i--) {
        //console.log("filterListByOtherContinents: continent = ", continent, " statList[i].continent = ", statList[i].continent)
        if (statList[i].continent.localeCompare(continent) != 0) {
            //console.log("filterListByOtherContinents: suppression de ", statList[i].state)
            statList.splice(i, 1);
        }
    } 
}


function HandleQueresSeriesReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'QUERES_SERIES-INITIATE' :   // value =  { questionStatList: this.props.QuestionStatsList, pM: this.props.pM, playerLevel: this.props.PlayerLevel }})

            console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE ')
            let myQueresSeries = []
            let queresStatList = [...action.value.questionStatList] // Recopie de queresStats
            let playerLevel = action.value.playerLevel

            filterListByPlayerLevel(queresStatList, playerLevel) // Supprime les éléments de la liste qui ne sont pas du niveau actuel du joueur
            filterListByQueresLevel(queresStatList, 3) // Supprime les éléments de la liste qui sont de niveau 3 (donc les questions pour lesquelles le joueur a prouvé qu'il les connait)

            numberOfRemainingQuestionsToBeAsked = Math.min(G_Config.SeriesLength, queresStatList.length)

            for (let i = 0; i < numberOfRemainingQuestionsToBeAsked; i++) {
                // Cherche une question au hasard parmi toutes les queres possibles originelles.
                // Evol ListSpec : en fonction du choix du continent : on tape dans la bonne liste
                const index = Math.floor(Math.random()*queresStatList.length);
                const sl = queresStatList[index]
                // console.log("sl = ", sl)
                // en function du niveau de la queres : propose les listes de réponses adaptées
                if (sl.level == 0) {
                    proposedResponsesList = this._createProposedResponsesList(true, G_Config.Level[0].ProposedResponsesNb, sl.Queres.capital, sl.Queres.continent)
                }
                else if (sl.level == 1) {
                    proposedResponsesList = this._createProposedResponsesList(false, G_Config.Level[1].ProposedResponsesNb, sl.Queres.state, sl.Queres.continent)
                }
                else if (sl.level == 2) {
                    proposedResponsesList = this._createProposedResponsesList(true, G_Config.Level[2].ProposedResponsesNb, sl.Queres.capital, sl.Queres.continent)
                }
                else if (sl.level == 3) {
                    proposedResponsesList = []
                }
                // Ajoute le test (question + les réponses proposées) à la série
                myQueresSeries.push( { id: myQueresSeries.length.toString(), 
                    state: sl.Queres.state, capital: sl.Queres.capital, continent: sl.Queres.continent, image: sl.Queres.image, prefixe: sl.Queres.prefixe,
                    proposedResponses: proposedResponsesList, 
                    level: sl.level, rightResponsesNb: sl.rightResponsesNb, wrongResponsesNb: sl.wrongResponsesNb, totalPoints: sl.totalPoints, 
                    isResponseRight: false, givenResponse: "", isTypo: false, pointsWon: 0, 
                    afterResponseLevel: sl.level, afterResponseRightResponsesNb: 0,  afterResponseWrongResponsesNb: 0, afterResponseTotalPoints: 0 })

                queresStatList.splice(index,1)

            }
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE myQueresSeries = ', myQueresSeries)
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE ')
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE myQueresSeries', myQueresSeries)
            
            nextState = {
                ...state,
                QueresSeries : myQueresSeries
            }
            return nextState || state
        case 'QUERES_SERIES-ADD_ANSWER' :   // value = { index = index de la queresSerie en cours,  isResponseRight, givenResponse, isTypo }
            console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER ")
            let queresSeries = [...state.QueresSeries]
            const queres = queresSeries[action.value.index]

            queres.isResponseRight = action.value.isResponseRight
            queres.givenResponse = action.value.givenResponse
            queres.isTypo = action.value.isTypo
            queres.pointsWon = queres.isResponseRight ? 1 : 0

            queres.afterResponseRightResponsesNb = queres.rightResponsesNb + (queres.isResponseRight ? 1 : 0)
            queres.afterResponseWrongResponsesNb = queres.wrongResponsesNb + (queres.isResponseRight ? 0 : 1)
            queres.afterResponseLevel  = queres.afterResponseRightResponsesNb

            //            queres.afterResponseRNbForNextLevel = levelElements.rNbForNextLevel
            queres.afterResponseTotalPoints = queres.afterResponseRightResponsesNb


//            console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER elt = ", elt)
            // console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER queresSeries = ", G_SerializeQueresList(queresSeries))
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