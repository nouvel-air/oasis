import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslate, useGetIdentity, useAuthProvider, useNotify } from 'react-admin';
import { Card, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import makeStyles from '@mui/styles/makeStyles';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import NewPasswordForm from './NewPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import SimpleBox from './SimpleBox';
import getSearchParamsRest from './getSearchParamsRest';

const useStyles = makeStyles(() => ({
  switch: {
    marginBottom: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

/**
 * @param {object} props Props
 * @param {boolean} props.hasSignup If to show signup form.
 * @param {boolean} props.allowUsername Indicates, if login is allowed with username (instead of email).
 * @param {string} props.postSignupRedirect Location to redirect to after signup.
 * @param {string} props.postLoginRedirect Location to redirect to after login.
 * @param {object} props.additionalSignupValues
 * @returns
 */
const LocalLoginPage = ({
  hasSignup,
  allowUsername,
  postSignupRedirect,
  postLoginRedirect,
  additionalSignupValues
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const [searchParams] = useSearchParams();
  const notify = useNotify();
  const isSignup = hasSignup && searchParams.has('signup');
  const isResetPassword = searchParams.has('reset_password');
  const isActivated = searchParams.has('activated');
  const isNewPassword = searchParams.has('new_password');
  const isLogin = !isSignup && !isResetPassword && !isNewPassword;
  const redirectTo = searchParams.get('redirect');
  const interactionId = searchParams.get('interaction_id');
  const { data: identity, isLoading } = useGetIdentity();

  useEffect(() => {
    if (isActivated) {
      notify('Votre compte a bien été activé', { type: 'success' });
    }
  }, [isActivated, notify]);

  useEffect(() => {
    if (!isLoading && identity?.id) {
      if (postLoginRedirect) {
        navigate(`${postLoginRedirect}?${getSearchParamsRest(searchParams)}`);
      } else if (redirectTo && redirectTo.startsWith('http')) {
        window.location.href = redirectTo;
      } else {
        navigate(redirectTo || '/');
      }
    }
  }, [identity, isLoading, navigate, searchParams, redirectTo, postLoginRedirect, authProvider, interactionId]);

  const [title, text] = useMemo(() => {
    if (isSignup) {
      return ['Inscription', ''];
    }
    if (isLogin) {
      return ['auth.action.login', 'auth.helper.login'];
    }
    if (isResetPassword) {
      return ['auth.action.reset_password', 'auth.helper.reset_password'];
    }
    if (isNewPassword) {
      return ['auth.action.set_new_password', 'auth.helper.set_new_password'];
    }
  }, [isSignup, isLogin, isResetPassword, isNewPassword]);

  if (isLoading || identity?.id) return null;

  return (
    <SimpleBox title={translate(title)} text={translate(text)} icon={<LockIcon />}>
      <Card>
        {isSignup && (
          <SignupForm
            delayBeforeRedirect={4000}
            postSignupRedirect={postSignupRedirect}
            additionalSignupValues={additionalSignupValues}
          />
        )}
        {isResetPassword && <ResetPasswordForm />}
        {isNewPassword && <NewPasswordForm redirectTo={redirectTo} />}
        {isLogin && <LoginForm postLoginRedirect={postLoginRedirect} allowUsername={allowUsername} />}
        <div className={classes.switch}>
          {(isSignup || isResetPassword) && (
            <Link to={`/login?${getSearchParamsRest(searchParams)}`}>
              <Typography variant="body2">{translate('auth.action.login')}</Typography>
            </Link>
          )}
          {isLogin && (
            <>
              {hasSignup && (
                <div>
                  <Link to={`/login?signup=true&${getSearchParamsRest(searchParams)}`}>
                    <Typography variant="body2">{translate('auth.action.signup')}</Typography>
                  </Link>
                </div>
              )}
              <div>
                <Link to={`/login?reset_password=true&${getSearchParamsRest(searchParams)}`}>
                  <Typography variant="body2">{translate('auth.action.reset_password')}</Typography>
                </Link>
              </div>
            </>
          )}
        </div>
      </Card>
    </SimpleBox>
  );
};

LocalLoginPage.defaultProps = {
  hasSignup: true,
  allowUsername: false,
  additionalSignupValues: {}
};

export default LocalLoginPage;
