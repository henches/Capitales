import { G_SerializeQRList } from '../../Helpers/GlobalFunctions'



const initialState = {
    SeriesQRList: []
}


function InitiateQRSeriesReducer(state = initialState, action) {
    let nextState
    StatesList = global.G_StatesList;
    switch (action.type) {
       case 'INITIATE-SERIES' :   
            let seriesQRList = []
            let cloneStatesList = [...StatesList]
            for (var i = 0; i < G_SeriesLength; i++) {
                index = Math.floor(Math.random()*cloneStatesList.length);
                seriesQRList.push(cloneStatesList[index])
                cloneStatesList.splice(index,1)
            }
            G_SeriesQRList = seriesQRList;
                console.log('Reducer InitiateQRSeriesReducer INITIATE-SERIES : Liste de Questions Reponses = ', G_SerializeQRList(seriesQRList))
            nextState = {
                ...state,
                SeriesQRList : G_SeriesQRList
           
            }
            return nextState || state
        default:
            return state;
    }
}

export default InitiateQRSeriesReducer