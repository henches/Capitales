global.Zones = ["Monde", "Europe", "Afrique", "AsiePacif", "Ameriques" ]
global.G_Monde = 0
global.G_Europe = 1
global.G_Afrique = 2
global.G_AsiePacif = 3
global.G_Ameriques = 4



export function InitPointsManager(QuestionStatsList) {
  
    let pM = new Array(G_Config.MaxPlayerLevelNumber)
    
    for (let l = 0; l < G_Config.MaxPlayerLevelNumber; l++) {
        pM[l] = new Array(Zones.length)
        for (let z = 0; z < Zones.length; z++) {
            pM[l][z] = {
                zone: Zones[z],
                nb: 0,
                oldPoints: 0,
                points: 0,
                maxPoints: 0,
                knownQuestions: 0,
                oldKnownQuestions: 0
            }
        }
    }

    let level
    for (let i = 0; i < QuestionStatsList.length; i++) {
        // console.log(" QuestionStatsList[i] = ", QuestionStatsList[i])
        // console.log("QuestionStatsList[i].Queres.continent = ", QuestionStatsList[i].Queres.continent)
        let found = false
        for (let z = 1; z < pM.length; z++) {
            if (QuestionStatsList[i].Queres.niveau < G_Config.MaxPlayerLevelNumber)
                if (QuestionStatsList[i].Queres.continent.localeCompare(Zones[z]) == 0) {
                    level = QuestionStatsList[i].Queres.niveau
                    if (level >= 0) {
                        // console.log("init Pm : level : ", level, " zone = ", z, " continent = ", QuestionStatsList[i].Queres.continent)
                        pM[level][z].nb++
                        pM[level][z].points += QuestionStatsList[i].totalPoints
                        if (QuestionStatsList[i].totalPoints == 3) { // question connue, donc
                            pM[level][z].knownQuestions++
                            pM[level][G_Monde].knownQuestions++
                            pM[level][z].oldKnownQuestions++
                            pM[level][G_Monde].oldKnownQuestions++
                        }
                        pM[level][z].oldPoints = pM[level][z].points
                        pM[level][G_Monde].nb++
                        pM[level][G_Monde].points += QuestionStatsList[i].totalPoints
                        pM[level][G_Monde].oldPoints = pM[level][G_Monde].points
                        found = true
                        break
                    }
                }
        }
        //if (!found) 
            //console.log("Il y a un pays In-continent ! Vite une couche !!", QuestionStatsList[i].Queres.state, QuestionStatsList[i].Queres.continent)
    }

    for (let l = 0; l < pM.length; l++) {
        for (let z = 0; z < pM[l].length; z++) 
            pM[l][z].maxPoints = pM[l][z].nb*3
    }

    for (let l = 0; l < pM.length; l++) {
        for (let z = 0; z < pM[l].length; z++) {
            p = pM[l][z]
            // console.log("pM level = ", l, " / zone = ", p.zone, " / nb = ", p.nb, " / points = ", p.points, " / oldPoints = ", p.oldPoints, " / maxPoints = ", p.maxPoints)
        }
    }


    return pM
}


export function GetKnownQuestions(pM) {
    let knownQuestions = 0
    for (let l = 0; l < pM.length; l++) 
        knownQuestions += pM[l][0].knownQuestions
    return knownQuestions
}

export function GetOldKnownQuestions(pM) {
    let oldKnownQuestions = 0
    for (let l = 0; l < pM.length; l++) 
        oldKnownQuestions += pM[l][G_Monde].oldKnownQuestions
    return oldKnownQuestions
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
    return pM[level][zone].points/GetMaxPointsForZone(pM, zone)
}

export function AddPointsForZone(pM, zone, points, level) {
    pM[level][zone].points += points

}

export function AddOneKnownQuestionForLevel(pM, level) {
    pM[level][G_Monde].knownQuestions++
}

export function SetOldPointsForZone(pM, level) {  // s'invoque quand l'animation de HomeScreen est terminée. On remet oldPoint = poins
    for (let z = 0; z < pM[level].length; z++) {
        pM[level][z].oldPoints = pM[level][z].points
    }
    pM[level][G_Monde].oldKnownQuestions = pM[level][G_Monde].knownQuestions
    

}

toto = 0

export function IsPlayerLevelCompleted(pM, playerLevel) {
// Test de la montée des niveaux (mettre toto ==1 pour changer de niveau à chaque fois
    // return true  // change de niveau apreès chaque serie
/*  
    if (toto == 1) {
        toto = 0
        console.log("totoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo = ", toto)
        return true
    }
    else {
        toto++
        console.log("totoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo = ", toto)
        return false
    }
*/

    let pm=pM[playerLevel][G_Monde]
    return pm.points == pm.maxPoints
}


export function GetPlayerLevel(pM) {
    let level = G_Config.MaxPlayerLevelNumber 
//    console.log("GetPlayerLevel level = ", level)
    do {
        level--
        let p = pM[level][G_Monde]
//        console.log("GetPlayerLevel level = ", level, "  p = ", p)
        if (p.points == p.maxPoints) {
            level++
            break
        }
    } while (level > 0)

    return level
}

export function GetNumberOfRemainingQuestionsToBeAsked(pM, level) {
    let p = pM[level][G_Monde]
    return p.maxPoints - p.points
}

