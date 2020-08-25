import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, TouchableWithoutFeedback, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import { getStoredQuestionStats } from '../Helpers/StorageFunctions'
import { getStoredUserPrefs } from '../Helpers/StorageFunctions'
import { COLORS, Gstyles } from './Styles'
import { IsPlayerLevelCompleted, GetMaxPointsForZone, GetPointsForZone, GetOldPointsForZone, GetKnownQuestions, GetOldKnownQuestions } from '../Helpers/PointsManager'
import { ProgressSymbol } from './ProgressSymbol'
import { AnimatedCounter } from './AnimatedCounter'
import { ProgressLevelSymbol } from './ProgressLevelSymbol'
import { LevelSymbol } from './LevelSymbol'
import { YellowBox } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils'
import { Icon, Divider } from 'react-native-elements'
import { playSound } from '../Helpers/SoundFunctions'
import { app_name, app_version, app_version_description }  from '../package.json'
import { getStatusBarHeight } from 'react-native-status-bar-height'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);  // POur masquer un warning de React Native



class HomeScreen extends React.Component {
    
    constructor(props) {
        console.log("HOME SCREEN CONSTRUCTOR DEBUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        console.log("Name = ", app_name, " ---   Version = ", app_version,  " app_version_description = ", app_version_description)
        super(props);

    
        this._animateProgress = this._animateProgress.bind(this)
        this._onEndAnim1 = this._onEndAnim1.bind(this)
        this._onEndAnim2 = this._onEndAnim2.bind(this)
        this._onEndAnim3 = this._onEndAnim3.bind(this)
        this._onEndAnim4 = this._onEndAnim4.bind(this)
        this._onEndAnim0 = this._onEndAnim0.bind(this)

        if (G_InitState) {  // Horrible verrue
            console.log("HOME SCREEN CONSTRUCTOR")
            // Ici il s'agit d'une tentative de contourner le bug apparu après la première mise sur Play Store (13 aout 2020)
            // Il semble que la première fois, la sauvegarde des données ne se fait pas (l'utilisateur perd la première fois l'avancement de son jeu après reprise de l'app)
            // Je fais l'hypothèse vient du fait que la première lecture ecriture après install depuis playstore serait défaillante
            // (pourquoi ? ... aucune idée ...)
            // Du coup, Je fais une lecture ecriture bidon ici pour voir ... En levant un message pas trop stressant si pb d'écriture
            // testStorage()

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
        modalNextLevelVisible: false, // popup pour indiquer le passage d'un niveau a un autre
        buttonsDisabled: false // permet de desactiver les boutons le temps de l'animation avant de changer de niveau
    }

    static navigationOptions = {
        headerShown: false,
    }



    
    componentDidMount() {
        console.log("HOME SCREEN DID MOUNT !)")


        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => { 
            console.log("HOME SCREEN DIDFOCUS WORKS GREAT")
              this._initProgressAnimation()
              this._animateProgress()
        });

        console.log("this.props.gameFinisheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed", this.props.gameFinished)
        console.log("this.props.soundsActiveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", this.props.soundsActive)



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

        let questionsNb = this.props.QuestionStatsList.length
        

        this.pS1._initProgressAnimation(GetOldPointsForZone(pM, G_Europe, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Europe, this.props.PlayerLevel))
        this.pS2._initProgressAnimation(GetOldPointsForZone(pM, G_Afrique, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Afrique, this.props.PlayerLevel))
        this.pS3._initProgressAnimation(GetOldPointsForZone(pM, G_Ameriques, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Ameriques, this.props.PlayerLevel))
        this.pS4._initProgressAnimation(GetOldPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_AsiePacif, this.props.PlayerLevel))
        this.pS0._initProgressAnimation(GetOldPointsForZone(pM, G_Monde, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Monde, this.props.PlayerLevel))
        this.pS00._initProgressAnimation(GetOldPointsForZone(pM, G_Monde, this.props.PlayerLevel), GetMaxPointsForZone(pM, G_Monde, this.props.PlayerLevel))
        this.aC1._initProgressAnimation(GetOldKnownQuestions(pM), GetKnownQuestions(pM))
        this.aC2._initProgressAnimation(questionsNb-GetOldKnownQuestions(pM), questionsNb-GetKnownQuestions(pM))
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

        if (IsPlayerLevelCompleted(pM, this.props.PlayerLevel)) 
            this.setState({ buttonsDisabled: true })  // gèle les boutons pendant l'animation -> pour que s'affiche l'écran du passage à un nouveau niveau

        this.pS1._animateProgress()


    }


