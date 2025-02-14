import React from 'react';
import {
	KeyboardTypeOptions,
	Pressable,
	StyleProp,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import {
	Control,
	FieldPath,
	FieldPathValue,
	FieldValues,
	RegisterOptions,
	useController,
} from 'react-hook-form';

import { styles } from './input.styles';
import { InputError } from '../../input-error';
import AyeVisible from '~/../assets/icons/EyeVisible.svg';
import AyeInvisible from '~/../assets/icons/AyeInvisible.svg';
import { COLORS } from '~/shared/styles';

type InputProps<
	T extends FieldValues = FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
> = {
	name: N;
	control: Control<T>;
	defaultValue: FieldPathValue<T, N>;
	rules?:
		| Omit<
				RegisterOptions<T, N>,
				'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
		  >
		| undefined;
	label?: string;
	keyBoardType?: KeyboardTypeOptions;
	placeHolder?: string;
	extraInputContainerStyles?: StyleProp<ViewStyle>;
	extraErrorStyles?: StyleProp<TextStyle>;
	secure?: boolean;
};

export function Input<
	T extends FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
>({
	control,
	name,
	rules,
	defaultValue,
	keyBoardType,
	placeHolder,
	label,
	extraInputContainerStyles,
	extraErrorStyles = {},
	secure = false,
}: InputProps<T, N>) {
	const [isFocused, setIsFocused] = React.useState(false);

	const inputRef = React.createRef<TextInput>();

	const {
		field: { value, onBlur, onChange },
		fieldState: { error },
	} = useController({
		control,
		defaultValue,
		name,
		rules,
	});

	const [isVisible, setIsVisible] = React.useState<boolean>(false);
	const handleFocus = () => {
		if (inputRef.current?.isFocused) {
			setIsFocused(true);
			return;
		}
		setIsFocused(false);
	};

	const handleBlur = () => {
		onBlur();
		setIsFocused(false);
	};

	const handleSecure = () => {
		setIsVisible((value) => !value);
	};

	return (
		<View style={[styles.container, extraInputContainerStyles]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					value={value}
					onChangeText={onChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					keyboardType={keyBoardType}
					style={[
						styles.input,
						value && !error && styles.correct,
						isFocused && styles.focused,
						error && styles.wrong,
					]}
					textContentType="oneTimeCode"
					autoCapitalize="none"
					ref={inputRef}
					secureTextEntry={secure ? !isVisible : false}
					placeholder={placeHolder ? placeHolder : ''}
					placeholderTextColor={COLORS.text}
				/>

				{secure ? (
					<Pressable
						style={styles.iconContainer}
						onPress={handleSecure}
					>
						{isVisible ? <AyeVisible /> : <AyeInvisible />}
					</Pressable>
				) : (
					(null as React.ReactNode)
				)}
			</View>
			<InputError<T>
				control={control}
				field={name}
				extraErrorStyles={extraErrorStyles}
			/>
		</View>
	);
}
