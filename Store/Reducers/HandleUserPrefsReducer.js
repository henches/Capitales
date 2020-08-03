import { storeUserPrefs } from '../../Helpers/StorageFunctions'

const initialState = {
    soundsActive: true, 
    gameFinished: false, 
} 

function HandleUserPrefsReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_PREFS-INITIATE' :   
            console.log("Reducer HandleUserPrefsReducer USER_PREFS-INITIATE value", action.value)
            nextState = {
                ...state,
                    soundsActive: action.value.soundsActive,
                    gameFinished: action.value.gameFinished
            }
            return nextState
        case 'USER_PREFS-SOUNDS_ACTIVE' :   // value : l'objet qui liste les User Preferences
            console.log("Reducer HandleUserPrefsReducer USER_PREFS-SOUNDS_ACTIVE value = ", action.value)
            nextState = {
                ...state,
                    soundsActive: action.value
            } 
            storeUserPrefs(nextState) // on sauvegarde cet objet sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de l\'objet UserPrefs')
            })
            return nextState
        case 'USER_PREFS-GAME_FINISHED' :   // value : l'objet qui liste les User Preferences
            console.log("Reducer HandleUserPrefsReducer USER_PREFS-GAME_FINISHED value = ", action.value)
            nextState = {
                ...state,
                    gameFinished: action.value
            } 
            storeUserPrefs(nextState) // on sauvegarde cet objet sur le storage
            .then(myList => {
                console.log('fin de l\'écriture de l\'objet UserPrefs')
            })
            return nextState
        default:
            return state
    }
}

export default HandleUserPrefsReducer