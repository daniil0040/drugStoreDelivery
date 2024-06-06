import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '@/constants';
import { StyledNavLink } from '../Layout/Layout.styled';
import {
  StyledDropdownContainer,
  StyledDropdownList,
} from './UserDropdown.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { openModalWindow } from '@/redux/modalWindow/modalWindowSlice';
import { apiSignoutUser } from '@/redux/auth/authOperations';
import { selectAuthenticated } from '@/redux/auth/authSelectors';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Props = {
  isClicked: boolean;
  isHovering: boolean;
  handleDropdownClose: () => void;
};

export const UserDropdown = ({
  isClicked,
  isHovering,
  handleDropdownClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    if (isAuthenticated) {
      try {
        await dispatch(apiSignoutUser()).unwrap();
        navigate(LOGIN_ROUTE);
        toast.success("You've successfully logged out");
      } catch (error) {
        toast.error('Ooops, something went wrong(');
      }
    }
    handleDropdownClose();
  };

  const onSettingsClick = () => {
    dispatch(openModalWindow());
    handleDropdownClose();
  };

  return (
    <StyledDropdownContainer
      id="dropdown"
      className={(!isClicked && isHovering) || isClicked ? 'open' : ''}
    >
      <StyledDropdownList>
        <li>
          <StyledNavLink to={DASHBOARD_ROUTE} onClick={handleDropdownClose}>
            Dashboard
          </StyledNavLink>
        </li>
        <li>
          <button type="button" onClick={onSettingsClick}>
            Settings
          </button>
        </li>
        <li>
          <button type="button" onClick={onLogoutClick}>
            Logout
          </button>
        </li>
      </StyledDropdownList>
    </StyledDropdownContainer>
  );
};
