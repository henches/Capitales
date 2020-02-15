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

function createProbaAdaptedQueresStats(queresStats) {
    G_CoefLevel4 = 0.1  // pourcentage de probabilité de choisir un queres de level4

    let nbLevel4 = 0 // nombre de queres de level4
    for (var i in queresStats) {
        if (queresStats[i].level == 4) nbLevel4++
    }
    console.log("nbLevel4", nbLevel4)
    let probaAdaptedQueresPointer = []
    if (nbLevel4 == 0 || nbLevel4 == queresStats.length) { // Aucun Level 4 dans la liste = on rretourne une liste qui pointe sur la liste (donc sans changement d'occurences)
        for (var index = 0; index < queresStats.length; index++) 
                probaAdaptedQueresPointer.push(index)
    }
    else {
        let otherLevelLength = ((1-G_CoefLevel4)/G_CoefLevel4)*nbLevel4 // nombre total d'éléménts de level autres que 4
        let otherLevelNumber = otherLevelLength/(queresStats.length-nbLevel4) // nombre de fois ou il faut positionner les queres différents de level4 dans la probaListe 
        console.log("otherLevelLength :", otherLevelLength)
        console.log("otherLevelNumber :", otherLevelNumber)
        for (var index = 0; index < queresStats.length; index++) {
            if (queresStats[index].level == 4) {
                probaAdaptedQueresPointer.push(index)
            }
            else {
                for(var i = 0; i < otherLevelNumber; i++)
                    probaAdaptedQueresPointer.push(index)
            }
        }
    }
    return probaAdaptedQueresPointer
}

function supressIndexFormProbaAdaptedQueresStats(list, index) {
    var start = -1
    var stop = list.length-1
    var firstOfSerial = true
    for (var i = 0; i < list.length; i++) {
        if (start == -1) { // On a pas encore trouvé l'index qu'on recherche
            if (list[i] == index) // on commence la série
               start = i;
        }
        else { // On est dans la série
            if (list[i] != index) { // On n'est plus dans la série
                list[i]-- // on est après la série -> on décrémente les index pour continuer à pointer vers les bons endroits 
                if (firstOfSerial) { // c'est la première fois qu'on est à la fin de la série
                    stop = i-1 // On marque la fin de la série
                    firstOfSerial = false // on indique qu'on ne sera plus le premier de la fin de la série
                }
            }
        }
    }
    if (start != -1)
        list.splice(start, stop-start+1)
}

function printProbaAdaptedList(list) {
    let aff = ""
    list.forEach(elt => aff += elt+" ")
    console.log(aff)
}

function HandleQueresSeriesReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'QUERES_SERIES-INITIATE' :   // value = queresStats
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE value = ', action.value)
            let myQueresSeries = []
            
            let cloneQueresStats = [...action.value] // Recopie de queresSTats*
            let probaAdaptedQueresStats = createProbaAdaptedQueresStats(cloneQueresStats) // Adapte la liste pour minimiser les chances de choisir une niveau 4
            console.log('probaAdaptedQueresStats : ')
            printProbaAdaptedList(probaAdaptedQueresStats)
            for (let i = 0; i < G_Config.SeriesLength; i++) {
                // Cherche une question au hasard parmi toutes les queres possibles originelles.
                const indexInProbaList = Math.floor(Math.random()*probaAdaptedQueresStats.length);
                const indexInQueresStatList = probaAdaptedQueresStats[indexInProbaList]
                const sl = cloneQueresStats[indexInQueresStatList]
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
                // Supprime toutes les question du type de cele choisie au hasard pour qu'on ne les sélectionne plus par la suite
                supressIndexFormProbaAdaptedQueresStats(probaAdaptedQueresStats, indexInQueresStatList) 
                console.log('probaAdaptedQueresStats apres suppression: ')
                printProbaAdaptedList(probaAdaptedQueresStats)
                cloneQueresStats.splice(indexInQueresStatList,1)

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