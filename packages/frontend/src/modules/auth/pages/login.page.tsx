import * as React from 'react';

import { box, container } from './login.styles';
import Button from '~shared/components/button/button.component';
import ReactIcon from '../../../assets/react.svg';

export const LoginPage = (): React.ReactNode => {
	const [count, setCount] = React.useState(0);

	const onIncrease = (): void => {
		setCount((prev) => {
			return prev + 1;
		});
	};

	return (
		<div className={box}>
			<div className={container}>
				<ReactIcon />
				<h1>Awesome store</h1>
				<p>{count}</p>
				<Button text="Like" onClick={onIncrease} />
			</div>
		</div>
	);
};
