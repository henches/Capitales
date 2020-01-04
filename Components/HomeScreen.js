import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { AsyncStorage } from 'react-native'

class HomeScreen extends React.Component {
    
  constructor() {
      super();
      this.state = {
        questionsList: [],
      };
  }

  _getAllKeys = async () => {
    let keys = []
    try {
        console.log("juste avant getAllKeys")
        keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
    console.log("les clés", keys)
  }
    
    
  _storeData = async () => {
      try {
        console.log("juste avant setItem")
        await AsyncStorage.setItem('Table#1', 'table#1value');
      } catch (error) {
        // Error saving data
      }
  }
   
  _getData = async () => {
    try {
      console.log("juste avant getItem")
      const value = await AsyncStorage.getItem('totoclé');
      if (value !== null) {
        console.log('valeur de totoclé', value)
      }
    } catch (error) {
      // Error saving data
    }
}
 

    _essaiAsyncStorage = () => {
        console.log("Essai Async Storage");
        this._storeData();
    }

    
    
    _goSeriesScreen = () => {
        console.log("Go Series");

        this.props.dispatch({ type: "INITIATE-SERIES", value: 0 })
        
        if (G_InitState)  // Horrible verrue
          this.props.dispatch({ type: "INIT-QUESTION-STATS", value: 0 })

        this.props.dispatch({ type: "RAZ-SERIES", value: 0 })

        this.props.dispatch({ type: "RAZ-GIVEN-ANSWERS-LIST", value: 0 })
        
        this.props.dispatch({ type: "INITIATE-NEXT-QUESTION-OF-THE-SERIES", value: 0 })

//        this.props.navigation.navigate('SeriesScreen', {})   
        this.props.navigation.navigate('GlobalQuestionStatsScreen', {})
    }

    render() {
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
        AnswersList: state.HandleNextQuestionReducer.InitiateAnswersList,
        RightAnswer: state.HandleNextQuestionReducer.RightAnswer,       
        QuestionsCounter: state.HandleNextQuestionReducer.QuestionsCounter,

        SeriesQRList: state.InitiateQRSeriesReducer.SeriesQRList

    }
}

export default connect(mapStateToProps)(HomeScreen)
