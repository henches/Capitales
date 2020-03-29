import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import Emoji from 'react-native-emoji'
import { getStoredQuestionStats } from '../Helpers/StorageFunctions'
import { COLORS, Gstyles } from './Styles'
import { GetMaxPointsForZone, GetPointsForZone } from '../Helpers/PointsManager'
import { ProgressSymbol } from './ProgressSymbol'



class HomeScreen extends React.Component {
    
    constructor() {
        super();
        this.state = {
            horizontalPosition: new Animated.Value(0)
        }
        if (G_InitState) {  // Horrible verrue
              console.log("HOME SCREEN CONSTRUCTOR")
              getStoredQuestionStats()  // Récupère la liste des Questions Stats
            .then(myList => {
              console.log("HOME SCREEN CONSTRUCTOR APRES GetSTORED")
              G_InitialQuestionStatsList = myList
              this.props.dispatch({ type: "QUERES_STATS-INITIATE", value: 0 })
            })
            G_InitState = false // Horrible verrue
            return null
        }

    }
    
    componentDidMount() {
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

    _testAnim = () => {
        console.log("_testAnim");

        Animated.timing(
            this.state.horizontalPosition,
            {
              toValue: this.state.ZonesData[0].points/this.state.ZonesData[0].maxPoints*100+100,
              duration: 500, // Le temps est en milliseconds ici (3000ms = 3sec)
              easing: Easing.bounce
            }
          ).start() // N'oubliez pas de lancer votre animation avec la fonction start()
  

    }

    _testAnim2 = () => {
        console.log("_testAnim");

        Animated.timing(
            this.state.horizontalPosition,
            {
              toValue: 100,
              duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
              easing: Easing.linear
            }
          ).start() // N'oubliez pas de lancer votre animation avec la fonction start()
  

    }


    render() {

    //        console.log("Go Séries : Qthis.props = ", this.props)
    //      console.log("Go Séries : QuestionStats List = ", this.props.QuestionStatsList)
    //     <Emoji name='flushed' style={{ fontSize: 30 }}/>

        // console.log("this.props = ", this.props)  
        console.log("HOME SCREEN RENDER - DEBUT ")  
        console.log("this.props.pM = ", this.props.pM)  
        console.log("this.props.QuestionStatsList = ", this.props.QuestionStatsList)  
        // console.log("GetMaxPointsForZone(this.state.pm, G_Monde) = ", GetMaxPointsForZone(this.state.pM, G_Monde))  
        let maxPointsWorld = 0 // Valeurs par défaut dans le cas ou le render est fait avant que l'initialisation de QuestionsStatList et pM ne soit réalisée
        let pointsWorld = 0
        let maxPointsEurope = 0 
        let pointsEurope = 0
        let maxPointsAfrique = 0 
        let pointsAfrique = 0
        let maxPointsAmeriques = 0 
        let pointsAmeriques = 0
        let maxPointsAsiePacif = 0 
        let pointsAsiePacif = 0
        if (this.props.pM != null) {  
            maxPointsWorld = GetMaxPointsForZone(this.props.pM, G_Monde)
            pointsWorld = GetPointsForZone(this.props.pM, G_Monde)
            maxPointsEurope = GetMaxPointsForZone(this.props.pM, G_Europe)
            pointsEurope = GetPointsForZone(this.props.pM, G_Europe)
            maxPointsAfrique = GetMaxPointsForZone(this.props.pM, G_Afrique)
            pointsAfrique = GetPointsForZone(this.props.pM, G_Afrique)
            maxPointsAmeriques = GetMaxPointsForZone(this.props.pM, G_Ameriques)
            pointsAmeriques = GetPointsForZone(this.props.pM, G_Ameriques)
            maxPointsAsiePacif = GetMaxPointsForZone(this.props.pM, G_AsiePacif)
            pointsAsiePacif = GetPointsForZone(this.props.pM, G_AsiePacif)
        }
        return (
            <View style={Gstyles.main_view}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold'}}>CAPITALES</Text>
                </View>
                <ProgressSymbol myFlex={ 1 } zone={ "Europe" } points={ pointsEurope } maxPoints={ maxPointsEurope }/>
                <ProgressSymbol myFlex={ 1 } zone={ "Afrique" } points={ pointsAfrique} maxPoints={ maxPointsAfrique}/>
                <ProgressSymbol myFlex={ 1 } zone={ "Ameriques" } points={ pointsAmeriques } maxPoints={ maxPointsAmeriques }/>
                <ProgressSymbol myFlex={ 1 } zone={ "AsiePacif" } points={ pointsAsiePacif } maxPoints={ maxPointsAsiePacif }/>
                <ProgressSymbol myFlex={ 1 } zone={ "MONDE" } points={ pointsWorld } maxPoints={ maxPointsWorld }/>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Score</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', paddingTop: 0, paddingBottom: 0, paddingRight: '5%', paddingLeft: '5%'}}>
                            <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: 11, width:"100%", alignSelf: 'center'}}>
                                <Animated.View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, 
                                    width: this.state.horizontalPosition }}></Animated.View>         
                            </View>      
                    </View>
                    <View style={{ flexDirection: 'row', paddingRight: '5%', paddingLeft: '5%' }}>
                        <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'flex-start'}}>
                            <Text style={{ fontSize: 12 }}>0</Text>
                        </View>
                        <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'center'}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>150</Text>
                        </View>
                        <View style={{ flexDirection: 'row',  flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={{ fontSize: 12 }}>{maxPointsWorld}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._goSeriesScreen() }}>
                            <Text style={Gstyles.button_text}>JOUER</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._testAnim() }}>
                            <Text style={Gstyles.button_text}>Tester</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._testAnim2() }}>
                            <Text style={Gstyles.button_text}>Tester2</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}> 
                    <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this._goStatView() }}>
                                <Text style={[Gstyles.button_text, { paddingLeft: 15, paddingLeft: 15,fontSize: 20, color:'white' }]}>Statistiques</Text>
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
        pM: state.HandleQueresStatsReducer.pM,
        QueresSeries: state.HandleQueresSeriesReducer.QueresSeries,
    }
}

export default connect(mapStateToProps)(HomeScreen)
