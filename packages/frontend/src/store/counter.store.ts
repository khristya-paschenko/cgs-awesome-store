import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type CounterStore = {
	counter: number;
	updateCounter: (offset: number) => () => void;
	resetCounter: () => void;
};

export const useCounterStore = createWithEqualityFn<CounterStore>((set) => {
	return {
		counter: 0,
		updateCounter: (offset: number) => {
			return (): void => {
				set((state) => {
					return {
						counter: state.counter + offset,
					};
				});
			};
		},
		resetCounter: (): void => {
			set({
				counter: 0,
			});
		},
	};
}, shallow);
