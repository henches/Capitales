import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'

class HomeScreen extends React.Component {
    
    _goSeriesScreen = () => {
        console.log("Go Series");

        const actionIS = { type: "INITIATE-SERIES", value: 0 }
        this.props.dispatch(actionIS)
        
        const actionRNQL = { type: "RAZ-SERIES", value: 0 }
        this.props.dispatch(actionRNQL)

        const actionRGAL = { type: "RAZ-GIVEN-ANSWERS-LIST", value: 0 }
        this.props.dispatch(actionRGAL)
        
        const actionINQ = { type: "INITIATE-NEXT-QUESTION-OF-THE-SERIES", value: 0 }
        this.props.dispatch(actionINQ)

        this.props.navigation.navigate('SeriesScreen', {})   
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