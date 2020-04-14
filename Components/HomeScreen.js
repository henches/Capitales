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

  

    _onEndAnim01 =() => { this.pS0._animateProgress2() }
    _onEndAnim02 =() => { this.pS0._animateProgress3() }
    _onEndAnim03 =() => { this.pS0._closeAnimations() }

    _onEndAnim11 =() => { this.pS1._animateProgress2() }
    _onEndAnim12 =() => { this.pS1._animateProgress3() }
    _onEndAnim13 =() => { this.pS2._animateProgress() }

    _onEndAnim21 =() => { this.pS2._animateProgress2() }
    _onEndAnim22 =() => { this.pS2._animateProgress3() }
    _onEndAnim23 =() => { this.pS0._animateProgress() }


    render() {
        return (
            <View style={Gstyles.main_view}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold'}}>CAPITALES</Text>
                </View>
                <ProgressSymbol myFlex={ 1 } zone={ "Europe" } points={ 18 } oldPoints={ 1 }  maxPoints={ 45 }
                            onEndAnim1={ this._onEndAnim11 } onEndAnim2={ this._onEndAnim12 } onEndAnim3={ this._onEndAnim13 } ref={ ProgressSymbol => { this.pS1 = ProgressSymbol }} />
                <ProgressSymbol myFlex={ 1 } zone={ "Afrique" } points={ 50 } oldPoints={ 48 }  maxPoints={ 50 }
                            onEndAnim1={ this._onEndAnim21 } onEndAnim2={ this._onEndAnim22 } onEndAnim3={ this._onEndAnim23 } ref={ ProgressSymbol => { this.pS2 = ProgressSymbol }} />
                <ProgressSymbol myFlex={ 1 } zone={ "MONDE" } points={ 20 } oldPoints={ 17 }  maxPoints={ 40 }
                            onEndAnim1={ this._onEndAnim01 } onEndAnim2={ this._onEndAnim02 } onEndAnim3={ this._onEndAnim03 } ref={ ProgressSymbol => { this.pS0 = ProgressSymbol }} />
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>   
                    <TouchableOpacity style={Gstyles.button}
                            onPress={() => { this._goSeriesScreen() }}>
                            <Text style={Gstyles.button_text}>JOUER</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}> 
                    <TouchableOpacity style={Gstyles.button}
                                onPress={() => { this.pS1._animateProgress() }}>
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
