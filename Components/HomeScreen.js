import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import { getStoredQuestionStats } from '../Helpers/StorageFunctions'
import { getStoredUserPrefs } from '../Helpers/StorageFunctions'
import { COLORS, Gstyles } from './Styles'
import { IsPlayerLevelCompleted, GetMaxPointsForZone, GetPointsForZone, GetOldPointsForZone } from '../Helpers/PointsManager'
import { ProgressSymbol } from './ProgressSymbol'
import { ProgressLevelSymbol } from './ProgressLevelSymbol'
import { LevelSymbol } from './LevelSymbol'
import { YellowBox } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils'
import { Icon } from 'react-native-elements'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);  // POur masquer un warning de React Native



class HomeScreen extends React.Component {
    
    constructor(props) {
        console.log("HOME SCREEN CONSTRUCTOR DEBUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super(props);

    
        this._animateProgress = this._animateProgress.bind(this)
        this._onEndAnim1 = this._onEndAnim1.bind(this)
        this._onEndAnim2 = this._onEndAnim2.bind(this)
        this._onEndAnim3 = this._onEndAnim3.bind(this)
        this._onEndAnim4 = this._onEndAnim4.bind(this)
        this._onEndAnim0 = this._onEndAnim0.bind(this)

        if (G_InitState) {  // Horrible verrue
            console.log("HOME SCREEN CONSTRUCTOR")
            getStoredQuestionStats()  // Récupère la liste des Questions Stats
                .then(myList => {
                    console.log("HOME SCREEN CONSTRUCTOR APRES GetSTOREDQuestionsStats")
                    G_InitialQuestionStatsList = myList
                    this.props.dispatch({ type: "QUERES_STATS-INITIATE", value: 0 })
                    this._initProgressAnimation()
                    })
            getStoredUserPrefs()  // Récupère la liste des Questions Stats
                .then(myUserPrefs => {
                    console.log("HOME SCREEN CONSTRUCTOR APRES GetSTOREDUserPrefs")
                    this.props.dispatch({ type: "USER_PREFS-INITIATE", value: myUserPrefs })
                    })
            G_InitState = false // Horrible verrue

            return null
        }
    }

    state = {
        modalVisible: false // popup pour indiquer le passage d'un niveau a un autre
    }

    static navigationOptions = {
        headerShown: false,
    }



    
    componentDidMount() {
        console.log("HOME SCREEN DID MOUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")


        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => { 
            console.log("HOME SCREEN DIDFOCUS WORKS GREATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
              this._initProgressAnimation()
              this._animateProgress()
        });

    }
          

    _goStatView = () => {
        console.log("On va à l'écran des stats du joueur")
       this.props.navigation.navigate('GlobalQuestionStatsScreen', {})   
    }

    _goLevelView = () => {
        console.log("On va à l'écran des niveaux du joueur")
       this.props.navigation.navigate('LevelScreen', {})   
    }


    _goSeriesScreen = () => {
        console.log("Go Series");
        
        this.props.dispatch({ type: "QUERES_SERIES-INITIATE", value: { questionStatList: this.props.QuestionStatsList, pM: this.props.pM, playerLevel: this.props.PlayerLevel }})

        this.props.navigation.navigate('SeriesScreen', { indexInSeries: 0 })   
//        this.props.navigation.navigate('GlobalQuestionStatsScreen', {})
    }

    _initProgressAnimation() {
        console.log("_initProgressAnimation ");
        let pM = this.props.pM
        if (pM == null) 
            return

        this.pS1._initProgressAnimation(GetOldPointsForZone(pM, G_Europe, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Europe, this.props.PlayerLevel))
        this.pS2._initProgressAnimation(GetOldPointsForZone(pM, G_Afrique, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Afrique, this.props.PlayerLevel))
        this.pS3._initProgressAnimation(GetOldPointsForZone(pM, G_Ameriques, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Ameriques, this.props.PlayerLevel))
        this.pS4._initProgressAnimation(GetOldPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel))
        this.pS0._initProgressAnimation(GetOldPointsForZone(pM, G_Monde, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Monde, this.props.PlayerLevel))
        this.pS00._initProgressAnimation(GetOldPointsForZone(pM, G_Monde, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Monde, this.props.PlayerLevel))
    }

