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
});
