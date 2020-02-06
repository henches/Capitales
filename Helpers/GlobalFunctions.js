export function G_SerializeQueresList(aQueresList) {
    s = ""
    for (var i = 0; i < aQueresList.length; i++) {
        s = s + " " + aQueresList[i].state;
    }
    return s
}

export function G_GetImageForLevel(level) {
GC = G_Config
image = null

if (level == 0) 
    image = GC.Level0.Image
else if (level == 1) 
    image = GC.Level1.Image
else if (level == 2) 
    image = GC.Level2.Image
else if (level == 3) 
    image = GC.Level3.Image
else if (level == 4) 
    image = GC.Level4.Image

return image
}


export function G_GetLevelFromRightResponsesNb(rightResponsesNb) {
    rr = rightResponsesNb
    GC = G_Config
    n0 = GC.Level0.QrNb
    n1 = GC.Level1.QrNb
    n2 = GC.Level2.QrNb
    n3 = GC.Level3.QrNb


    lev = 0
    respNb = 0
    
    if (rr >= n0+n1+n2+n3) {
        lev = 4
        respNb = 0
        image = GC.Level4.Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= n0+n1+n2) {
        lev = 3
        respNb = n3-(rr-n0-n1-n2)
        image = GC.Level3.Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= n0+n1) {
        lev = 2
        respNb = n2-(rr-n0-n1)
        image = GC.Level2.Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= n0) {
        lev = 1
        respNb = n1-(rr-n0)
        image = GC.Level1.Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else {
        lev = 0
        respNb = n0-rr
        image = GC.Level0.Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }

    return { level: lev, responsesNbForNextLevel: respNb, image:image } 
}

export function G_GetAdditionalPointsForRightResponseNb(rightResponsesNb) {
    const r = G_GetLevelFromRightResponsesNb(rightResponsesNb)
    const level = r.level
    if (level == 0) 
        return GC.Level0.Points
    if (level == 1) 
        return GC.Level1.Points
    if (level == 2) 
        return GC.Level2.Points
    if (level == 3) 
        return GC.Level2.Points
}

export function initPoints() {
    G_Points.push(0)

    i = 1
    do {
        G_Points.push(G_Points[G_Points.length-1]+G_Config.Level0.Points)
        i++
    } while (i <= G_Config.Level0.QrNb)

    i = 1
    do {
        G_Points.push(G_Points[G_Points.length-1]+G_Config.Level1.Points)
        i++
    } while (i <= G_Config.Level1.QrNb)

    i = 1
    do {
        G_Points.push(G_Points[G_Points.length-1]+G_Config.Level2.Points)
        i++
    } while (i <= G_Config.Level2.QrNb)

    i = 1
    do {
        G_Points.push(G_Points[G_Points.length-1]+G_Config.Level3.Points)
        i++
    } while (i <= G_Config.Level3.QrNb)

    /*
    console.log("POINTS")
    for (i = 0; i < G_Points.length; i++)
      console.log(G_Points[i], " ")
    */
  }



export function G_GetTotalPointsForRightResponseNb(rightResponsesNb) {
    points = G_Points[rightResponsesNb]
    console.log("rightResponsesNb  :", rightResponsesNb, " points : ", points)
    return points
}

