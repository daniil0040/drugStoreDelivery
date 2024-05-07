import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectTotalCartPrice = createSelector(selectCartItems, items => {
  return items.reduce((value, item) => {
    return (value += item.quantity * item.price);
  }, 0);
});

export const selectSortedByAlphabetItems = createSelector(selectCartItems, items => {
  return [...items].sort((a, b) => {
    const nameA = a.medicineTitle.toUpperCase(); // ignore upper and lowercase
    const nameB = b.medicineTitle.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
});

export const selectAddress = (state: RootState) => state.cart.address;
