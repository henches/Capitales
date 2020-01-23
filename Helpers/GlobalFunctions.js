export function G_SerializeQueresList(aQueresList) {
    s = ""
    for (var i = 0; i < aQueresList.length; i++) {
        s = s + " " + aQueresList[i].state;
    }
    return s
}

export function G_GetLevelFromrightResponsesNb(rightResponsesNb) {
    rr = rightResponsesNb
    GC = G_Config

    level = 0
    
    if (rr >= GC.Level0.QrNumber+GC.Level1.QrNumber+GC.Level2.QrNumber+GC.Level3.QrNumber)
        level = 4
    else if (rr >= GC.Level0.QrNumber+GC.Level1.QrNumber+GC.Level2.QrNumber)
        level = 3
    else if (rr >= GC.Level0.QrNumber+GC.Level1.QrNumber)
        level = 2
    else if (rr >= GC.Level0.QrNumber)
        level = 1
    else 
        level = 0

    return level
}