    _animateProgress = () => {
        console.log("_animateProgress ");

        let pM = this.props.pM
        if (pM == null) 
            return

        console.log("_animateProgress PM is not null ");


        if (this.props.navigation.state.params == null) // Il n'y a pas de paramètres de navigation : c'est la première fois qu'on affiche Homme Screen -> pas besoin d'animation
            return

        if (this.props.navigation.state.params.lastScreen == null) // Le paramètre LastScreen n' pas été positionné : erreur dans le code
            return

        if (this.props.navigation.state.params.lastScreen.localeCompare("SeriesResultsScreen") != 0) // On revient d'un screen différent de SeriesResultsScreen
            return

        this.pS1._animateProgress()


    }


    _onEndAnim1 =() => { 
        this.pS2._animateProgress() 
    }
    
    _onEndAnim2 =() => { this.pS3._animateProgress() }
    _onEndAnim3 =() => { this.pS4._animateProgress() }
    _onEndAnim4 =() => { this.pS0._animateProgress(); this.pS00._animateProgress() }
    _onEndAnim0 =() => { // End of animations
        this.props.dispatch({ type: "QUERES_STATS-DISPLAYED" })   // positionne oldPoints = Point (puisque l'anmation a été réalisée)
        if (IsPlayerLevelCompleted(this.props.pM, this.props.PlayerLevel)) {
            this.setState({ modalVisible: true })
            this.props.dispatch({ type: "QUERES_STATS-INCREMENT_PLAYER_LEVEL" })   // positionne oldPoints = Point (puisque l'animation a été réalisée)
            this._initProgressAnimation()
        }
    }

    _hideNextPlayerLevelPopup = () => {
       this.setState({ modalVisible: false })
    }

