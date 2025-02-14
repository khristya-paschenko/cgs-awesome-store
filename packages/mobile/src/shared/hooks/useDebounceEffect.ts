import React from 'react';

export const useDebounceEffect = <T>(effect, deps: T, delay) => {
	React.useEffect(() => {
		const timerId = setTimeout(() => {
			effect();
		}, delay);
		return () => {
			clearTimeout(timerId);
		};
	}, [...deps, delay]);
};
