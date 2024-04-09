import { useForm } from 'react-hook-form';
import { StyledForm, StyledFormContainer } from './CartPage.styled';
import { useAppSelector } from '@/app/hooks';

type Values = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const CartPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>();
  const onSubmit = (data: Values): void => console.log(data);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <CartForm register={register} errors={errors} />
      <CartList />
      <div className="totalContainer">
        <span>Total price:</span>
        <button type="submit">Submit</button>
      </div>
    </StyledForm>
  );
};

const CartForm = ({ register, errors }) => {
  return (
    <StyledFormContainer className="formContainer">
      <label>
        <span>Name:</span>
        <input type="text" {...register('name', { required: 'this field is required' })} />
        {errors.name && <p>{errors.name?.message}</p>}
      </label>
      <label>
        <span>Email:</span>
        <input type="email" {...register('email', { required: 'this field is required' })} />
        {errors.email && <p>{errors.email?.message}</p>}
      </label>
      <label>
        <span>Phone:</span>
        <input type="tel" {...register('phone', { required: 'this field is required' })} />
        {errors.phone && <p>{errors.phone?.message}</p>}
      </label>
      <label>
        <span>Address:</span>
        <input type="text" {...register('address', { required: 'this field is required' })} />
        {errors.address && <p>{errors.address?.message}</p>}
      </label>
    </StyledFormContainer>
  );
};

const CartList = () => {
  const items = useAppSelector(state => state.cart.cartItems);
  return (
    <div className="listContainer">
      <ul>
        <li>
          <button type="button">&times;</button>
          <h3>Name</h3>
          <p>Price</p>
          <div>
            <span>Quantity</span>
            <button type="button">Up</button>
            <button type="button">Down</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartPage;