    _onEndAnim1 =() => { this.pS2._animateProgress() }
    _onEndAnim2 =() => { this.pS3._animateProgress() }
    _onEndAnim3 =() => { this.pS4._animateProgress() }
    _onEndAnim4 =() => { console.log("avant anim PS0"); this.pS0._animateProgress(); console.log("après anim PS0");  }
    _onEndAnim0 =() => { console.log("avant anim PS00"); this.pS00._animateProgress(); console.log("après anim PS00");  }
    _onEndAnim00 =() => { this.aC1._animateProgress(); this.aC2._animateProgress() }
    _onEndAnimAC1 =() => { // End of animations
        this.props.dispatch({ type: "QUERES_STATS-DISPLAYED" })   // positionne oldPoints = Point (puisque l'anmation a été réalisée)
        this.setState({ buttonsDisabled: false }) // dégèle les boutons à la fin de l'anmation (au cas ou ils auraient été gelés)

        if (IsPlayerLevelCompleted(this.props.pM, this.props.PlayerLevel)) {
            this.setState({ modalNextLevelVisible: true })
            if (this.props.soundsActive) 
                playSound(3)
            this.props.dispatch({ type: "QUERES_STATS-INCREMENT_PLAYER_LEVEL" })   // positionne oldPoints = Point (puisque l'animation a été réalisée)
            this._initProgressAnimation()
        }
    }
    _onEndAnimAC2 =() => {}

    _hideNextPlayerLevelPopup = () => {
        this.setState({ modalNextLevelVisible: false })
        if (IsPlayerLevelCompleted(this.props.pM, this.props.PlayerLevel) && (this.props.PlayerLevel == G_Config.MaxPlayerLevelNumber-1)) 
            this.props.dispatch({ type: "USER_PREFS-GAME_FINISHED", value: true })
    }
 
    _goConfigScreen() {
        console.log("Go Config");
        
        this.props.navigation.navigate('ConfigScreen')   
    }

