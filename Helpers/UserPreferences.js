import { QuestionTypes } from './GlobalFunctions'

export function GetPreferences() {
    return({ 
        QuestionType: QuestionTypes.Normal,
        ChosenZone: G_Afrique 
    })
}
