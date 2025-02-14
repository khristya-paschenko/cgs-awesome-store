import { styles } from './styles';
import { View, Text, FlatList } from 'react-native';
import { ProductItemComponent } from '~/shared/componetnts/product-item/product-item.component';
import { useProducts } from '~/shared/hooks/useProducts';
import { useProductsStore } from '~/shared/store/products.store';
import React from 'react';
import { SearchComponent } from '~/shared/componetnts/search';
import { SortComponent } from 'shared/componetnts/sort';

export const ProductsScreen = () => {
	const { isPending, refreshProducts, handleRefresh, handleNextPage } =
		useProducts();
	const { products, params } = useProductsStore((state) => state);

	React.useEffect(() => {
		if (isPending) return;
		refreshProducts();
	}, []);

	return (
		<View style={styles.outerContainer}>
			<View style={styles.innerContainer}>
				<SearchComponent />

				<SortComponent />

				{!isPending && (
					<FlatList
						contentContainerStyle={{ paddingTop: 20 }}
						data={products}
						renderItem={(product) => (
							<ProductItemComponent product={product.item} />
						)}
						refreshing={isPending}
						onRefresh={handleRefresh}
						onEndReached={handleNextPage}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<Text style={styles.noFound}>
								No products found.
							</Text>
						}
					/>
				)}
			</View>
		</View>
	);
};
