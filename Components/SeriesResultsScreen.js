import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import COLORS from './Styles'


class SeriesResultsScreen extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: (
          <Icon
            containerStyle={{ marginLeft: 10 }}
            type='ionicon'
            name='ios-home'
            color='blue'
//            onPress={() => navigation.navigate('HomeScreen', {}) }
          />
        )
    }
    
    
    constructor() {
        super();
        global.RunningSeries = [];
        global.G_SeriesLength=3;
    }
 
    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
        this.props.navigation.navigate('GeneralStatisticsScreen', {})   
    }

    _goHomeScreen = () => {
        console.log("On va à l'écran des stats du joueur")
        this.props.navigation.navigate('HomeScreen', {})   
    }

    _calculateNumberOfRightAnswers = (givenAnswersList) => {
        let nb = 0
        for (var i=0; i < givenAnswersList.length; i++) {
            if (givenAnswersList[i].isAnswerRight)
                nb++
        }
        return nb
    }

 //   <Emoji type="coffee" style={{fontSize: 50}} />

    render() {
        console.log("Serie de réponses [1] ", this.props.GivenAnswersList[1])
        nbRightAnswers = this._calculateNumberOfRightAnswers(this.props.GivenAnswersList)
        console.log("nbre de bonnes répones / nombre total de réponses ", nbRightAnswers, " / ", this.props.GivenAnswersList.length)
        return(
                <View style={{ flex: 3, backgroundColor: COLORS.generalBackgroundColor }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25 }}>BRAVO !!</Text>
                        <Text style={{ fontSize: 20}}>{nbRightAnswers} bonnes réponses</Text>
                    </View>
                    <Divider/>
                    <View style={{ flex: 5 }}>
                        <FlatList
                            data={this.props.GivenAnswersList}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: item.isAnswerRight ? COLORS.okButtonBackgroundColor : COLORS.nokButtonBackgroundColor, 
                                                padding: 5, marginVertical: 2, marginHorizontal: 8 }}>
                                    <Emoji name={item.isAnswerRight ? 'ballot_box_with_check': 'flushed' } style={{ fontSize: 30 }}/>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> {item.rightAnswer.state} </Text>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> {item.givenAnswer.capital}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Divider/>
                    <View style={{ flex: 2 }}>
                        <Button title='Go' onPress={() => { this._goHomeScreen() }}/>
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
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
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
        GivenAnswersList: state.HandleAnswersList.GivenAnswersList
    }
}

export default connect(mapStateToProps)(SeriesResultsScreen)
