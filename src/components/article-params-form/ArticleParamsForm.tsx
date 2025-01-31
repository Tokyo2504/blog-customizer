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
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type TArticleProps = {
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TArticleProps) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	const toggleStateAside = () => {
		setIsOpen((prevState) => !prevState);
	};

	useFormClose({
		isOpen,
		formRef,
		onClose: toggleStateAside,
	});

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({
				...prevState,
				[field]: value,
			}));
		};
	};

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(state);
		toggleStateAside();
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		setState(defaultArticleState);
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
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleOnChange('fontSizeOption')}
						name='fontSize'
						title='Размер шрифт'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
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
