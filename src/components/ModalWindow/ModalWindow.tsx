import { useAppDispatch } from '@/app/hooks';
import {
  StyledCloseModalBtn,
  StyledModalBackdrop,
  StyledModalBackground,
} from './ModalWindow.styled';
import { closeModalWindow } from '@/redux/modalWindow/modalWindowSlice';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

export const ModalWindow = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch(closeModalWindow());
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      dispatch(closeModalWindow());
    }
  };

  return (
    <StyledModalBackdrop onClick={onBackdropClick}>
      <StyledModalBackground>
        <StyledCloseModalBtn
          type="button"
          onClick={() => dispatch(closeModalWindow())}
        >
          &times;
        </StyledCloseModalBtn>
        {children}
      </StyledModalBackground>
    </StyledModalBackdrop>
  );
};
