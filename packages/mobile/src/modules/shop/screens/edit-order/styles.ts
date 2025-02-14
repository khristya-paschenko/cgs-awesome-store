import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: COLORS.bgBlue,
	},
	innerContainer: {
		flex: 1,
		paddingHorizontal: 28,
		paddingBottom: 30,
		paddingTop: 20,
		justifyContent: 'space-between',
		gap: 40,
	},
	infoContainer: {
		gap: 30,
		flex: 1,
	},
	removeBtn: {
		flex: 1,
		fontFamily: FONTS.poppins.bold,
		fontSize: 16,
		textAlign: 'center',
		color: COLORS.accentRed,
	},
});
