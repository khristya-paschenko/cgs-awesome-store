import { ScrollView, Text, View } from 'react-native';
import { styles } from '~/modules/shop/screens/faq/styles';
import { Accordion } from '~/shared/componetnts/ui/accordion';
import React from 'react';

type IsOpenOptions = 0 | 1 | 2 | 3 | 4;

export const FaqScreen = () => {
	const [isOpened, setIsOpened] = React.useState<IsOpenOptions>(0);
	const handlePress = (id: IsOpenOptions) => {
		if (id === isOpened) {
			setIsOpened(0);
		} else {
			setIsOpened(id);
		}
	};
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.outerContainer}
		>
			<View style={styles.innerContainer}>
				<Accordion
					isExpanded={isOpened === 1}
					onPress={() => handlePress(1)}
					title="Is it safe to buy from us?"
					content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
				/>
				<Accordion
					isExpanded={isOpened === 2}
					onPress={() => handlePress(2)}
					title="Is it safe to buy from us?"
					content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure ."
				/>
				<Accordion
					isExpanded={isOpened === 3}
					onPress={() => handlePress(3)}
					title="Is it safe to buy from us?"
					content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
				/>
				<Accordion
					isExpanded={isOpened === 4}
					onPress={() => handlePress(4)}
					title="Is it safe to buy from us?"
					content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
				/>
			</View>
		</ScrollView>
	);
};
