import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { getStoredQuestionStats } from '../Helpers/StorageFunctions'


class HomeScreen extends React.Component {
    
  constructor() {
      super();
      this.state = {
        questionsList: [],
      };
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


  
        return(
          <View style={styles.main_view}>
            <View style={styles.title_view}>
                <Text style={styles.title_text}>CAPITALES</Text>
            </View>
            <View style={styles.stats_view}>
                <Text style={styles.stats_text}>Vous connaissez x capitales</Text>
                <Emoji name='flushed' style={{ fontSize: 30 }}/>
            </View>
            <View style={styles.play_view}>
                <TouchableOpacity style={styles.button}
                        onPress={() => { this._goSeriesScreen() }}>
                        <Text style={styles.button_text}>JOUER</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.play_view}>
              <TouchableOpacity style={styles.button}
                          onPress={() => { this._essaiAsyncStorage() }}>
                          <Text style={styles.button_text}>Essai STore key value</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                      onPress={() => { this._getData() }}>
                      <Text style={styles.button_text}>Get Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                      onPress={() => { this.props.navigation.navigate('GlobalQuestionStatsScreen', {}) }}>
                      <Text style={styles.button_text}>Get All Keys</Text>
              </TouchableOpacity>
            </View>
          </View>  
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        marginTop: 30
    },
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
