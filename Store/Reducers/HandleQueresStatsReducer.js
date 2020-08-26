import { storeQuestionStats } from '../../Helpers/StorageFunctions'
import { GetPlayerLevel, InitPointsManager, AddPointsForZone, GetIntegerZoneFromStringZone, SetOldPointsForZone, AddOneKnownQuestionForLevel } from '../../Helpers/PointsManager'


const initialState = {
    pM: null, // PointsManager
    QuestionStatsList: [],
    PlayerLevel: 0
}

function HandleQueresStatsReducer(state = initialState, action) {
    let nextState = null
    let myPM = null
    switch (action.type) {
        case 'QUERES_STATS-INITIATE' :   
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE")
            myPM = InitPointsManager(G_InitialQuestionStatsList, false)
            myPlayerLevel = GetPlayerLevel(myPM)
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE myPlayerLevel = ", myPlayerLevel) 
            // console.log("Reducer HandleQueresStatsReducer myPM= ", myPM)
            nextState = {
                ...state,
                    QuestionStatsList: G_InitialQuestionStatsList,
                    pM: myPM,
                    PlayerLevel: myPlayerLevel
            }
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INITIATE nextState = ", nextState )
            return nextState
        case 'QUERES_STATS-UPDATE' :   // value : queresSeries
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE")
//            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-UPDATE value = ", action.value)
            let questionStatsList = state.QuestionStatsList.slice()
            myPM = state.pM.slice()
            const queresSeries = action.value
            SetOldPointsForZone(myPM, state.PlayerLevel) // recopie les points dans OldPoints avant d'incrémenter les points (permettra l'animation)
            console.log("Reducer HandleQueresStatsReducer state.PlayerLevel = ", state.PlayerLevel) 
            for (let i=0; i < queresSeries.length; i++) {
                const queres = queresSeries[i]
                // console.log("queresSeries[", i, "]=", queresSeries[i])
                let askedCapital = queres.capital
                let isResponseRight = queres.isResponseRight
                console.log("askedCapital = ", askedCapital, " isResponseRight=", isResponseRight)
                let elt = questionStatsList.find(function(element) { // Trouve l'élément correspondant dans la QueresStatList
                    return askedCapital.localeCompare(element.Queres.capital) == 0
                  })
                elt.level = queres.afterResponseLevel
                elt.totalPoints = queres.afterResponseTotalPoints
                elt.rightResponsesNb = queres.afterResponseRightResponsesNb
                elt.wrongResponsesNb = queres.afterResponseWrongResponsesNb
                console.log("elt = ", elt)
                const integerZone = GetIntegerZoneFromStringZone(queres.continent)
                
                if (elt.level == 3)
                    AddOneKnownQuestionForLevel(myPM, state.PlayerLevel)
                AddPointsForZone(myPM, integerZone, queres.pointsWon, state.PlayerLevel)
                AddPointsForZone(myPM, G_Monde, queres.pointsWon, state.PlayerLevel)
            }
            storeQuestionStats(questionStatsList) // on sauvegarde cette liste sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de la liste')
            })

            nextState = {
                ...state,
                    QuestionStatsList: questionStatsList,
                    pM: myPM,
            } 
            return nextState

        
        case 'QUERES_STATS-SHORTCUT' :   // value : questionStateList
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-SHORTCUT")
            //console.log("Reducer HandleQueresStatsReducer QUERES_STATS-SHORTCUT value = ", action.value)
            let qList = [...action.value]
            qList.map((q) => {
                if (q.Queres.niveau <= 10) {
                    q.level = 3
                    q.rightResponsesNb = 3
                    q.totalPoints = 3
                }
                if (q.Queres.niveau == 10) {
                    //console.log("q.id = ", q.id)  // Fait qu'il reste une capitale à saisir
                    //console.log("q.id % 10 = ", q.id % 10)
                    if (q.id % 10 == 2) {
                        console.log("q= ", q)
                        q.level = 2
                        q.rightResponsesNb = 2
                        q.totalPoints = 2
                    }
                }
            })
                
            //console.log("Reducer HandleQueresStatsReducer QUERES_STATS-SHORTCUT qList = ", qList)
        
            let myPM = InitPointsManager(qList, true)
            //console.log("Reducer HandleQueresStatsReducer QUERES_STATS-SHORTCUT myPM = ", myPM)

            nextState = {
                ...state,
                    QuestionStatsList: qList,
                    pM: myPM,
                    PlayerLevel: 10,
            } 
            return nextState

        
        case 'QUERES_STATS-DISPLAYED' :   // value : null
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-DISPLAYED")
            myPM = state.pM.slice()
            SetOldPointsForZone(myPM, state.PlayerLevel) // recopie les points dans OldPoints (l'animation est finie)
            nextState = {
                ...state,
                    pM: myPM
            } 
            return nextState
        case 'QUERES_STATS-INCREMENT_PLAYER_LEVEL' :   
            console.log("Reducer HandleQueresStatsReducer QUERES_STATS-INCREMENT_PLAYER_LEVEL")
            let myPlayerLevel = state.PlayerLevel + 1  
            console.log("Reducer HandleQueresStatsReducer state.PlayerLevel= ", state.PlayerLevel)
            console.log("Reducer HandleQueresStatsReducer myPlayerLevel= ", myPlayerLevel)
            nextState = {
                ...state,
                    PlayerLevel: myPlayerLevel
            }
            return nextState
        default:
            return state;
    }
}

export default HandleQueresStatsReducer