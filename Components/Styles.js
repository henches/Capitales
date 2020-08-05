import { StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale} from '../Helpers/scaling_utils';
import { getStatusBarHeight } from 'react-native-status-bar-height'


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
        marginTop: getStatusBarHeight(), // hauteur du status bar (iOs ou Android)
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.generalBackgroundColor
    },
    button: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 5,
        backgroundColor: 'dodgerblue',
        margin: scale(5)
    },
    button_inactive: {
        height: verticalScale(50),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        margin: scale(5)
    },
    button_text: {
        fontFamily: 'CapitalesFont_Light',
        fontFamily: 'CapitalesFont_Light',  fontSize: scale(25),
        color: 'white',
        padding: scale(10)
    },
    ans_button_text: {
        fontFamily: 'CapitalesFont_Light',  fontSize: scale(17),
        color: 'white',
        padding: scale(10)
    },
    check_text_inactive: {
        fontFamily: 'CapitalesFont_Light',  fontSize: scale(25),
        color: 'darkgrey',
        padding: scale(10)
    },
})


