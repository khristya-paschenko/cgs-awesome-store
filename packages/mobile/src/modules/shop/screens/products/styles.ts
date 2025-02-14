import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: COLORS.bgBlue,
		flex: 1,
	},
	innerContainer: {
		paddingTop: 20,
		paddingHorizontal: 16,
		flex: 1,
	},
	noFound: {
		marginTop: 100,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: FONTS.poppins.regular,
		color: COLORS.text,
	},
});
