import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';
export const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: COLORS.bgBlue,
	},
	innerContainer: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 16,
		justifyContent: 'space-between',
		gap: 40,
		paddingBottom: 30,
	},
	deleteBtnContainer: {
		width: '100%',
		alignItems: 'center',
	},
	deleteBtn: {
		fontFamily: FONTS.poppins.semiBold,
		color: COLORS.accentRed,
		fontSize: 16,
	},
	alertContainer: {
		width: '100%',
		gap: 40,
		alignItems: 'center',
	},
	question: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
		textAlign: 'center',
	},
	btnContainer: {
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
	btnNo: {
		backgroundColor: COLORS.lightRed,
	},
	btnYes: {
		backgroundColor: COLORS.activeBtn,
	},
	btnOption: {
		height: 43,
		width: 70,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnText: {
		color: COLORS.bgWhite,
		fontFamily: FONTS.inter.bold,
		fontSize: 16,
	},
});
