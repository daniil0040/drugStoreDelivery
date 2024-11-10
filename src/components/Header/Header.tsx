import {
  // HOME_ROUTE,
  LOGIN_ROUTE,
  SHOPPING_CART_ROUTE,
  SIGNUP_ROUTE,
  STORES_ROUTE,
} from '@/constants/routes';
import UserIcon from '@/assets/images/user.svg?react';
import { UserDropdown } from '../UserDropdown/UserDropdown';
// import { ModalWindow } from '../ModalWindow/ModalWindow';
import {
  StyledArrowDownIcon,
  StyledDropdownOpenBtn,
  StyledHeader,
  StyledNavLink,
  StyledUserImg,
  StyledUserInfoContainer,
  StyledUserName,
} from './Header.styled';
import {
  selectAuthenticated,
  selectIsLoading,
  selectIsRefreshing,
  selectUserData,
} from '@/redux/auth/authSelectors';
import { useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';

type Props = {};

export const Header = (props: Props) => {
  const [isDropdownClicked, setIsDropdownClicked] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  // const isModalOpen = useAppSelector(selectIsModalOpen);
  const isAuthenticated = useAppSelector(selectAuthenticated);
  const userData = useAppSelector(selectUserData);
  const isLoading = useAppSelector(selectIsLoading);
  const isRefreshing = useAppSelector(selectIsRefreshing);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleOnClick = () => {
    if (isHovering) {
      setIsHovering(false);
    }
    if (!isDropdownClicked) {
      setIsDropdownClicked(true);
      return;
    }
    setIsDropdownClicked(false);
  };

  const handleDropdownClose = () => {
    setIsDropdownClicked(false);
    setIsHovering(false);
  };

  useEffect(() => {
    if (!isHovering && !isDropdownClicked) return;

    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const isClickAmongDropdown = Boolean(e.target.closest('#dropdown'));
        if (!isClickAmongDropdown) {
          setIsDropdownClicked(false);
        }
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isHovering, isDropdownClicked]);

  return (
    <StyledHeader>
      {/* <StyledNavLink to={HOME_ROUTE}>Home</StyledNavLink> */}
      <StyledNavLink to={STORES_ROUTE}>Stores</StyledNavLink>
      <StyledNavLink to={SHOPPING_CART_ROUTE}>Cart</StyledNavLink>
      {!isAuthenticated ? (
        <>
          <StyledNavLink to={LOGIN_ROUTE}>Login</StyledNavLink>
          <StyledNavLink to={SIGNUP_ROUTE}>Signup</StyledNavLink>{' '}
        </>
      ) : (
        <div
          style={{
            position: 'relative',
            display: 'flex',
          }}
        >
          {!isLoading && !isRefreshing && userData && (
            <StyledUserInfoContainer>
              <StyledUserName>{userData?.displayName}</StyledUserName>
              {userData?.photoURL ? (
                <StyledUserImg
                  src={userData?.photoURL}
                  width={'32px'}
                  height={'32px'}
                />
              ) : (
                <UserIcon width={'32px'} height={'32px'} />
              )}
            </StyledUserInfoContainer>
          )}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <StyledDropdownOpenBtn type="button" onClick={handleOnClick}>
              <StyledArrowDownIcon
                className={isDropdownClicked || isHovering ? 'active' : ''}
                width={'32px'}
                height={'32px'}
              />
            </StyledDropdownOpenBtn>
            <UserDropdown
              isClicked={isDropdownClicked}
              isHovering={isHovering}
              handleDropdownClose={handleDropdownClose}
            />
          </div>
        </div>
      )}
    </StyledHeader>
  );
};
