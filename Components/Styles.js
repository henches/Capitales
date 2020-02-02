import { StyleSheet } from 'react-native'

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
        marginTop: 20, 
        backgroundColor: COLORS.generalBackgroundColor
    }
})


