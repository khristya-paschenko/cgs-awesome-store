import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	infoContainer: {
		gap: 10,
	},
	heading: {
		fontFamily: FONTS.poppins.bold,
		fontSize: 16,
		color: COLORS.text,
	},
	text: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
	},
	btnContainer: {
		flexDirection: 'row',
		gap: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	commonBtn: {
		height: 48,
		width: 48,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	disabledBtn: {
		backgroundColor: COLORS.lightGray,
	},
	activeBtn: {
		backgroundColor: COLORS.activeBtn,
	},
	input: {
		height: 50,
		width: 44,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.disabledBtn,
		lineHeight: 50,
		fontSize: 16,
		fontFamily: FONTS.inter.bold,
		color: COLORS.text,
		textAlign: 'center',
		backgroundColor: COLORS.bgWhite,
	},
});
