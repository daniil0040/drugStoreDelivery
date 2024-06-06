import { useAppDispatch } from '@/app/hooks';
import { apiLoginWithEmail } from '@/redux/auth/authOperations';
import { Login } from '@/types';
import { LoginInputs } from '@/types/FormType';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {};

const LoginPage = (props: Props) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<LoginInputs> = data =>
    dispatch(apiLoginWithEmail(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'This field is required' })}
        placeholder="E-mail"
      />
      {errors.email && <p>{errors.email?.message}</p>}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register('password', { required: 'This field is required' })}
        placeholder="Password"
      />
      {/* errors will return when field validation fails  */}
      {errors.password && <p>{errors.password?.message}</p>}

      <button type="submit">Login</button>
      <ul>
        <li>
          <button type="button">Login with Google</button>
        </li>
        <li>
          <button type="button">Login with Github</button>
        </li>
      </ul>
    </form>
  );
};

export default LoginPage;
