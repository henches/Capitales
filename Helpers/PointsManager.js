global.Zones = ["Monde", "Europe", "Afrique", "AsiePacif", "Ameriques" ]
global.G_Monde = 0
global.G_Europe = 1
global.G_Afrique = 2
global.G_AsiePacif = 3
global.G_Ameriques = 4


let Points = []

export function InitPointsManager(QuestionStatsList) {
  
    InitPoints()

    let pM = []
    
    for (i = 0; i < Zones.length; i++) {
        pM.push({
                zone: Zones[i],
                nb: 0,
                oldPoints: 0,
                points: 0,
                maxPoints: 0
        })
    }

    pM[G_Monde].nb = QuestionStatsList.length
    for (i = 0; i < QuestionStatsList.length; i++) {
        // console.log(" QuestionStatsList[i] = ", QuestionStatsList[i])
        // console.log("QuestionStatsList[i].Queres.continent = ", QuestionStatsList[i].Queres.continent)
        let found = false
        for (let z = 1; z < pM.length; z++) {
            if (QuestionStatsList[i].Queres.continent.localeCompare(Zones[z]) == 0) {
                pM[z].nb++
                pM[z].points += QuestionStatsList[i].totalPoints
                pM[z].oldPoints = pM[z].points
                pM[G_Monde].points += QuestionStatsList[i].totalPoints
                pM[G_Monde].oldPoints = pM[G_Monde].points
                found = true
                break
            }
        }
        if (!found) 
            console.log("Il y a un pays In-continent ! Vite une couche !!", QuestionStatsList[i].Queres.state, QuestionStatsList[i].Queres.continent)
    }

    for (i = 0; i < pM.length; i++) 
        pM[i].maxPoints = pM[i].nb*Points[Points.length-1]



    return pM
}

export function GetIntegerZoneFromStringZone(pM, stringZone) {
    for (let z = 1; z < pM.length; z++) {
        if (pM[z].zone.localeCompare(stringZone) == 0) {
            return z
        }
    }

}

export function GetPointsForZone(pM, zone) {
    return pM[zone].points
}

export function GetOldPointsForZone(pM, zone) {
    return pM[zone].oldPoints
}

export function GetMaxPointsForZone(pM, zone) {
    return pM[zone].maxPoints
}

export function GetProgressForZone(pM, zone) {
    // console.log("GetProgressForZone(zone) zone = ", zone)
    return pM[zone].points/GetMaxPointsForZone(pM, zone)
}

export function AddPointsForZone(pM, zone, points) {
    pM[zone].points += points

}

export function SetOldPointsForZone(pM) {
    for (let z = 0; z < pM.length; z++)
        pM[z].oldPoints = pM[z].points

}



export function InitPoints() {
    points = 0
    Points.push(points)
    for (l = 0; l < 4; l++) {
        // console.log(l)
        for (n = 0; n < G_Config.Level[l].QrNb; n++) {
            points += G_Config.Level[l].Points
            Points.push(points)
        }
    }
}

export function G_CalculateTotalPoints(QuestionStatsList) {
    totalPoints = 0
    for (i = 0; i < QuestionStatsList.length; i++) {
        totalPoints += QuestionStatsList[i].totalPoints
    }
    return totalPoints
}

export function G_GetTotalPointsForRightResponseNb(rightResponsesNb) {
    if (rightResponsesNb >= Points.length-1)
        rightResponsesNb = Points.length-1
    points = Points[rightResponsesNb]
    console.log("rightResponsesNb  :", rightResponsesNb, " points : ", points)
    return points
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
