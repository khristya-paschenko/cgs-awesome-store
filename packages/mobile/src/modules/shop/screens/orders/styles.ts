import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';
export const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: COLORS.bgBlue,
	},
	innerContainer: {
		paddingTop: 20,
		paddingHorizontal: 16,
	},
	noFound: {
		marginTop: 100,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: FONTS.poppins.regular,
		color: COLORS.text,
	},
});
