import { G_SerializeQueresList } from '../../Helpers/GlobalFunctions'



const initialState = {
    QueresSeriesList: []
}


function InitiateQueresSeriesReducer(state = initialState, action) {
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
            G_QueresSeriesList = queResSeriesList;
                console.log('Reducer InitiateQueresSeriesReducer INITIATE-SERIES : Liste de Questions Reponses = ', G_SerializeQueresList(queResSeriesList))
            nextState = {
                ...state,
                QueresSeriesList : G_QueresSeriesList
           
            }
            return nextState || state
        default:
            return state;
    }
}

export default InitiateQueresSeriesReducer