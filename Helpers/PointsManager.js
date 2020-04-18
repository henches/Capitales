global.Zones = ["Monde", "Europe", "Afrique", "AsiePacif", "Ameriques" ]
global.G_Monde = 0
global.G_Europe = 1
global.G_Afrique = 2
global.G_AsiePacif = 3
global.G_Ameriques = 4

const MaxPlayerLevelNumber = 8
const TempoMaxPlayerLevelNumber = 2  // Nombre de niveaux pendant le test des niveaux

let Points = []


export function InitPointsManager(QuestionStatsList) {
  
    InitPoints()

    let pM = new Array(MaxPlayerLevelNumber)
    
    for (l = 0; l < MaxPlayerLevelNumber; l++) {
        pM[l] = new Array(Zones.length)
        for (z = 0; z < Zones.length; z++) {
            pM[l][z] = {
                zone: Zones[z],
                nb: 0,
                oldPoints: 0,
                points: 0,
                maxPoints: 0
            }
        }
    }

    let level
    for (i = 0; i < QuestionStatsList.length; i++) {
        // console.log(" QuestionStatsList[i] = ", QuestionStatsList[i])
        // console.log("QuestionStatsList[i].Queres.continent = ", QuestionStatsList[i].Queres.continent)
        let found = false
        for (let z = 1; z < pM.length; z++) {
            if (QuestionStatsList[i].Queres.continent.localeCompare(Zones[z]) == 0) {
                level = QuestionStatsList[i].Queres.niveau
                if (level >= TempoMaxPlayerLevelNumber) // Pour le cas des questions de niveau 10 (que je n'ai pas encore rangés en niveau) 
                    level  = TempoMaxPlayerLevelNumber // on met ces questions au niveau juste au-dessus de ceux qu'on a rempli
                console.log("init Pm : level : ", level, " zone = ", z, " continent = ", QuestionStatsList[i].Queres.continent)
                pM[level][z].nb++
                pM[level][z].points += QuestionStatsList[i].totalPoints
                pM[level][z].oldPoints = pM[level][z].points
                pM[level][G_Monde].nb++
                pM[level][G_Monde].points += QuestionStatsList[i].totalPoints
                pM[level][G_Monde].oldPoints = pM[level][G_Monde].points
                found = true
                break
            }
        }
        if (!found) 
            console.log("Il y a un pays In-continent ! Vite une couche !!", QuestionStatsList[i].Queres.state, QuestionStatsList[i].Queres.continent)
    }

    for (let l = 0; l < pM.length; l++) {
        for (let z = 0; z < pM[l].length; z++) 
            pM[l][z].maxPoints = pM[l][z].nb*Points[Points.length-1]
    }

    for (let l = 0; l < pM.length; l++) {
        for (let z = 0; z < pM[l].length; z++) {
            p = pM[l][z]
            console.log("pM level = ", l, " / zone = ", p.zone, " / nb = ", p.nb, " / points = ", p.points, " / oldPoints = ", p.oldPoints, " / maxPoints = ", p.maxPoints)
        }
    }


    return pM
}

export function GetIntegerZoneFromStringZone(stringZone) {
    for (let z = 1; z < Zones.length; z++) {
        if (Zones[z].localeCompare(stringZone) == 0) {
            return z
        }
    }

}

export function GetPointsForZone(pM, zone, level) {
    return pM[level][zone].points
}

export function GetOldPointsForZone(pM, zone, level) {
    return pM[level][zone].oldPoints
}

export function GetMaxPointsForZone(pM, zone, level) {
    return pM[level][zone].maxPoints
}

export function GetProgressForZone(pM, zone, level) {
    // console.log("GetProgressForZone(zone) zone = ", zone)
    return pM[zone].points/GetMaxPointsForZone(pM, zone)
}

export function g(pM, zone, points, level) {
    pM[level][zone].points += points

}

export function SetOldPointsForZone(pM, level) {
    for (let z = 0; z < pM[level].length; z++)
        pM[level][z].oldPoints = pM[level][z].points

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


export function GetPlayerLevel(pM) {
    let level = MaxPlayerLevelNumber-1 
    
    do {
        let p = pM[level][G_Monde]
        if (p.maxPoints == 0) { // Situation temporaire où tous les niveaux ne sont pas mentionnés dans le fichiers des questions (statesData)
        }
        else {
            if (p.points == p.maxPoints)
                break
        }
        level--
    } while (level > 0)

    return level
}

export function GetNumberOfRemainingQuestionsToBeAsked(pM, level) {
    let p = pM[level][G_Monde]
    return p.maxPoints - p.points
}

