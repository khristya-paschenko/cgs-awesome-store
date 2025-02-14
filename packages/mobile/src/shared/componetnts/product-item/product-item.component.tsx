import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { Product } from '~/modules/services/products/products.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import React from 'react';
import { useNavigationContainerRef } from 'expo-router';

type ProductProps = {
	product: Product;
};

export const ProductItemComponent = ({ product }: ProductProps) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.PRODUCT, { id: product.id });
	};

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<View style={styles.productContainer}>
				<Text style={styles.text}>{product.name}</Text>
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.heading}>Category: </Text>
					<Text style={styles.text}>{product.category}</Text>
				</View>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Text style={styles.heading}>Price: </Text>
				<Text style={styles.text}>${product.price}</Text>
			</View>
		</Pressable>
	);
};
