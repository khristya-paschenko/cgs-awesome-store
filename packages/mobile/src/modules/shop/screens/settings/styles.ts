import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.bgBlue,
		paddingTop: 20,
		paddingHorizontal: 16,
		gap: 20,
	},
	btn: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
	},
});
