export function G_SerializeQueresList(aQueresList) {
    s = ""
    for (var i = 0; i < aQueresList.length; i++) {
        s = s + " " + aQueresList[i].state;
    }
    return s
}

export function G_GetLevelFromRightResponsesNb(rightResponsesNb) {
    rr = rightResponsesNb
    GC = G_Config

    lev = 0
    respNb = 0
    
    if (rr >= GC.Level0.QrNb+GC.Level1.QrNb+GC.Level2.QrNb+GC.Level3.QrNb) {
        lev = 4
        respNb = 0
        console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= GC.Level0.QrNb+GC.Level1.QrNb+GC.Level2.QrNb) {
        lev = 3
        respNb = GC.Level3.QrNb-(rr-GC.Level0.QrNb-GC.Level1.QrNb-GC.Level2.QrNb)
        console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= GC.Level0.QrNb+GC.Level1.QrNb) {
        lev = 2
        respNb = GC.Level2.QrNb-(rr-GC.Level0.QrNb-GC.Level1.QrNb)
        console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= GC.Level0.QrNb) {
        lev = 1
        respNb = GC.Level1.QrNb-(rr-GC.Level0.QrNb)
        console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else {
        lev = 0
        respNb = GC.Level0.QrNb-rr
        console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }

    return { level: lev, responsesNbForNextLevel: respNb } 
}