    _goConfigScreen() {
        console.log("Go Config");
        
        this.props.navigation.navigate('ConfigScreen')   
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
                /* POur tester l'animation
                pointsWorld = GetPointsForZone(this.props.pM, G_Monde)
                oldPointsWorld = GetOldPointsForZone(this.props.pM, G_Monde)
                */
                maxPointsWorld = GetMaxPointsForZone(pM, G_Monde, this.props.PlayerLevel)
                pointsWorld = GetPointsForZone(pM, G_Monde, this.props.PlayerLevel)
                oldPointsWorld = GetOldPointsForZone(pM, G_Monde, this.props.PlayerLevel)
                // pointsWorld = 45
                // oldPointsWorld = 40
    
                maxPointsEurope = GetMaxPointsForZone(pM, G_Europe, this.props.PlayerLevel)
                pointsEurope = GetPointsForZone(pM, G_Europe, this.props.PlayerLevel)
                oldPointsEurope = GetOldPointsForZone(pM, G_Europe, this.props.PlayerLevel)
                //pointsEurope = 12
                //oldPointsEurope = 10
    
                maxPointsAfrique = GetMaxPointsForZone(pM, G_Afrique, this.props.PlayerLevel)
                pointsAfrique = GetPointsForZone(pM, G_Afrique, this.props.PlayerLevel)
                oldPointsAfrique = GetOldPointsForZone(pM, G_Afrique, this.props.PlayerLevel)
                //pointsAfrique = 16
                //oldPointsAfrique = 16
    
                maxPointsAmeriques = GetMaxPointsForZone(pM, G_Ameriques, this.props.PlayerLevel)
                pointsAmeriques = GetPointsForZone(pM, G_Ameriques, this.props.PlayerLevel)
                oldPointsAmeriques = GetOldPointsForZone(pM, G_Ameriques, this.props.PlayerLevel)
                //pointsAmeriques = 20
                //oldPointsAmeriques = 18
    
                maxPointsAsiePacif = GetMaxPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel)
                pointsAsiePacif = GetPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel)
                oldPointsAsiePacif = GetOldPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel)
                //pointsAsiePacif = 5
                //oldPointsAsiePacif = 3
    
    
            }
    
    
            /* Pour tester l'animation
                            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>  
                        <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this.pS1._animateProgress() }}>
                                <Text style={Gstyles.button_text}>Appel vers le component 1</Text>
                        </TouchableOpacity>
                    </View>
    
            */
    
            popupBackgroundColor = COLORS.okBackgroundColor
            popupTextColor = COLORS.okTextColor
            popupButtonBackgroundColor = COLORS.okButtonBackgroundColor
            popupButtonBorderBottomColor = COLORS.okButtonBorderBottomColor

            playerLevel = this.props.PlayerLevel

            return (
                <View style={Gstyles.main_view}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:'100%', paddingHorizontal: '5%' }} >
                        <Text></Text>
                        <Text style={{ fontSize: scale(30), fontWeight: 'normal'}}>CAPITALES</Text>
                        <TouchableOpacity 
                            onPress={() => { this._goConfigScreen() }}>
                            <Icon name='cog' type='font-awesome' size={ 25 }/>
                        </TouchableOpacity>
                    </View> 
                    <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                        <ProgressLevelSymbol label={ PlayerLevelStyle[playerLevel].text } points={ pointsWorld } oldPoints={ oldPointsWorld }  maxPoints={ maxPointsWorld }
                                    backgroundColor={ PlayerLevelStyle[playerLevel].backgroundColor } foregroundColor={ PlayerLevelStyle[playerLevel+2].backgroundColor }
                                    onEndAnim3={ this._onEndAnim0 } ref={ ProgressLevelSymbol => { this.pS00 = ProgressLevelSymbol }} />
                    </View> 
                    <View style={{ flex: 3, borderStyle: 'solid', borderColor : 'black', borderWidth: 1, borderRadius: 5, marginLeft: '3%', marginRight: '3%' }}>
                        <ProgressSymbol myFlex={ 1 } zone={ "Europe" } points={ pointsEurope } oldPoints={ oldPointsEurope }  maxPoints={ maxPointsEurope }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim1 } ref={ ProgressSymbol => { this.pS1 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 1 } zone={ "Afrique" } points={ pointsAfrique } oldPoints={ oldPointsAfrique }  maxPoints={ maxPointsAfrique }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim2 } ref={ ProgressSymbol => { this.pS2 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 1 } zone={ "Ameriques" } points={ pointsAmeriques } oldPoints={ oldPointsAmeriques }  maxPoints={ maxPointsAmeriques }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim3 } ref={ ProgressSymbol => { this.pS3 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 1 } zone={ "AsiePacif" } points={ pointsAsiePacif } oldPoints={ oldPointsAsiePacif }  maxPoints={ maxPointsAsiePacif }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim4 } ref={ ProgressSymbol => { this.pS4 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 2 } zone={ "MONDE" } points={ pointsWorld } oldPoints={ oldPointsWorld }  maxPoints={ maxPointsWorld }
                                    isTypeFull={ true } onEndAnim3={ this._onEndAnim0 } ref={ ProgressSymbol => { this.pS0 = ProgressSymbol }} />
                    </View>
                    <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }}>   
                        <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this._goSeriesScreen() }}>
                                <Text style={Gstyles.button_text}>JOUER</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> 
                        <TouchableOpacity style={Gstyles.button}
                                    onPress={() => { this._goStatView() }}>
                                    <Text style={[Gstyles.button_text, { paddingLeft: scale(15), paddingLeft: scale(15),fontSize: scale(20), color:'white' }]}>Liste des capitales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Gstyles.button}
                                    onPress={() => { this._goLevelView() }}>
                                    <Text style={[Gstyles.button_text, { paddingLeft: scale(15), paddingLeft: scale(15),fontSize: scale(20), color:'white' }]}>Niveau</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={ true }
                        visible={ this.state.modalVisible }
                        onRequestClose={() => {
                            console.log('Modal has been closed')
                        }}>
                        <View style={{ flex: 1, backgroundColor: COLORS.okBackgroundColor, padding: scale(10) }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{  color: popupTextColor, fontSize: scale(25), fontWeight: 'bold' }}>{ "Nouveau niveau !!" }</Text>
                                <Text style={{  color: popupTextColor, fontSize: scale(25), fontWeight: 'bold' }}>{ "Félicitations !!!" }</Text>
                            </View>
                            <LevelSymbol playerLevel = { this.props.PlayerLevel } />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { this._hideNextPlayerLevelPopup() }} 
                                    style={[Gstyles.button, { backgroundColor: popupButtonBackgroundColor, borderBottomColor: popupButtonBorderBottomColor }]}  >
                                    <Text style={Gstyles.button_text}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>  
            )
        }
    }


const styles = StyleSheet.create({
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
    
})

const mapStateToProps = state => {
    return {
        QuestionStatsList: state.HandleQueresStatsReducer.QuestionStatsList,
        pM: state.HandleQueresStatsReducer.pM,
        PlayerLevel: state.HandleQueresStatsReducer.PlayerLevel
    }
}

export default connect(mapStateToProps)(HomeScreen)
