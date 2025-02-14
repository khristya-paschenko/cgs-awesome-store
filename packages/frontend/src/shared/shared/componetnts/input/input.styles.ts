import { StyleSheet } from 'react-native';

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
		fontSize: 14,
		borderWidth: 1,
		borderRadius: 24,
	},
	label: {
		marginBottom: 6,
		fontSize: 14,
	},
	focused: {
		borderWidth: 1,
	},
	wrong: {
		borderWidth: 1,
	},
	correct: {
		borderWidth: 1,
	},
});
