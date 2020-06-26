import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { array } from 'prop-types'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';

const radius = 3
const okColor = "#90EE90"
const nokColor = "#E8E8E8"

export class QuestionLevelSymbol extends React.Component {





    render() {
        let level = this.props.level
        let squareDim = this.props.squareDim
        const color3 = level > 2 ? okColor : nokColor
        const color2 = level > 1 ? okColor : nokColor
        const color1 = level > 0 ? okColor : nokColor
        return(
            <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 1, borderRadius: radius, padding: 1 }}>
                <View style={{ backgroundColor: color3, borderWidth: 1, borderRadius: radius, width: scale(squareDim), height:verticalScale(squareDim), marginBottom: 1 }}>
                </View> 
                <View style={{ backgroundColor: color2, borderWidth: 1, borderRadius: radius, width: scale(squareDim), height:verticalScale(squareDim), marginBottom: 1  }}>
                </View> 
                <View style={{ backgroundColor: color1, borderWidth: 1, borderRadius: radius, width: scale(squareDim), height:verticalScale(squareDim) }}>
                </View> 
            </View>
        )
    }  
}
