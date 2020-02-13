import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { getStoredQuestionStats } from '../Helpers/StorageFunctions'
import { COLORS, Gstyles } from './Styles'


class HomeScreen extends React.Component {
    
    constructor() {
        super();
        this.state = {
            questionsList: [],
        };
    }
    
    static navigationOptions = {
        headerShown: false,
    }

    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
       this.props.navigation.navigate('GlobalQuestionStatsScreen', {})   
    }

    _goSeriesScreen = () => {
        console.log("Go Series");
        
        this.props.dispatch({ type: "QUERES_SERIES-INITIATE", value: this.props.QuestionStatsList })

        this.props.navigation.navigate('SeriesScreen', { indexInSeries: 0 } )   
//        this.props.navigation.navigate('GlobalQuestionStatsScreen', {})
    }


    render() {

        if (G_InitState) {  // Horrible verrues
            getStoredQuestionStats()  // Récupère la liste des Questions Stats
            .then(myList => {
              G_InitialQuestionStatsList = myList
              this.props.dispatch({ type: "QUERES_STATS-INITIATE", value: 0 })
            })
            G_InitState = false
        }

//        console.log("Go Séries : Qthis.props = ", this.props)
  //      console.log("Go Séries : QuestionStats List = ", this.props.QuestionStatsList)
//     <Emoji name='flushed' style={{ fontSize: 30 }}/>

  
        return(
          <View style={Gstyles.main_view}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold'}}>CAPITALES</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Score</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', paddingTop: 0, paddingBottom: 0, paddingRight: '5%', paddingLeft: '5%'}}>
                        <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: 11, width:"100%", alignSelf: 'center'}}>
                            <View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '30%'}}></View>         
                        </View>      
                </View>
                <View style={{ flexDirection: 'row', paddingRight: '5%', paddingLeft: '5%' }}>
                    <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={{ fontSize: 12 }}>0</Text>
                    </View>
                    <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'center'}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{G_TotalPoints}</Text>
                    </View>
                    <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{ fontSize: 12 }}>{G_MaxPoints}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center' }}>  
                <TouchableOpacity style={Gstyles.button}
                        onPress={() => { this._goSeriesScreen() }}>
                        <Text style={Gstyles.button_text}>JOUER</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4 }}>
            </View>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}> 
                <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._goStatView() }}>
                            <Text style={[Gstyles.button_text, { fontSize: 20, color:'black' }]}>Statistiques</Text>
                </TouchableOpacity>
            </View>
          </View>  
        )
    }
}

const styles = StyleSheet.create({
    title_view: {
        flex:1
    },
    title_text: {
        height: 50
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: 50
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: 50
    },
    
})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(HomeScreen)
