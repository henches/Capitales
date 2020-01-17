import { G_SerializeQueResList } from '../../Helpers/GlobalFunctions'



const initialState = {
    QueResSeriesList: []
}


function InitiateQueResSeriesReducer(state = initialState, action) {
    let nextState
    StatesList = global.G_StatesList;
    switch (action.type) {
       case 'INITIATE-SERIES' :   
            let queResSeriesList = []
            let cloneStatesList = [...StatesList]
            for (var i = 0; i < G_SeriesLength; i++) {
                index = Math.floor(Math.random()*cloneStatesList.length);
                queResSeriesList.push(cloneStatesList[index])
                cloneStatesList.splice(index,1)
            }
            G_QueResSeriesList = queResSeriesList;
                console.log('Reducer InitiateQueResSeriesReducer INITIATE-SERIES : Liste de Questions Reponses = ', G_SerializeQueResList(queResSeriesList))
            nextState = {
                ...state,
                QueResSeriesList : G_QueResSeriesList
           
            }
            return nextState || state
        default:
            return state;
    }
}

export default InitiateQueResSeriesReducer