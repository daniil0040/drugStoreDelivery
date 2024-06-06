import { useAppDispatch } from '@/app/hooks';
import {
  apiSignupWithEmail,
  apiSignupWithGoogle,
} from '@/redux/auth/authOperations';
import { SignupInputs } from '@/types/FormType';
import { FirebaseError } from 'firebase/app';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {};

const SignupPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = data =>
    dispatch(apiSignupWithEmail(data));

  const onGoogleSignup = async () => {
    try {
      await dispatch(apiSignupWithGoogle()).unwrap();
      // toast.success('Successfully created!');
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'This field is required' })}
        placeholder="First Name"
      />
      {errors.name && <p>{errors.name?.message}</p>}
      <input
        {...register('email', { required: 'This field is required' })}
        placeholder="E-mail"
      />
      {errors.email && <p>{errors.email?.message}</p>}

      <input
        {...register('password', { required: 'This field is required' })}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password?.message}</p>}

      <button type="submit">Create Account</button>
      <ul>
        <li>
          <button type="button" onClick={onGoogleSignup}>
            Login with Google
          </button>
        </li>
        <li>
          <button type="button">Login with Github</button>
        </li>
      </ul>
    </form>
  );
};

export default SignupPage;
