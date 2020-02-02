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
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>CAPITALES</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: '1px' }}>
                <Text style={{ flex: 1, alignItems: 'flex-end', fontSize: 20, fontWeight: 'bold' }}>Score</Text>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', paddingTop: 0, paddingBottom: 0, paddingRight: '5%', paddingLeft: '5%', borderWidth: '1px'}}>
                        <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: 11, width:"100%", alignSelf: 'center'}}>
                            <View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: '30%'}}></View>         
                        </View>      
                </View>
                <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold' }}>154</Text>
            </View>
            <View style={{ flex: 3 }}>  
                <TouchableOpacity style={styles.button}
                        onPress={() => { this._goSeriesScreen() }}>
                        <Text style={styles.button_text}>JOUER</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4 }}>
            </View>
            <View style={{ flex: 4 }}> 
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
    
    button: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: 5
    },

})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(HomeScreen)
