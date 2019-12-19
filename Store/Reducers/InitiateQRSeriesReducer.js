import StatesList from '../../Helpers/statesData'



const initialState = {
    State_SeriesQRList: []
}


function InitiateQRSeries(state = initialState, action) {
    let nextState
    switch (action.type) {
       case 'INITIATE-SERIES' :   
            console.log("dans Reducer InitiateQRSeries G_SeriesLength = ", G_SeriesLength )
            let seriesQRList = []
            let cloneStatesList = [...StatesList]
            for (var i = 0; i < G_SeriesLength; i++) {
                index = Math.floor(Math.random()*cloneStatesList.length);
                seriesQRList.push(cloneStatesList[index])
                cloneStatesList.splice(index,1)
            }
            G_SeriesQRList = seriesQRList;
                console.log('Liste de Questions Reponses = ', seriesQRList)
            nextState = {
                ...state,
                SeriesQRList : G_SeriesQRList
           
            }
            return nextState || state
        default:
            return state;
    }
}

export default InitiateQRSeries