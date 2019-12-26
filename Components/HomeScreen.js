import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'

class HomeScreen extends React.Component {
    
   constructor() {
        super();   
    
    }

    _goSeriesScreen = () => {
        console.log("Go Series");
        const action = { type: "INITIATE-NEXT-QUESTION", value: 0 }
        this.props.dispatch(action)
        this.props.navigation.navigate('SeriesScreen', {})   
    }

    render() {
        const im = {
            varsovie : 'pologne',
            rome: 'italie'
        }
        console.log("ZZZZZZZZZZZZZZZZZZZZ   IM  ZZZZZZZZZZZZZZZZZZZZZZZZZ  im[rome]=", im['rome'])
     
        return(
          <View style={styles.main_view}>
            <View style={styles.title_view}>
                <Text style={styles.title_text}>CAPITALES</Text>
            </View>
            <View style={styles.stats_view}>
                <Text style={styles.stats_text}>Vous connaissez x capitales</Text>
                <Emoji name='flushed' style={{ fontSize: 30 }}/>
                <Emoji name='sunglasses' style={{ fontSize: 30 }}/>
            </View>
            <View style={styles.play_view}>
                <TouchableOpacity style={styles.button}
                        onPress={() => { this._goSeriesScreen() }}>
                        <Text style={styles.button_text}>JOUER</Text>
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
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: 5
    },

})

const mapStateToProps = state => {
    return {
        AnswersList: state.InitiateNextQuestion.InitiateAnswersList,
        RightAnswer: state.InitiateNextQuestion.RightAnswer,       
        QuestionsCounter: state.InitiateNextQuestion.QuestionsCounter  
//        State_SeriesQRList: state.State_SeriesQRList

    }
}

export default connect(mapStateToProps)(HomeScreen)