import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	option: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
	},
	redirect: {
		fontFamily: FONTS.poppins.bold,
		fontSize: 16,
		color: COLORS.activeBtn,
	},
});
