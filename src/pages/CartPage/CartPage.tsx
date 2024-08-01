import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  StyledCaptchaErr,
  StyledCartList,
  StyledForm,
  StyledFormContainer,
  StyledInput,
  StyledInputsContainer,
  StyledListItem,
  StyledListItemCloseBtn,
  StyledListItemQuantity,
  StyledListItemQuantityBtn,
  StyledListItemQuantityWrapper,
  StyledSingleInputContainer,
  StyledSubmitContainer,
} from './CartPage.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  addToCart,
  decreaseQuantity,
  removeSingleItem,
} from '@/redux/cart/cartSlice';
import { CartMedicine, Medicine } from '@/types/MedicineType';
import {
  selectAddress,
  selectSortedByAlphabetItems,
  selectTotalCartPrice,
} from '@/redux/cart/cartSlice.selectors';
import IconArrow from '@/assets/images/MaterialSymbolsArrowDropDownCircleOutlineRounded.svg?react';
import { Map } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { selectUserData } from '@/redux/auth/authSelectors';
import { TOrder } from '@/types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/app/firebase';
import toast from 'react-hot-toast';

type Values = {
  name: string;
  email: string;
  phone: string;
  address: string;
  recaptcha: string;
};

type TCartListItemProps = {
  item: CartMedicine;
};

const CartPage = () => {
  const totalPrice = useAppSelector(selectTotalCartPrice);
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const [captchaErr, setCaptchaErr] = useState<boolean | null>(null);
  const userData = useAppSelector(selectUserData);
  const address = useAppSelector(selectAddress);
  const items = useAppSelector(selectSortedByAlphabetItems);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>();
  const onSubmit = async (data: Values): Promise<void> => {
    const token = captchaRef?.current?.getValue();
    if (!token) {
      setCaptchaErr(true);
      return;
    }
    console.log(data);

    if (!userData) return;

    const finalData: TOrder = {
      userName: data.name,
      userEmail: data.email,
      userAddress: data.address,
      userPhone: data.phone,
      userUid: userData?.uid,
      totalPrice: totalPrice,
      orderItems: items.map(item => {
        return {
          id: item.id,
          name: item.medicineTitle,
          pharmacyId: item.pharmacy,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    };
    const ordersRef = collection(db, 'orders');
    await addDoc(ordersRef, finalData);
    toast.success('Succesfully ordered!');
    setCaptchaErr(false);
    captchaRef?.current?.reset();
  };

  useEffect(() => {
    setValue('address', address);
  }, [address]);

  useEffect(() => {
    if (userData?.displayName) {
      setValue('name', userData?.displayName);
    }
    if (userData?.email) {
      setValue('email', userData?.email);
    }
    if (userData?.phoneNumber) {
      setValue('phone', userData?.phoneNumber);
    }
  }, [userData]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <CartForm register={register} errors={errors} setValue={setValue} />
      <CartList />
      <div className="totalContainer">
        <ReCAPTCHA
          sitekey="6LdOxNApAAAAAKcmHWhxeSmfYz-m9nDAH0iZ6PBo"
          ref={captchaRef}
          onChange={() => setCaptchaErr(false)}
        />
        {captchaErr && (
          <StyledCaptchaErr style={{ color: 'red' }}>
            Please,confirm you're human
          </StyledCaptchaErr>
        )}
        <StyledSubmitContainer>
          <span style={{ cursor: 'default' }}>
            Total price:{totalPrice.toFixed(2)}$
          </span>
          <button
            type="submit"
            style={{ cursor: 'pointer' }}
            disabled={captchaErr === null || captchaErr}
          >
            Submit
          </button>
        </StyledSubmitContainer>
      </div>
    </StyledForm>
  );
};

const CartForm = ({
  register,
  errors,
}: {
  register: UseFormRegister<Values>;
  errors: FieldErrors<Values>;
  setValue: UseFormSetValue<Values>;
}) => {
  return (
    <StyledFormContainer className="formContainer">
      <StyledInputsContainer>
        <StyledSingleInputContainer>
          <span>Name:</span>
          <StyledInput
            placeholder="First Name"
            type="text"
            {...register('name', { required: 'this field is required' })}
          />
          {errors.name && <p>{errors.name?.message}</p>}
        </StyledSingleInputContainer>
        <StyledSingleInputContainer>
          <span>Email:</span>
          <StyledInput
            placeholder="E-mail"
            type="email"
            {...register('email', { required: 'this field is required' })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </StyledSingleInputContainer>
        <StyledSingleInputContainer>
          <span>Phone:</span>
          <StyledInput
            placeholder="Phone Number"
            type="tel"
            {...register('phone', { required: 'this field is required' })}
          />
          {errors.phone && <p>{errors.phone?.message}</p>}
        </StyledSingleInputContainer>
        <StyledSingleInputContainer>
          <span>Address:</span>
          <StyledInput
            type="text"
            {...register('address', { required: 'this field is required' })}
            disabled
            placeholder="Select address on Google Maps"
          />
          {errors.address && <p>{errors.address?.message}</p>}
        </StyledSingleInputContainer>
      </StyledInputsContainer>
      <Map />
    </StyledFormContainer>
  );
};

const CartList = () => {
  const items = useAppSelector(selectSortedByAlphabetItems);
  return (
    <div className="listContainer">
      <StyledCartList>
        {items.map(item => {
          return <CartListItem item={item} key={item.id} />;
        })}
      </StyledCartList>
    </div>
  );
};

const CartListItem = ({ item }: TCartListItemProps) => {
  const dispatch = useAppDispatch();
  const handleRemoveItem = (itemId: string) =>
    dispatch(removeSingleItem(itemId));
  const handleIncreaseQuantity = (item: Medicine) => dispatch(addToCart(item));
  const handleDecreaseQuantity = (itemId: string) =>
    dispatch(decreaseQuantity(itemId));

  return (
    <StyledListItem>
      <StyledListItemCloseBtn
        type="button"
        onClick={() => handleRemoveItem(item.id)}
      >
        &times;
      </StyledListItemCloseBtn>
      <h3>{item.medicineTitle}</h3>
      <p>Price: {item.price}</p>
      <StyledListItemQuantityWrapper>
        <StyledListItemQuantity>{item.quantity}</StyledListItemQuantity>
        <StyledListItemQuantityBtn
          type="button"
          onClick={() =>
            handleIncreaseQuantity({
              id: item.id,
              medicineTitle: item.medicineTitle,
              pharmacy: item.pharmacy,
              price: item.price,
            } as Medicine)
          }
          className="up"
        >
          <IconArrow />
        </StyledListItemQuantityBtn>
        <StyledListItemQuantityBtn
          type="button"
          onClick={() => handleDecreaseQuantity(item.id)}
          className="down"
        >
          <IconArrow />
        </StyledListItemQuantityBtn>
      </StyledListItemQuantityWrapper>
    </StyledListItem>
  );
};

export default CartPage;
