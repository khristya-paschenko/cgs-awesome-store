import { Input } from '~/shared/componetnts/input';
import { useForm } from 'react-hook-form';
import { useDebounceEffect } from '~/shared/hooks/useDebounceEffect';
import { useProducts } from '~/shared/hooks/useProducts';

type SearchField = {
	search?: string;
};
export const SearchComponent = () => {
	const { refreshProducts } = useProducts();
	const { control, watch, handleSubmit } = useForm<SearchField>();
	const searchTerm = watch('search');

	useDebounceEffect<SearchField[]>(
		() => {
			if (searchTerm.trim() === '') {
				refreshProducts();
				return;
			}
			refreshProducts({ name: searchTerm });
		},
		[searchTerm],
		500,
	);
	return (
		<Input
			extraInputContainerStyles={{ paddingBottom: 0 }}
			name="search"
			control={control}
			defaultValue=""
			placeHolder="Enter product name"
		/>
	);
};
