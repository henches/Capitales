import React from 'react'
import { Text, View, Animated, Easing, StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';


const barHeight = verticalScale(35)
progressDuration = 300


// Affiche la progression en cours pour une zone
// Ce symbole s'affiche dans une vue avec les propriétes Flex : flexDirection: 'column', justifyContent: 'center', alignItems: 'center'

export class ProgressLevelSymbol extends React.Component {


    constructor(props) {
        console.log("ProgressLevelSymbol Constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)")
        super(props);

        this.state = {
            progress : new Animated.Value(0),
        }
    }

    componentDidMount() {
        console.log("ComponentDidmount")
        this.state.progress.setValue(0)
    }


    _initProgressAnimation = (oldPoints, maxPoints) => {
        console.log('Progress Level Symbol oldPoints  = ', oldPoints)
        console.log('Progress Level Symbol maxPoints  = ', maxPoints)
        this.state.progress.setValue(oldPoints/maxPoints)
    }


    _animateProgress  = () => {
        console.log("progress Level Symbol : _animateProgress label = ", this.props.label)
        if (this.props.oldPoints == this.props.points) {
            this.props.onEndAnim3()
            return
        }
        this._animateProgress2()
    }

    
    _animateProgress2  = () => {
        console.log("progress Symbol : _animateProgress2  label = ", this.props.label)

        Animated.timing(this.state.progress, {
                toValue: this.props.points/this.props.maxPoints,
                duration: progressDuration, 
                easing: Easing.linear
        }).start( () =>  {                
            this.props.onEndAnim3()
        })
    }

    _closeAnimations  = () => {
        console.log("progress Symbol : closeAnimations")
    }

    render() {

        const label = this.props.label // chaîne de caractères
        const backgroundColor = this.props.backgroundColor
        const foregroundColor = this.props.foregroundColor
        const textColor = this.props.textColor
        console.log("render ProgressLevelSymbol backgroundColor = ", backgroundColor)
        // console.log("render ProgressSymbol Zone = ", zone, " oldPoints = ", this.props.oldPoints)
        // console.log("render ProgressSymbol Zone = ", zone, " points = ", this.props.points)
        // console.log("render ProgressSymbol Zone = ", zone, " maxPoints = ", this.props.maxPoints)


        return(
            <View style={{ flexDirection: 'row', width: '60%', height: barHeight, backgroundColor: backgroundColor, borderColor: '#006400', borderWidth: 2, borderRadius: 5 }}>
                <Animated.View style={[StyleSheet.absoluteFill], { borderRadius: 5, backgroundColor: foregroundColor, width: this.state.progress.interpolate({ inputRange: [0,1], outputRange: ["0%","100%"] }) }}>
                </Animated.View>
                <View style={{ position:'absolute', top:0, left:0, width:'100%', justifyContent:'center', alignItem: 'center', flexDirection:'row' }} > 
                    <Text style={{ color:textColor, fontSize: scale(20), fontWeight: 'normal' }}>{ label }</Text>
                </View>
             </View>
      )
    }  
}
