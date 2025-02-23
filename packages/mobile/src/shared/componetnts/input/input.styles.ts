import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';
import { transform } from '@babel/core';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingBottom: 20,
		marginBottom: 10,
	},
	input: {
		width: '100%',
		paddingHorizontal: 16,
		paddingVertical: 10,
		fontSize: 16,
		borderWidth: 1,
		borderRadius: 10,
		height: 50,
		backgroundColor: COLORS.bgWhite,
		borderColor: COLORS.border,
		fontFamily: FONTS.poppins.regular,
		color: COLORS.text,
	},
	label: {
		marginBottom: 6,
		fontSize: 14,
		fontFamily: FONTS.inter.medium,
		color: COLORS.gray,
	},
	focused: {
		borderWidth: 1,
	},
	wrong: {
		borderColor: COLORS.accentRed,
	},
	correct: {
		borderWidth: 1,
	},
	iconContainer: {
		position: 'absolute',
		right: 23,
		top: 15,
	},
	disabledInput: {
		backgroundColor: COLORS.disabled,
		color: COLORS.disabledText,
	},
});
