const Zones = ["Monde", "Europe", "Afrique", "AsiePacif", "Ameriques" ]
global.G_Monde = 0
global.G_Europe = 0
global.G_Afrique = 0
global.G_AsiePacif = 0
global.G_Ameriques = 0



export function InitPointsManager(QuestionStatsList) {
    pointsManager = {
        alreadyDisplayed: false,
        zones: []
    }
    
    zonesList = []
    
    for (i = 0; i < Zones.length; i++) {
        zonesList.push({
                zone: Zones[i],
                nb: 0,
                oldPoints: 0,
                points: 0,
                maxPoints: 0
        })
    }
    // console.log(" zonesList = ", zonesList)
    // console.log(" QuestionStatsList = ", QuestionStatsList)

    zonesList[G_Monde].nb = QuestionStatsList.length
    for (i = 0; i < QuestionStatsList.length; i++) {
        // console.log(" QuestionStatsList[i] = ", QuestionStatsList[i])
        // console.log("QuestionStatsList[i].Queres.continent = ", QuestionStatsList[i].Queres.continent)
        let found = false
        for (let z = 0; z < zonesList.length; z++) {
            if (QuestionStatsList[i].Queres.continent.localeCompare(Zones[z]) == 0) {
                zonesList[z].nb++
                found = true
                break
            }
        }
        if (!found) 
            console.log("Il y a un pays In-continent ! Vite une couche !!", QuestionStatsList[i].Queres.state, QuestionStatsList[i].Queres.continent)
    }

    for (i = 0; i < zonesList.length; i++) 
        zonesList[i].maxPoints = zonesList[i].nb*G_Points[G_Points.length-1]

    // console.log(" zonesList = ", zonesList)

    pointsManager.zones = zonesList

    return pointsManager
}

export function GetPointsForZone(pM, zone) {
    return pM.zones[zone].points
}

export function GetOldPointsForZone(pM, zone) {
    return pM.zones[zone].oldPoints
}

export function GetMaxPointsForZone(pM, zone) {
    return pM.zones[zone].maxPoints
}

export function GetProgressForZone(pM, zone) {
    console.log("GetProgressForZone(zone) zone = ", zone)
    return pM.zones[zone].points/GetMaxPointsForZone(pM, zone)
}

export function AddPointsForZone(pM, zone, points) {
    pM.zones[zone].points+=points
}

export function SetPointsProgressDisplayed(pM, alreadyDisplayed) {
    pM.alreadyDisplayed = alreadyDisplayed
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


