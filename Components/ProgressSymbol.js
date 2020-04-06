import React from 'react'
import { Text, View, Animated, TouchableOpacity, Easing, Bounce } from 'react-native'
import { COLORS, Gstyles } from './Styles'


const barHeight = 16


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressSymbol extends React.Component {


    constructor() {
        console.log("ProgressSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super();

        this.state = {
            pBsizeX : new Animated.Value(0),
            pBsizeY : new Animated.Value(0),
            pBfadeProgress : new Animated.Value(0)
        }
    }

    _animateProgress  = () => {
        console.log("progress Symbol : _animateProgress ")
        console.log("progress Symbol : _animateProgress Zone = ", this.props.zone)
        console.log("progress Symbol : _animateProgress points = ", this.props.points)
        console.log("progress Symbol : _animateProgress oldPoints = ", this.props.oldPoints)
        console.log("progress Symbol : _animateProgress maxPoints = ", this.props.maxPoints)


        this.state.pBsizeX.setValue(this.props.oldPoints/this.props.maxPoints)
        this.state.pBsizeY.setValue(barHeight*0.5)
        Animated.parallel([
            Animated.timing(this.state.pBsizeX, {
                toValue: this.props.points/this.props.maxPoints,
                duration: 800, // Le temps est en milliseconds ici (3000ms = 3sec)
                easing: Easing.linear
            }),
            Animated.timing(this.state.pBsizeY, {
                toValue: barHeight*1.6,
                duration: 800, // Le temps est en milliseconds ici (3000ms = 3sec)
                easing: Easing.linear
            })]
        ).start( () =>  {
            Animated.parallel([
                Animated.timing(this.state.pBsizeX, {
                    toValue: this.props.oldPoints/this.props.maxPoints,
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.bounce
                }),
                Animated.timing(this.state.pBsizeY, {
                    toValue: barHeight,
                    duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                    easing: Easing.bounce
                })]
            ).start( () =>  {                
               console.log("progress Symbol : fin _animateProgress")
               this.props.onEndAnim1("toto")
            })
        })
    }
    
    _animateProgress2  = () => {
        console.log("progress Symbol : _animateProgress2 ")
    
        Animated.parallel([
            Animated.timing(this.state.pBsizeX, {
                toValue: 200,
                duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                easing: Easing.linear
            }),
            Animated.timing(this.state.pBsizeY, {
                toValue: 20,
                duration: 1000, // Le temps est en milliseconds ici (3000ms = 3sec)
                easing: Easing.linear
            })]
        ).start( () => {
            console.log("progress Symbol : fin _animateProgress2")
            this.props.onEndAnim2("toto")
        })
    }

    _animateProgress3  = () => {
        console.log("progress Symbol : _animateProgress3 ")
    
        this.state.pBfadeProgress.setValue(0)
        Animated.timing(                  
            this.state.pBfadeProgress,            
            {
                toValue: 1,                   
                duration: 1000,              
            }
        ).start();                        
    }


    _testParent  = () => {
        console.log("_testParent ");
      //  this.props.functionPropGo("toto");
    }
            

    render() {

        const myFlex = this.props.myFlex // chaine de caractères

        const points = this.props.points  // points : nombre de points actuels pour la zone
        const oldPoints = this.props.oldPoints  // points : nombre de points actuels pour la zone
        const maxPoints = this.props.maxPoints  // points : nombre de points actuels pour la zone

        const zone = this.props.zone // chaine de caractères

        console.log("Zone = ", zone)
        console.log("points = ", points)
        console.log("oldPoints = ", oldPoints)
        console.log("maxPoints = ", maxPoints)


        return(
            <View style={{ flex: myFlex, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{zone}</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%', paddingTop: 0, paddingBottom: 0,paddingRight: '5%', paddingLeft: '5%'}}>
                    <View style={{ backgroundColor: 'aqua', marginTop: 0, borderRadius: 10, height: barHeight, width:"100%", alignSelf: 'center'}}>               
                        <Animated.View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
                                height: this.state.pBsizeY,  width: this.state.pBsizeX.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }}>
                        </Animated.View>    
                        <View style={{ flexDirection: 'row', paddingRight: '1%', paddingLeft: '1%' }}>
                            <Animated.View style={{ paddingLeft: this.state.pBsizeX, opacity: this.state.pBfadeProgress  }}>
                                <Text style={{ fontSize: 12 }}> { points } </Text>
                            </Animated.View>
                        </View>
                    </View>      
                </View>
            </View>
      )
    }  
}
