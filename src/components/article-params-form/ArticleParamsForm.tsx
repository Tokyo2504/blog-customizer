import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useFormClose } from 'src/components/article-params-form/hooks/useFormClose';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type TArticleProps = {
	state: ArticleStateType;
	setState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ state, setState }: TArticleProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(state.fontFamilyOption);
	const [fontColor, setFontColors] = useState(state.fontColor);
	const [background, setBackground] = useState(state.backgroundColor);
	const [contentWidth, setContentWidth] = useState(state.contentWidth);
	const [fontSize, setFontSize] = useState(state.fontSizeOption);

	const toggleStateAside = () => {
		setIsOpen((prevState) => !prevState);
	};

	useFormClose({
		isOpen,
		formRef,
		onClose: toggleStateAside,
	});

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();

		setState({
			...state,
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: background,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});

		toggleStateAside();
	};

	const handleFormReset = () => {
		setState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColors(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);

		toggleStateAside();
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => !isOpen && toggleStateAside()}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
						name='fontSize'
						title='Размер шрифт'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={background}
						options={backgroundColors}
						onChange={setBackground}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
