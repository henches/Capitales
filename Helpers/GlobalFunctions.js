export function G_SerializeQueresList(aQueresList) {
    s = ""
    for (var i = 0; i < aQueresList.length; i++) {
        s = s + " " + aQueresList[i].state;
    }
    return s
}

export function G_GetImageForLevel(level) {
    return G_Config.Level[level].Image
}


export function G_GetLevelFromRightResponsesNb(rightResponsesNb) {
    rr = rightResponsesNb
    GCL = G_Config.Level
    n0 = GCL[0].QrNb
    n1 = GCL[1].QrNb
    n2 = GCL[2].QrNb
    n3 = GCL[3].QrNb
    n4 = GCL[4].QrNb


    lev = 0
    respNb = 0
    
    if (rr >= n0+n1+n2+n3) {
        lev = 4
        respNb = 0
        image = GCL[4].Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= n0+n1+n2) {
        lev = 3
        respNb = n3-(rr-n0-n1-n2)
        image = GCL[3].Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= n0+n1) {
        lev = 2
        respNb = n2-(rr-n0-n1)
        image = GCL[2].Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else if (rr >= n0) {
        lev = 1
        respNb = n1-(rr-n0)
        image = GCL[1].Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }
    else {
        lev = 0
        respNb = n0-rr
        image = GCL[0].Image
        // console.log("rightRespNb = ", rightResponsesNb, "lev = ", lev, " respNb = ", respNb)
    }

    return { level: lev, responsesNbForNextLevel: respNb, image:image } 
}

export function G_GetAdditionalPointsForRightResponseNb(rightResponsesNb) {
    const r = G_GetLevelFromRightResponsesNb(rightResponsesNb)

    return G_Config.Level[r.level].Points
}

export function initPoints() {
    points = 0
    G_Points.push(points)
    for (l = 0; l < 4; l++) {
        console.log(l)
        for (n = 0; n < G_Config.Level[l].QrNb; n++) {
            points += G_Config.Level[l].Points
            G_Points.push(points)
        }
    }
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

