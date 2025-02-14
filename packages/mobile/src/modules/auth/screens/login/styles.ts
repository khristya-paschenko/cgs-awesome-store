import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: COLORS.bgBlue,
		flex: 1,
	},
	innerContainer: {
		paddingBottom: 28,
		paddingHorizontal: 16,
		paddingTop: 77,
		gap: 40,
		flex: 1,
	},
	loginContainer: {
		flex: 1,
		gap: 20,
	},
});
