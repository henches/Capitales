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
            pBfadeProgress : new Animated.Value(0)
        }
    }

    _animateProgress  = () => {
        // console.log("progress Symbol : _animateProgress ")
        // console.log("progress Symbol : _animateProgress Zone = ", this.props.zone)
        // console.log("progress Symbol : _animateProgress points = ", this.props.points)
        // console.log("progress Symbol : _animateProgress oldPoints = ", this.props.oldPoints)
        // console.log("progress Symbol : _animateProgress maxPoints = ", this.props.maxPoints)


        this.state.pBsizeX.setValue(this.props.oldPoints/this.props.maxPoints*0.8)
        this.state.pBfadeProgress.setValue(0)

        if (this.props.oldPoints == this.props.points) { // Pas d'animation si pas de d'augmentation de points
            this.props.onEndAnim1()
            return
        }


        Animated.parallel([
            Animated.timing(this.state.pBsizeX, {
                toValue: this.props.oldPoints/this.props.maxPoints+0.05,
                duration: 200, 
                easing: Easing.linear
            }),
            Animated.timing(                  
                this.state.pBfadeProgress,{
                    toValue: 0.1,                   
                    duration: 200,              
            })]
        ).start( () =>  {
            Animated.parallel([
                Animated.timing(this.state.pBsizeX, {
                    toValue: this.props.oldPoints/this.props.maxPoints,
                    duration: 200, 
                    easing: Easing.bounce
                }),
                Animated.timing(                  
                    this.state.pBfadeProgress,{
                        toValue: 0.3,                   
                        duration: 200,              
                })]
            ).start( () =>  {                
               console.log("progress Symbol : fin _animateProgress")
               this.props.onEndAnim1()
            })
        })
    }
    
    _animateProgress2  = () => {
        console.log("progress Symbol : _animateProgress2 ")
    
        if (this.props.oldPoints == this.props.points) { // Pas d'animation si pas de d'augmentation de points
            this.props.onEndAnim2()
            return
        }

        Animated.parallel([
            Animated.timing(this.state.pBsizeX, {
                toValue: this.props.points/this.props.maxPoints,
                duration: 400, 
                easing: Easing.bounce
            }),
            Animated.timing(                  
                this.state.pBfadeProgress,{
                    toValue: 0.6,                   
                    duration: 400,              
            })]
        ).start( () => {
            console.log("progress Symbol : fin _animateProgress2")
            this.props.onEndAnim2()
        })
    }

    _animateProgress3  = () => {
        console.log("progress Symbol : _animateProgress3 ")
    
        if (this.props.oldPoints == this.props.points) { // Pas d'animation si pas de d'augmentation de points
            this.props.onEndAnim3()
            return
        }

        Animated.timing(                  
            this.state.pBfadeProgress, {
                toValue: 1,                   
                duration: 400,              
            }
        ).start(() => {
            console.log("progress Symbol = ", this.props.zone, " : fin _animateProgress3")
            this.props.onEndAnim3()
        });                        
    }


    render() {

        const myFlex = this.props.myFlex // chaine de caractères

        const points = this.props.points  // points : nombre de points actuels pour la zone
        const oldPoints = this.props.oldPoints  // points : nombre de points actuels pour la zone
        const maxPoints = this.props.maxPoints  // points : nombre de points actuels pour la zone

        const zone = this.props.zone // chaine de caractères

        //console.log("Zone = ", zone)
        //console.log("points = ", points)
        //console.log("oldPoints = ", oldPoints)
        //console.log("maxPoints = ", maxPoints)

/*
                            <Animated.View style={{ zIndex:1, alignSelf: 'flex-end', opacity: this.state.pBfadeProgress.interpolate({ inputRange: [0, 1], outputRange: ['100%', '0%'] })  }}>
                                <Text style={{ fontSize: 13, color: 'white' }}> { '+'+(points-oldPoints) } </Text>
                            </Animated.View>
                            <Animated.View style={{ sIndex:2, alignSelf: 'flex-end', opacity: this.state.pBfadeProgress  }}>
                                <Text style={{ fontSize: 13, color: 'white' }}> { points } </Text>
                            </Animated.View>
                        </Animated.View>    

*/
/*
<Animated.View style={{ zIndex:1, position:'absolute', alignSelf: 'flex-end', 
opacity: this.state.pBfadeProgress.interpolate({ inputRange: [0, 0.29, 0.31, 0.59, 0.60, 1], outputRange: [0, 1, 1, 1, 0, 0] }) }}>
<Text style={{ fontSize: 13, color: 'white' }}> { '+'+(points-oldPoints) } </Text>
</Animated.View>
*/
        return(
            <View style={{ flex: myFlex, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '5%', marginLeft: '5%' }}>
                <Text style={{ fontSize: 20 }}>{zone}</Text>
                <View style={{ width:'100%', marginRight: '5%', marginLeft: '5%'}}>
                    <View style={{ backgroundColor: 'aqua', borderRadius: 10, height: barHeight, width:"100%", alignSelf: 'center'}}>               
                        <Animated.View style={{ backgroundColor: 'dodgerblue', borderRadius: 10, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
                                height: this.state.pBsizeY,  width: this.state.pBsizeX.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }}>
                            <Animated.View style={{ zIndex:2, position:'absolute', alignSelf: 'flex-end', 
                                    opacity: this.state.pBfadeProgress.interpolate({ inputRange: [0, 0.30, 0.31, 1], outputRange: [1, 1, 0, 0] })  }}>
                                <Text style={{ fontSize: 12, color: 'white' }}> { oldPoints } </Text>
                            </Animated.View>
                            <Animated.View style={{ zIndex:2, position:'absolute', alignSelf: 'flex-end', 
                                    opacity: this.state.pBfadeProgress.interpolate({ inputRange: [0, 0.31, 0.32, 1], outputRange: [0, 0, 1, 1] })  }}>
                                <Text style={{ fontSize: 14, color: 'white' }}> { points } </Text>
                            </Animated.View>
                        </Animated.View>    
                    </View>      
                    <View style={{ position: 'absolute', alignSelf: 'flex-end' }}> 
                        <Text style={{ fontSize: 10, color: 'black', opacity: 0.5 }}> { maxPoints } </Text>
                    </View>
                </View>
            </View>
      )
    }  
}
