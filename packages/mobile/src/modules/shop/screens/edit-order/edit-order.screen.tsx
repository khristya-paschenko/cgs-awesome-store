import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProductDetailsComponent } from '~/shared/componetnts/product-details';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
	RootStackParamList,
} from '~/modules/navigation/types';
import { RouteProp } from '@react-navigation/native';

type EditOrderScreenProps = {
	navigation: NativeStackScreenProps<
		RootStackParamList,
		NAVIGATION_KEYS.ORDER_DETAILS
	>;
	route: RouteProp<RootBottomTabsParamList, NAVIGATION_KEYS.EDIT_ORDER>;
};
export const EditOrderScreen = ({
	navigation,
	route,
}: EditOrderScreenProps) => {
	return (
		<View style={styles.outerContainer}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<View style={styles.innerContainer}>
					{!isPending && product && (
						<View style={styles.infoContainer}>
							<ProductDetailsComponent
								product={product}
								onQuantityChange={setQuantity}
								selectedQuantity={quantity}
							/>

							<Pressable
								style={{ flex: 1 }}
								onPress={handleRemove}
							>
								<Text style={styles.removeBtn}>
									Remove from the cart
								</Text>
							</Pressable>
						</View>
					)}

					<SubmitButton
						text="Save"
						disabled={isPending}
						onPress={() => {}}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};
