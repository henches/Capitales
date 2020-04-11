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


        this.state = {
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
            this._animateProgress(true)
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

  
   _animateProgress = (test) => {
        console.log("_animateProgress ");

        let pM = this.props.pM
        if (pM == null) 
            return

        console.log("_animateProgress PM is not null ");


        this.pS1._animateProgress()


        if (this.props.navigation.state.params == null) // Il n'y a pas de paramètres de navigation : c'est la première fois qu'on affiche Homme Screen -> pas besoin d'animation
            return

        if (this.props.navigation.state.params.lastScreen == null) // Le paramètre LastScreen n' pas été positionné : erreur dans le code
            return

        if (this.props.navigation.state.params.lastScreen.localeCompare("SeriesResultsScreen") != 0) // On revient d'un screen différent de SeriesResultsScreen
            return


    }


    _onEndAnim11 =() => {
        this.pS1._animateProgress2()
    }

    _onEndAnim12 =() => {
        this.pS1._animateProgress3()
    }

    _onEndAnim13 =() => {
        this.pS2._animateProgress()
    }

    _onEndAnim21 =() => {
        this.pS2._animateProgress2()
    }

    _onEndAnim22 =() => {
        this.pS2._animateProgress3()
    }

    _onEndAnim23 =() => {
        this.pS3._animateProgress()
    }

    _onEndAnim31 =() => {
        this.pS3._animateProgress2()
    }

    _onEndAnim32 =() => {
        this.pS3._animateProgress3()
    }

    _onEndAnim33 =() => {
        this.pS4._animateProgress()
    }

    _onEndAnim41 =() => {
        this.pS4._animateProgress2()
    }

    _onEndAnim42 =() => {
        this.pS4._animateProgress3()
    }

    _onEndAnim43 =() => {
        this.pS0._animateProgress()
    }

    _onEndAnim01 =() => {
        this.pS0._animateProgress2()
    }

    _onEndAnim02 =() => {
        this.pS0._animateProgress3()
    }

    _onEndAnim03 =() => { // End of animations
        this.props.dispatch({ type: "QUERES_STATS-DISPLAYED" })   // positionne oldPoints = Point (puisque l'anmation a été réalisée)
    }



  

    render() {

    //        console.log("Go Séries : Qthis.props = ", this.props)
    //      console.log("Go Séries : QuestionStats List = ", this.props.QuestionStatsList)
    //     <Emoji name='flushed' style={{ fontSize: 30 }}/>

        // console.log("this.props = ", this.props)  
        console.log("HOME SCREEN RENDER ")  
        // console.log("this.props.pM = ", this.props.pM)  
        // console.log("this.props.QuestionStatsList = ", this.props.QuestionStatsList)  
        // console.log("GetMaxPointsForZone(this.state.pm, G_Monde) = ", GetMaxPointsForZone(this.state.pM, G_Monde))  
        let maxPointsWorld = 0 // Valeurs par défaut dans le cas ou le render est fait avant que l'initialisation de QuestionsStatList et pM ne soit réalisée
        let pointsWorld = 0
        let oldPointsWorld = 0
        let maxPointsEurope = 0 
        let pointsEurope = 0
        let oldPointsEurope = 0
        let maxPointsAfrique = 0 
        let pointsAfrique = 0
        let oldPointsAfrique = 0
        let maxPointsAmeriques = 0 
        let pointsAmeriques = 0
        let oldPointsAmeriques = 0
        let maxPointsAsiePacif = 0 
        let pointsAsiePacif = 0
        let oldPointsAsiePacif = 0
        if (this.props.pM != null) {
            console.log("HOME SCREEN RENDER PM is not NULL")
            let pM = this.props.pM
            
            maxPointsWorld = GetMaxPointsForZone(pM, G_Monde)
            pointsWorld = GetPointsForZone(pM, G_Monde)
            oldPointsWorld = GetOldPointsForZone(pM, G_Monde)

            maxPointsEurope = GetMaxPointsForZone(pM, G_Europe)
            pointsEurope = GetPointsForZone(pM, G_Europe)
            oldPointsEurope = GetOldPointsForZone(pM, G_Europe)

            maxPointsAfrique = GetMaxPointsForZone(pM, G_Afrique)
            pointsAfrique = GetPointsForZone(pM, G_Afrique)
            oldPointsAfrique = GetOldPointsForZone(pM, G_Afrique)

            maxPointsAmeriques = GetMaxPointsForZone(pM, G_Ameriques)
            pointsAmeriques = GetPointsForZone(pM, G_Ameriques)
            oldPointsAmeriques = GetOldPointsForZone(pM, G_Ameriques)

            maxPointsAsiePacif = GetMaxPointsForZone(pM, G_AsiePacif)
            pointsAsiePacif = GetPointsForZone(pM, G_AsiePacif)
            oldPointsAsiePacif = GetOldPointsForZone(pM, G_AsiePacif)

            // Pour tester l'animation
            pointsWorld = 45
            oldPointsWorld = 25
            pointsEurope = 12
            oldPointsEurope = 10
            pointsAfrique = 16
            oldPointsAfrique = 16
            pointsAmeriques = 20
            oldPointsAmeriques = 18
            pointsAsiePacif = 5
            oldPointsAsiePacif = 3

            this.pS0._initProgressAnimation(oldPointsEurope, maxPointsEurope)
            /*
            this.pS2._initProgressAnimation(oldPointsAfrique, maxPointsAfrique)
            this.pS3._initProgressAnimation(oldPointsAmeriques, maxPointsAmeriques)
            this.pS4._initProgressAnimation(oldPointsAsiePacif, maxPointsAsiePacif)
            this.pS0._initProgressAnimation(oldPointsWorld, maxPointsWorld)
            */

        }


        /* Pour tester l'animation
                        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this.pS1._animateProgress() }}>
                            <Text style={Gstyles.button_text}>Appel vers le component 1</Text>
                    </TouchableOpacity>
                </View>

        */
       /*
                       <ProgressSymbol myFlex={ 1 } zone={ "Europe" } points={ pointsEurope } oldPoints={ oldPointsEurope }  maxPoints={ maxPointsEurope }
                            onEndAnim1={ this._onEndAnim11 } onEndAnim2={ this._onEndAnim12 } onEndAnim3={ this._onEndAnim13 } ref={ ProgressSymbol => { this.pS1 = ProgressSymbol }} />
                <ProgressSymbol myFlex={ 1 } zone={ "Afrique" } points={ pointsAfrique } oldPoints={ oldPointsAfrique }  maxPoints={ maxPointsAfrique }
                            onEndAnim1={ this._onEndAnim21 } onEndAnim2={ this._onEndAnim22 } onEndAnim3={ this._onEndAnim23 } ref={ ProgressSymbol => { this.pS2 = ProgressSymbol }} />
                <ProgressSymbol myFlex={ 1 } zone={ "Ameriques" } points={ pointsAmeriques } oldPoints={ oldPointsAmeriques }  maxPoints={ maxPointsAmeriques }
                            onEndAnim1={ this._onEndAnim31 } onEndAnim2={ this._onEndAnim32 } onEndAnim3={ this._onEndAnim33 } ref={ ProgressSymbol => { this.pS3 = ProgressSymbol }} />
                <ProgressSymbol myFlex={ 1 } zone={ "AsiePacif" } points={ pointsAsiePacif } oldPoints={ oldPointsAsiePacif }  maxPoints={ maxPointsAsiePacif }
                            onEndAnim1={ this._onEndAnim41 } onEndAnim2={ this._onEndAnim42 } onEndAnim3={ this._onEndAnim43 } ref={ ProgressSymbol => { this.pS4 = ProgressSymbol }} />

       */

       // onPress={() => { this._goStatView() }}>

        return (
            <View style={Gstyles.main_view}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold'}}>CAPITALES</Text>
                </View>
                <ProgressSymbol myFlex={ 1 } zone={ "MONDE" } points={ pointsWorld } oldPoints={ oldPointsWorld }  maxPoints={ maxPointsWorld }
                            onEndAnim1={ this._onEndAnim01 } onEndAnim2={ this._onEndAnim02 } onEndAnim3={ this._onEndAnim03 } ref={ ProgressSymbol => { this.pS0 = ProgressSymbol }} />
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>   
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._goSeriesScreen() }}>
                            <Text style={Gstyles.button_text}>JOUER</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}> 
                    <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this.pS0._animateProgress() }}>
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
