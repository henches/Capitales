import { StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';


export const COLORS = {
    okBackgroundColor: '#b6eb8b',
    okTextColor: '#58a701',
    okButtonBackgroundColor: '#78c800',
    okButtonBorderBottomColor: 'darkgreen',
    nokBackgroundColor : '#f6c0c1',
    nokTextColor: '#eb4f2b',
    nokButtonBackgroundColor: '#ed534a',
    nokButtonBorderBottomColor: '#ec4f2b',
    generalBackgroundColor: 'whitesmoke'
}

export const Gstyles = StyleSheet.create({
    main_view: {
        flex: 1, 
        marginTop: verticalScale(20), 
        backgroundColor: COLORS.generalBackgroundColor
    },
    button: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: 5
    },
    button_inactive: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: 'lightgrey',
        margin: 5
    },
    button_text: {
        fontSize: scale(25),
        color: 'white',
        padding: 10
    },
    check_text_inactive: {
        fontSize: scale(25),
        color: 'darkgrey',
        padding: 10
    },
})