    render() {

            console.log("HOME SCREEN RENDER ")  
            // console.log("STATUS BAR HEIGHTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", getStatusBarHeight());
            // console.log("G_ScreenWidth = ", G_ScreenWidth)


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

            let knownQuestions = 0
            let oldKnownQuestions = 0

            if (this.props.pM != null) {
                console.log("HOME SCREEN RENDER PM is not NULL")
                let pM = this.props.pM
                /* POur tester l'animation
                pointsWorld = GetPointsForZone(this.props.pM, G_Monde)
                oldPointsWorld = GetOldPointsForZone(this.props.pM, G_Monde)
                */
                // console.log('PLAYERRRRRRRRRRRRRRRRRRRRRRRRRR LEVEL = ',this.props.PlayerLevel)
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

                knownQuestions = GetKnownQuestions(pM)
                oldKnownQuestions = GetOldKnownQuestions(pM)
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

            let questionsNb = this.props.QuestionStatsList.length

            return (
                <View style={Gstyles.main_view}>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:'100%', paddingHorizontal: '5%' }} >
                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(30)}}>    </Text>
                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(30), fontFamily: 'fontFunhouse' }}>CAPITALES</Text>
                        <TouchableOpacity 
                            disabled={this.state.buttonsDisabled} 
                            onPress={() => { this._goConfigScreen() }}>
                            <Icon name='cog' type='font-awesome' size={ scale(25) }/>
                        </TouchableOpacity>
                    </View> 
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%', padding: verticalScale(4), 
                            borderColor: '#006400', borderWidth: 1, borderRadius: 5 }} >
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(16) }}>Connues</Text>
                            <AnimatedCounter oldValue={ oldKnownQuestions } newValue={ knownQuestions } 
                                onEndAnim={ this._onEndAnimAC1 } ref={ AnimatedCounter => { this.aC1 = AnimatedCounter }} />
                        </View> 
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(16) }}>À apprendre</Text>
                            <AnimatedCounter oldValue={ questionsNb-oldKnownQuestions } newValue={ questionsNb-knownQuestions } 
                                onEndAnim={ this._onEndAnimAC2 } ref={ AnimatedCounter => { this.aC2 = AnimatedCounter }} />
                        </View> 
                    </View> 
                    <Divider style={{ marginVertical: verticalScale(10), width: '90%' }}/>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }} >
                        <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(20) }}> Niveau   </Text>
                        <View style={{ width: '80%' }}>
                            <ProgressLevelSymbol label={ PlayerLevelStyle[playerLevel].text } points={ pointsWorld } oldPoints={ oldPointsWorld }  maxPoints={ maxPointsWorld }
                                    backgroundColor={ PlayerLevelStyle[playerLevel].backgroundColor } foregroundColor={ PlayerLevelStyle[playerLevel+2].backgroundColor }
                                    textColor = { PlayerLevelStyle[playerLevel].textColor }
                                    onEndAnim3={ this._onEndAnim00 } ref={ ProgressLevelSymbol => { this.pS00 = ProgressLevelSymbol }} />
                        </View> 
                    </View> 
                    <View style={{  flex: 6, paddingTop: verticalScale(10), marginLeft: '3%', marginRight: '3%', backgroundColor: 'lightcyan',
                                borderStyle: 'solid', borderColor : 'black', borderWidth: 1, borderRadius: 10,  }}>
                        <ProgressSymbol myFlex={ 1 } zone={ "Europe" } points={ pointsEurope } oldPoints={ oldPointsEurope }  maxPoints={ maxPointsEurope }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim1 } ref={ ProgressSymbol => { this.pS1 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 1 } zone={ "Afrique" } points={ pointsAfrique } oldPoints={ oldPointsAfrique }  maxPoints={ maxPointsAfrique }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim2 } ref={ ProgressSymbol => { this.pS2 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 1 } zone={ "Ameriques" } points={ pointsAmeriques } oldPoints={ oldPointsAmeriques }  maxPoints={ maxPointsAmeriques }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim3 } ref={ ProgressSymbol => { this.pS3 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 1 } zone={ "Asie Pacifique" } points={ pointsAsiePacif } oldPoints={ oldPointsAsiePacif }  maxPoints={ maxPointsAsiePacif }
                                    isTypeFull={ false } onEndAnim3={ this._onEndAnim4 } ref={ ProgressSymbol => { this.pS4 = ProgressSymbol }} />
                        <ProgressSymbol myFlex={ 3 } zone={ "Monde" } points={ pointsWorld } oldPoints={ oldPointsWorld }  maxPoints={ maxPointsWorld }
                                    isTypeFull={ true } onEndAnim3={ this._onEndAnim0 } ref={ ProgressSymbol => { this.pS0 = ProgressSymbol }} />
                    </View>
                    <Divider style={{ marginVertical: verticalScale(10), width: '90%' }}/>
                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>   
                        <TouchableOpacity style={[Gstyles.button, { width: scale(120), height: verticalScale(120) }]}  disabled={this.state.buttonsDisabled} onPress={() => { this._goSeriesScreen() }}>
                                <Icon
                                    size={ scale(80) }
                                    type='fontawesome'
                                    name='play-circle-outline'
                                    color='white'
                                />
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginVertical: verticalScale(10), width: '90%' }}/>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}> 
                        <TouchableOpacity style={Gstyles.button}
                                    disabled={this.state.buttonsDisabled}
                                    onPress={() => { this._goStatView() }}>
                                    <Text style={[Gstyles.button_text, { paddingLeft: scale(15), paddingLeft: scale(15),fontFamily: 'CapitalesFont_Light',  fontSize: scale(15), color:'white' }]}>Liste des capitales</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Gstyles.button}
                                    disabled={this.state.buttonsDisabled}
                                    onPress={() => { this._goLevelView() }}>
                                    <Text style={[Gstyles.button_text, { paddingLeft: scale(15), paddingLeft: scale(15),fontFamily: 'CapitalesFont_Light',  fontSize: scale(15), color:'white' }]}>Niveau</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={ true }
                        visible={ this.state.modalNextLevelVisible }
                        onRequestClose={() => {
                            console.log('Modal has been closed')
                        }}>
                        <View style={{ flex: 1, backgroundColor: COLORS.okBackgroundColor, padding: scale(10) }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{  color: popupTextColor, fontFamily: 'CapitalesFont_Medium',  fontSize: scale(25) }}>{ "Nouveau niveau !!" }</Text>
                                <Text style={{  color: popupTextColor, fontFamily: 'CapitalesFont_Medium',  fontSize: scale(25) }}>{ "Félicitations !!!" }</Text>
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
                    <Modal
                        animationType="slide"
                        transparent={ true }
                        visible={ this.props.gameFinished }
                        onRequestClose={() => { console.log('Modal has been closed') }}>
                        <View style={{ flex: 1, backgroundColor: COLORS.generalBackgroundColor, padding: scale(10),
                                flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'CapitalesFont_Light',  fontSize: scale(30), fontFamily: 'fontFunhouse'  }}>CAPITALES</Text>
                            <Image style={{ height: scale(60), width: scale(60) }} source={ G_AppIcon } />
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(10) }}> </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(55) }}>BRAVO !!!</Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}> </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}>VOUS CONNAISSEZ </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}>LES { questionsNb} </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}>CAPITALES DU MONDE !</Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}> </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}>Le jeu est fini !</Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(35) }}> </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(20) }}>(Réinstallez l'app pour rejouer)</Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(20) }}> </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(20) }}>Guettez les prochaines versions, </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(20) }}>des évolutions sont en préparation ...</Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Medium',  fontSize: verticalScale(25) }}> </Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(20) }}>(votre avis à phcapitales@gmail.com)</Text>
                            <Text style={{  color: 'black', fontFamily: 'CapitalesFont_Light',  fontSize: verticalScale(20) }}>(et pour me dire que vous avez réussi !)</Text>
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
        PlayerLevel: state.HandleQueresStatsReducer.PlayerLevel,
        soundsActive: state.HandleUserPrefsReducer.soundsActive,
        gameFinished: state.HandleUserPrefsReducer.gameFinished
    }
}

export default connect(mapStateToProps)(HomeScreen)
