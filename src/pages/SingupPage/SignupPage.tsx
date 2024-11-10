import { auth } from '@/app/firebase';
import { useAppDispatch } from '@/app/hooks';
import {
  apiLoginWithEmail,
  apiLoginWithGitHub,
  apiLoginWithGoogle,
  apiSignupWithEmail,
  apiSignupWithPhoneNumber,
  apiVerificationWithPhone,
} from '@/redux/auth/authOperations';
import { SignupInputs } from '@/types/FormType';
import { RecaptchaVerifier } from 'firebase/auth';
import { useEffect, useState } from 'react';
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

  const [signupMethod, setSignupMethod] = useState<null | 'email' | 'phone'>(
    null,
  );

  const [expandForm, setExpandForm] = useState<boolean>(false);

  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const [activeRequest, setActiveRequest] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignupInputs> = async data => {
    if (signupMethod === 'email') {
      try {
        setActiveRequest(true);
        await dispatch(apiSignupWithEmail(data)).unwrap();
      } catch (error) {
        if (typeof error === 'string') toast.error(error);
      } finally {
        setActiveRequest(false);
      }
    }
    if (signupMethod === 'phone') {
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
          console.log('nj');
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

  const onGoogleSignup = async () => {
    try {
      await dispatch(apiLoginWithGoogle()).unwrap();
    } catch (error) {
      if (typeof error === 'string') toast.error(error);
    }
  };

  const onGitHubSignup = async () => {
    try {
      await dispatch(apiLoginWithGitHub()).unwrap();
    } catch (error) {
      if (typeof error === 'string') toast.error(error);
    }
  };

  useEffect(() => {
    if (signupMethod) {
      // @ts-ignore: Unreachable code error
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
        },
      );
    }
  }, [signupMethod]);
  return (
    <div>
      {!signupMethod && (
        <ul>
          <li>
            <button
              type="button"
              onClick={() => {
                setSignupMethod('email');
              }}
            >
              Signup with Email
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setSignupMethod('phone');
              }}
            >
              Signup with Phone number
            </button>
          </li>
          <li>
            <button type="button" onClick={onGoogleSignup}>
              Signup with Google
            </button>
          </li>
          <li>
            <button type="button" onClick={onGitHubSignup}>
              Signup with Github
            </button>
          </li>
        </ul>
      )}
      {signupMethod && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type="button"
            onClick={() => {
              setSignupMethod(null);
            }}
            style={{ display: 'flex', cursor: 'pointer' }}
          >
            Go back
          </button>
          {signupMethod === 'email' && (
            <>
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
                {...register('password', {
                  required: 'This field is required',
                })}
                placeholder="Password"
              />
              {errors.password && <p>{errors.password?.message}</p>}
            </>
          )}
          {signupMethod === 'phone' && (
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
            Create Account
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
