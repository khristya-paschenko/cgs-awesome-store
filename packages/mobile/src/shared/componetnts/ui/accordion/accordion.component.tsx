import { Pressable, Text, View } from 'react-native';
import { styles } from '~/shared/componetnts/ui/accordion/styles';
import React from 'react';
import Arrow from '~/../assets/icons/HeaderBackIcon.svg';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

type AccordionProps = {
	title: string;
	content: string;
	isExpanded: boolean;
	onPress: () => void;
};
export const Accordion = ({
	title,
	content,
	isExpanded,
	onPress,
}: AccordionProps) => {
	const height = useSharedValue(0);

	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded), { duration: 500 }),
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));
	return (
		<View style={styles.container}>
			<Pressable
				onPress={onPress}
				style={[styles.btnContainer, styles.accordion]}
			>
				<Text style={styles.title}>{title}</Text>
				<Arrow
					width={8}
					height={14}
					style={isExpanded ? styles.arrowOpened : styles.arrowClosed}
				/>
			</Pressable>
			<Animated.View style={[styles.animatedView, bodyStyle]}>
				<View
					onLayout={(e) => {
						height.value = e.nativeEvent.layout.height;
					}}
					style={[styles.accordion, styles.content]}
				>
					<Text style={styles.text}>{content}</Text>
				</View>
			</Animated.View>
		</View>
	);
};
