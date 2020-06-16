import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { COLORS, Gstyles } from './Styles'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils'
import { QuestionLevelSymbol } from './QuestionLevelSymbol'



class SeriesResultsScreen extends React.Component {
    static navigationOptions = {
        headerShown: false,
    }
    
    constructor() {
        console.log('SERIES RESULTS SCREEN CONSTRUCTOR')
        super()
     }

    componentDidMount() {
        console.log("SERIES RESULTS SCREEN DID MOUNT !!!!!!!!)")

    }


    
    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
       this.props.navigation.navigate('GlobalQuestionStatsScreen', {})   
    }

    _goHomeScreen = () => {
        let { routeName } = this.props.navigation.state;      
        console.log("On va à l'écran Home routeName = ", routeName)
        this.props.navigation.navigate('HomeScreen', { lastScreen: routeName })   
    }

    _calculateNbOfRightResponses = (queresSeries) => {
        let nb = 0
        for (var i=0; i < queresSeries.length; i++) {
            if (queresSeries[i].isResponseRight)
                nb++
        }
        return nb
    }

    _calculatePointsWon = (queresSeries) => {
        let pointsWon = 0
        for (var i=0; i < queresSeries.length; i++) {
            pointsWon += queresSeries[i].pointsWon
        }
        return pointsWon
    }


    render() {
        // console.log("Serie de réponses [1] ", this.props.GivenResponsesList[1])
        nbRightResponses = this._calculateNbOfRightResponses(this.props.QueresSeries)
        ratio = nbRightResponses / this.props.QueresSeries.length
        pointsWon = this._calculatePointsWon(this.props.QueresSeries)
        cheeringText = ""
        scoreProgressText = "Votre score s'améliore de "+pointsWon+" points !"
        if (ratio == 0) {
            cheeringText = "Aucune bonne réponse : essayez encore !"
            scoreProgressText = "Pas d'amélioration du score"
        } 
        else if (ratio < 0.5) {
            cheeringText = "C'est encourageant !"
        }
        else {
            if (ratio == 1)
                cheeringText = "Carton plein !! BRAVO !!!"
            else
                cheeringText = "Super résultat ! Bravo !!"
        }
        console.log("nbre de bonnes réponses / nombre total de réponses ", nbRightResponses, " / ", this.props.QueresSeries.length)
        return(
                <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, marginTop: verticalScale(20) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: scale(25), fontWeight: 'normal'}}>RESULTATS</Text>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: scale(20) }}>{ nbRightResponses } bonnes réponses</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: scale(20) }}>{ cheeringText }</Text>
                    </View>
                    <Divider/>
                    <View style={{ flex: 6, flexDirection: 'column', justifyContent: 'center'}}>
                        <FlatList
                            data={this.props.QueresSeries}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                                                backgroundColor: item.isResponseRight ? COLORS.okButtonBackgroundColor : COLORS.nokButtonBackgroundColor, 
                                                padding: scale(5), marginVertical: verticalScale(2), marginHorizontal: scale(8) }}>
                                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: scale(15), color: 'white' }}> {item.state} </Text>
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: scale(15), fontWeight: 'bold', color: 'white' }}> { item.isResponseRight ? item.capital : item.givenResponse }</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <QuestionLevelSymbol squareDim= { 8 } level= { item.afterResponseTotalPoints }/>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Divider/>
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  
                        <Text style={{ fontSize: scale(20)}}>{ scoreProgressText }</Text>
                    </View>
                   <Divider/>
                   <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}  onPress={() => { this._goHomeScreen() }}>
                                <Icon
                                    containerStyle={{ marginLeft: scale(10) }}
                                    size={ 30 }
                                    type='ionicon'
                                    name='ios-home'
                                    color='white'
                                />
                        </TouchableOpacity>
                    </View>
                </View>  
        )
    }
}

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        marginTop: verticalScale(30)
    },
    title_view: {
        flex:1
    },
    title_text: {
        height: verticalScale(50)
    },
    stats_view: {
        flex:1
    },
    stats_text: {
        height: verticalScale(50)
    },
    play_view: {
        flex:1
    },
    play_button: {
        height: verticalScale(50)
    },
    progressBar: {
        height: verticalScale(20),
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    button: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: scale(5)
    },

})



const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries
    }
}

export default connect(mapStateToProps)(SeriesResultsScreen)
