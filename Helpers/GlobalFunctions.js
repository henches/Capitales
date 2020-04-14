export function G_SerializeQueresList(aQueresList) {
    s = ""
    for (var i = 0; i < aQueresList.length; i++) {
        s = s + " " + aQueresList[i].state;
    }
    return s
}


export const QuestionTypes = Object.freeze({ NORMAL:1, LESS_ASKED:2, TO_WORK:3 })
