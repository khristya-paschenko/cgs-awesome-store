import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	button: {
		width: '100%',
		borderRadius: 10,
		height: 43,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	disabled: {
		backgroundColor: COLORS.disabledBtn,
	},
	active: {
		backgroundColor: COLORS.activeBtn,
	},
	text: {
		fontFamily: FONTS.inter.bold,
		fontSize: 16,
		color: COLORS.bgWhite,
	},
});
