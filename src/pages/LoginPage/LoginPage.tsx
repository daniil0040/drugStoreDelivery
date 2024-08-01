import { auth } from '@/app/firebase';
import { useAppDispatch } from '@/app/hooks';
import {
  apiLoginWithEmail,
  apiLoginWithGitHub,
  apiLoginWithGoogle,
  apiSignupWithPhoneNumber,
  apiVerificationWithPhone,
} from '@/redux/auth/authOperations';
import { Login } from '@/types';
import { LoginInputs } from '@/types/FormType';
import { RecaptchaVerifier } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {};

const LoginPage = (props: Props) => {
  const [loginMethod, setLoginMethod] = useState<null | 'email' | 'phone'>(
    null,
  );

  const [expandForm, setExpandForm] = useState<boolean>(false);

  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const [activeRequest, setActiveRequest] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    if (loginMethod === 'email') {
      setActiveRequest(true);
      await dispatch(apiLoginWithEmail(data)).unwrap();
    }
    if (loginMethod === 'phone') {
      if (data.phone) {
        try {
          setActiveRequest(true);
          await dispatch(apiSignupWithPhoneNumber(data)).unwrap();
          setExpandForm(true);
          toast.success('Confirmation code was sent via SMS');
        } catch (error) {
          setExpandForm(false);
          if (typeof error === 'string') toast.error(error);
        } finally {
          setActiveRequest(false);
        }
      }
    }
  };

  const onPhoneNubmerVerification = e => {
    const code = e.currentTarget.value;
    setConfirmationCode(code);
    if (code.length === 6) {
      dispatch(apiVerificationWithPhone(code));
    }
  };

  const onGoogleLogin = async () => {
    try {
      await dispatch(apiLoginWithGoogle()).unwrap();
    } catch (error) {
      if (typeof error === 'string') toast.error(error);
    }
  };

  const onGitHubLogin = async () => {
    try {
      await dispatch(apiLoginWithGitHub()).unwrap();
    } catch (error) {
      if (typeof error === 'string') toast.error(error);
    }
  };

  useEffect(() => {
    if (loginMethod) {
      // @ts-ignore: Unreachable code error
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
        },
      );
    }
  }, [loginMethod]);

  return (
    <div>
      {!loginMethod && (
        <ul>
          <li>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('email');
              }}
            >
              Login with Email
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('phone');
              }}
            >
              Login with Phone number
            </button>
          </li>
          <li>
            <button type="button" onClick={onGoogleLogin}>
              Login with Google
            </button>
          </li>
          <li>
            <button type="button" onClick={onGitHubLogin}>
              Login with Github
            </button>
          </li>
        </ul>
      )}
      {loginMethod && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            onClick={() => {
              setLoginMethod(null);
            }}
            style={{ display: 'flex', cursor: 'pointer' }}
          >
            Go back
          </button>
          {loginMethod === 'email' && (
            <>
              {/* <input
                {...register('name', { required: 'This field is required' })}
                placeholder="First Name"
              />
              {errors.name && <p>{errors.name?.message}</p>} */}
              <input
                {...register('email', { required: 'This field is required' })}
                placeholder="E-mail"
              />
              {errors.email && <p>{errors.email?.message}</p>}

              <input
                {...register('password', {
                  required: 'This field is required',
                })}
                placeholder="Password"
              />
              {errors.password && <p>{errors.password?.message}</p>}
            </>
          )}
          {loginMethod === 'phone' && (
            <>
              <input
                {...register('phone', { required: 'This field is required' })}
                placeholder="Phone number"
              />
              {expandForm && (
                <input
                  placeholder="Verification code"
                  value={confirmationCode}
                  onChange={onPhoneNubmerVerification}
                  maxLength={6}
                />
              )}
            </>
          )}
          <div>
            <div id="recaptcha-container"></div>
          </div>
          <button type="submit" disabled={activeRequest}>
            Login in to Account
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
