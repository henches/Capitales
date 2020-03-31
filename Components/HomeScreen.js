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
            progressAnimForZone: myProgressAnimForZone 
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
        console.log("_animateProgress this.props = ", this.props);


        for (i = 0; i < 5; i++) {
        }

        pM = this.props.pM 

        if (pM == null) 
            return

        
        this.state.progressAnimForZone[0].setValue(pM.zones[0].oldPointsWorld/pM.zones[0].maxPointsWorld*100)


        Animated.timing(
            this.state.progressAnimForZone[0],
            {
//              toValue: pointsWorld/maxPointsWorld*100,
              toValue: pM.zones[0].pointsWorld/pM.zones[0].maxPointsWorld*100,
              duration: 2000, // Le temps est en milliseconds ici (3000ms = 3sec)
              easing: Easing.bounce
            }
          ).start() // N'oubliez pas de lancer votre animation avec la fonction start()
  

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
            // this.props.dispatch({ type: "QUERES_STATS-DISPLAYED" })   // Met le flag à true indiquant que le premier affichage a été fait (et donc que l'animation a été réalisée)
        }

        //<ProgressSymbol myFlex={ 1 } myWidth={ this.state.progressAnimForZone[0].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'],})  } zone={ "MONDE" } points={ pointsWorld } maxPoints={ maxPointsWorld }/>
       

        return (
            <View style={Gstyles.main_view}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold'}}>CAPITALES</Text>
                </View>
                <ProgressSymbol myFlex={ 1 } myWidth={ pointsWorld/maxPointsWorld*100+"%" } points={ pointsWorld } maxPoints={ maxPointsWorld }/>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Score</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', paddingTop: 0, paddingBottom: 0, paddingRight: '5%', paddingLeft: '5%'}}>
                            <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: 11, width:"100%", alignSelf: 'center'}}>
                                <Animated.View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, height: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, 
                                    width: this.state.progressAnimForZone[0] }}></Animated.View>         
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
