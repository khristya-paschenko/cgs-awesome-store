import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: 40,
		paddingHorizontal: 16,
		backgroundColor: COLORS.bgWhite,
		borderRadius: 10,
	},
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
