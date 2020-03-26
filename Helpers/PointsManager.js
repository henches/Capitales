const zones = ["Monde", "Europe", "Afrique", "AsiePacif", "Ameriques" ]
global.G_Monde = 0
global.G_Europe = 0
global.G_Afrique = 0
global.G_AsiePacif = 0
global.G_Ameriques = 0


export function InitPointsManager(QuestionStatsList) {
    const zonesList = []
    for (i = 0; i < zones.length; i++) {
        zonesList.push({
                zone: G_Zones[i],
                nb: 0,
                oldPoints: 0,
                points: 0,
                maxPoints: 0
        })
    }
    console.log(" zonesList = ", zonesList)
    // console.log(" QuestionStatsList = ", QuestionStatsList)

    zonesList[G_Monde].nb = QuestionStatsList.length
    for (i = 0; i < QuestionStatsList.length; i++) {
        // console.log(" QuestionStatsList[i] = ", QuestionStatsList[i])
        // console.log("QuestionStatsList[i].Queres.continent = ", QuestionStatsList[i].Queres.continent)
        let found = false
        for (let z = 0; z < zones.length; z++) {
            if (QuestionStatsList[i].Queres.continent.localeCompare(zones[z]) == 0) {
                zonesList[z].nb++
                found = true
                break
            }
        }
        if (!found) 
            console.log("Il y a un pays In-continent ! Vite une couche !!", QuestionStatsList[i].Queres.state, QuestionStatsList[i].Queres.continent)
    }

    for (i = 0; i < zoneData.length; i++) 
        zonesList[i].maxPoints = zonesList[i].nb*G_Points[G_Points.length-1]

    console.log(" zonesList = ", zonesList)

    pointsManager = {
        alreadyDisplayed: false,
        zones: zonesList
    }
    return pointsManager
}

export function GetPointsForZone(pointsManager, zone) {
    return pointsManager.zones[zone].points
}

export function GetOldPointsForZone(pointsManager, zone) {
    return pointsManager.zones[zone].oldPoints
}

export function GetMaxPointsForZone(pointsManager, zone) {
    return pointsManager.zones[zone].maxPoints
}

export function GetProgressForZone(pointsManager, zone) {
    return pointsManager.zones[zone].points/zoneData[zone].maxPoints
}

export function AddPointsForZone(pointsManager, zone, points) {
    pointsManager.zones[zone].points+=points
}

export function SetPointsProgressDisplayed(pointsManager, alreadyDisplayed) {
    pointsManager.alreadyDIsplayed = alreadyDisplayed
}


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



export function G_InitPoints() {
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

export function G_CalculateTotalPoints(QuestionStatsList) {
    totalPoints = 0
    for (i = 0; i < QuestionStatsList.length; i++) {
        totalPoints += QuestionStatsList[i].totalPoints
    }
    return totalPoints
}

export function G_GetTotalPointsForRightResponseNb(rightResponsesNb) {
    if (rightResponsesNb >= G_Points.length-1)
        rightResponsesNb = G_Points.length-1
    points = G_Points[rightResponsesNb]
    console.log("rightResponsesNb  :", rightResponsesNb, " points : ", points)
    return points
}

