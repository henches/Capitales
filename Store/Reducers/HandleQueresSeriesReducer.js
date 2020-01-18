import { G_SerializeQueresList } from '../../Helpers/GlobalFunctions'

const initialState = {
    QueresSeries: []
}

_findIndexInStateList = (statesList, capital) => {
    let i = 0;
    
    while (i < statesList.length) {
        if (capital.localeCompare(statesList[i].capital) == 0) {
            break
        }
        i++
    } return i

}

_createProposedResponsesList = (capital) => {
    console.log("Reducer HandleQueresSeriesReducer / QUERES_SERIES-INITIATE _createProposedResponsesList capital =", capital)
    
    let myPossibleResponsesList = [];
    
    cloneStatesList = [...G_StatesList];
    indexOfRightQueres = this._findIndexInStateList(cloneStatesList, capital)
    rightQueres = cloneStatesList[indexOfRightQueres]
    cloneStatesList.splice(indexOfRightQueres,1); // on enlève la bonne question-réponse de la liste clone des questions-reponses
    for (var i = 0; i < G_WrongResponsesNumber; i++) {
        randomIndex = Math.floor(Math.random()*cloneStatesList.length); // on choisit une question-réponse au hasard dans la liste des questions répon
        myPossibleResponsesList.push(cloneStatesList[randomIndex]) // on ajoute la Queres dans la liste des réponses qu'on va proposer
        cloneStatesList.splice(randomIndex,1) // on supprime la Queres de la liste clone
    }
    index = Math.floor(Math.random()*myPossibleResponsesList.length) // on choisit l'endroit de la liste où l'on va insérer la bonne réponse
    myPossibleResponsesList.splice(index, 0, rightQueres) //on insère la bonne réponse dans la liste


    return myPossibleResponsesList
}


function HandleQueresSeriesReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'QUERES_SERIES-INITIATE' :   // value = null
            console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE ')
            let myQueresSeries = []
            let cloneStatesList = [...G_StatesList]
            for (var i = 0; i < G_SeriesLength; i++) {
                index = Math.floor(Math.random()*cloneStatesList.length);
                sl = cloneStatesList[index]
                proposedResponsesList = this._createProposedResponsesList(sl.capital)
                myQueresSeries.push( { id: myQueresSeries.length.toString(), state: sl.state, capital: sl.capital, image: sl.image, 
                    proposedResponses: proposedResponsesList, isResponseRight: false, givenResponse: "" } )
                cloneStatesList.splice(index,1)
            }
            // console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE myQueresSeries = ', myQueresSeries)
            console.log('Reducer HandleQueresSeries QUERES_SERIES-INITIATE ')
            nextState = {
                ...state,
                    QueresSeries : myQueresSeries
            }
            return nextState || state
        case 'QUERES-SERIES-ADD_ANSWER' :   // value = { index = index de la queresSerie en cours,  isResponseRight, givenResponse }
//            console.log("Reducer HandleQueresSeries QUERES_SERIES-ADD_ANSWER value = ", action.value)
            let queresSeries = [...state.QueresSeries]
            const elt = queresSeries[action.value.index]
            elt.isResponseRight = action.value.isResponseRight
            elt.givenResponse = action.value.givenResponse 
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