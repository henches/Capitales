import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements'
import { connect } from 'react-redux'

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
        return(
          <View style={styles.main_view}>
            <View style={styles.title_view}>
                <Text style={styles.title_text}>CAPITALES</Text>
            </View>
            <View style={styles.stats_view}>
                <Text style={styles.stats_text}>Vous connaissez x capitales</Text>
            </View>
            <View style={styles.play_view}>
                    <Button title='Go mec' onPress={() => {this._goSeriesScreen()}}/>
            </View>
          </View>  
        )
    }
}

/*
            <View style={styles.play_view}>
                <Button title='JOUER' onPress={() => {this._goSeriesScreen()}}/>
            </View>                     

*/
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
})

const mapStateToProps = state => {
    return {
        AnswersList: state.AnswersList,
        RightAnswer: state.RightAnswer,       
        QuestionsCounter: state.QuestionsCounter  
//        State_SeriesQRList: state.State_SeriesQRList
    }
}

export default connect(mapStateToProps)(HomeScreen)