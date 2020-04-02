import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import { getStoredQuestionStats } from '../Helpers/StorageFunctions'
import { COLORS, Gstyles } from './Styles'
import { GetMaxPointsForZone, GetPointsForZone, GetOldPointsForZone } from '../Helpers/PointsManager'
import { ProgressSymbol } from './ProgressSymbol'



class HomeScreen extends React.Component {
    
    constructor() {
        console.log("HOME SCREEN CONSTRUCTOR DEBUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super();

        this._animateProgress = this._animateProgress.bind(this)


        let myProgressAnimForZone = []
        for (i = 0; i < 5; i++) 
            myProgressAnimForZone.push(new Animated.Value(0))
        

        this.state = {
            progressAnimForZone: myProgressAnimForZone,
            shouldAnimate: false ,
            myCounter: 0
        }

        // console.log("HOME SCREEN CONSTRUCTOR : myProgressAnimForZone = ", myProgressAnimForZone )
        // console.log("HOME SCREEN CONSTRUCTOR : state = ", this.state )

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
        console.log("HOME SCREEN DID MOUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => { 
            console.log("HOME SCREEN DIDFOCUS WORKS GREATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")

            this._animateProgress()
        });

    }
          
    componentWillUnmount() {
            clearInterval(this._interval);
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

        this.props.navigation.navigate('SeriesScreen', { indexInSeries: 0 })   
//        this.props.navigation.navigate('GlobalQuestionStatsScreen', {})
    }

    _animateProgress = () => {
        console.log("_animateProgress ");

        let pM = this.props.pM 
        if (pM != null) {
            for (let z = 0; z < 5; z++) {
                //console.log ("animateProgress start = ", pM[z].points/pM[z].maxPoints*100)
                this.state.progressAnimForZone[z].setValue(pM[z].oldPoints/pM[z].maxPoints*100)
            }
    
        }

        if (this.props.navigation.state.params == null) // Il n'y a pas de paramètres de navigation : c'est la première fois qu'on affiche Homme Screen -> pas besoin d'animation
            return

        if (this.props.navigation.state.params.lastScreen == null) // Le paramètre LastScreen n' pas été positionné : erreur dans le code
            return

        if (this.props.navigation.state.params.lastScreen.localeCompare("SeriesResultsScreen") != 0) // On revient d'un screen différent de SeriesResultsScreen
            return

        // Si on est arrivé jusqu'ici, c'est que l'on vient bien de l'écran SeriesResultsScreen
        console.log("_animateProgress - on vient bien de l'écran SeriesResultsScreen");

        const animationDuration = 5000

        for (let z = 0; z < 5; z++) {
            Animated.timing(
                this.state.progressAnimForZone[z],
                {
                  toValue: pM[z].points/pM[z].maxPoints*100,
                  duration: animationDuration, // Le temps est en milliseconds ici (3000ms = 3sec)
                  easing: Easing.linear
                }
              ).start( ) 
        }
        

        
        this.setState( { myCounter : pM[0].oldPoints } )
        this._interval = setInterval(() => {
            this.setState({ myCounter: this.state.myCounter+1 })
            if (this.state.myCounter == pM[0].points)
                clearInterval(this._interval)
          }, animationDuration/(pM[0].points-pM[0].oldPoints));

        

        // this.props.dispatch({ type: "QUERES_STATS-DISPLAYED" })   // positionne oldPoints = Point (puisque l'anmation a été réalisée)
    }


    render() {

    //        console.log("Go Séries : Qthis.props = ", this.props)
    //      console.log("Go Séries : QuestionStats List = ", this.props.QuestionStatsList)
    //     <Emoji name='flushed' style={{ fontSize: 30 }}/>

        // console.log("this.props = ", this.props)  
        console.log("HOME SCREEN RENDER - DEBUT ")  
        // console.log("this.props.pM = ", this.props.pM)  
        // console.log("this.props.QuestionStatsList = ", this.props.QuestionStatsList)  
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
            let pM = this.props.pM
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
            for (let z = 0; z < 5; z++) {
                //console.log ("animateProgress start = ", pM[z].oldPoints/pM[z].maxPoints*100)
                this.state.progressAnimForZone[z].setValue(pM[z].oldPoints/pM[z].maxPoints*100)
            }
 

        }

        return (
            <View style={Gstyles.main_view}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold'}}>CAPITALES</Text>
                </View>
                <ProgressSymbol myFlex={ 1 } myWidth={ this.state.progressAnimForZone[G_Monde].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) } 
                            zone={ "Monde" } points={ this.state.myCounter } maxPoints={ maxPointsWorld }/>
                <ProgressSymbol myFlex={ 1 } myWidth={ this.state.progressAnimForZone[G_Europe].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) } 
                            zone={ "Europe" } points={ pointsEurope } maxPoints={ maxPointsEurope }/>
                <ProgressSymbol myFlex={ 1 } myWidth={ this.state.progressAnimForZone[G_Afrique].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) } 
                            zone={ "Afrique" } points={ pointsAfrique } maxPoints={ maxPointsAfrique }/>
                <ProgressSymbol myFlex={ 1 } myWidth={ this.state.progressAnimForZone[G_AsiePacif].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) } 
                            zone={ "Asie/Pacif" } points={ pointsAsiePacif } maxPoints={ maxPointsAsiePacif }/>
                <ProgressSymbol myFlex={ 1 } myWidth={ this.state.progressAnimForZone[G_Ameriques].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) } 
                            zone={ "Amériques" } points={ pointsAmeriques } maxPoints={ maxPointsAmeriques }/>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._goSeriesScreen() }}>
                            <Text style={Gstyles.button_text}>JOUER</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._animateProgress() }}>
                            <Text style={Gstyles.button_text}>Tester</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._testAnim2() }}>
                            <Text style={Gstyles.button_text}>Tester2</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>TOTO {this.state.myCounter} </Text>
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
        pM: state.HandleQueresStatsReducer.pM
    }
}

export default connect(mapStateToProps)(HomeScreen)
