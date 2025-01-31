import { useEffect } from 'react';

type TCloseForm = {
	isOpen: boolean;
	formRef: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export const useFormClose = ({ isOpen, formRef, onClose }: TCloseForm) => {
	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key == 'Escape') {
				isOpen && onClose();
			}
		};

		const handleOnOverlayClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && !formRef.current?.contains(target)) {
				isOpen && onClose();
			}
		};

		document.addEventListener('keydown', closeOnEscape);
		document.addEventListener('mousedown', handleOnOverlayClick);

		return () => {
			document.removeEventListener('keydown', closeOnEscape);
			document.removeEventListener('mousedown', handleOnOverlayClick);
		};
	}, [isOpen, onClose]);
};
