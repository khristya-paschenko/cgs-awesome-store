import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { RootNavigator } from '../navigation/components/root-navigator';
import { Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	BottomSheetContext,
	useBottomSheet,
} from '~/shared/context/bottom-sheet.context';
import BottomSheet from '@gorhom/bottom-sheet';
import { FilterDrawer } from '~/shared/componetnts/filter-drawer';

const client = new QueryClient();

export const App = () => {
	const [fontsLoaded] = useFonts({
		'inter-medium': require('../../../assets/fonts/Inter-Medium.ttf'),
		'inter-bold': require('../../../assets/fonts/Inter-Bold.ttf'),
		'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
		'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
	});

	const bottomSheetRef = React.useRef<BottomSheet>(null);
	const drawer = useBottomSheet(bottomSheetRef);

	// TODO: Make a better splash screen
	if (!fontsLoaded) {
		return <Text>Loading ...</Text>;
	}

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={client}>
				<GestureHandlerRootView>
					<BottomSheetContext.Provider value={drawer}>
						<RootNavigator />
						<Toast position="top" />
						<BottomSheet
							ref={bottomSheetRef}
							index={-1}
							snapPoints={['10%', '36%']}
							enablePanDownToClose
						>
							<FilterDrawer />
						</BottomSheet>
					</BottomSheetContext.Provider>
				</GestureHandlerRootView>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};
