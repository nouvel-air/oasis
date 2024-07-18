import * as React from 'react';
import { Form, useTranslate, useNotify, useSafeSetState, TextInput, required, email } from 'react-admin';
import { useSearchParams } from 'react-router-dom';
import urlJoin from 'url-join';
import { Button, CardContent, CircularProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSignup } from '@semapps/auth-provider';
import validatePasswordStrength from './validatePasswordStrength';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PreSignupForm from './PreSignupForm';
import defaultPasswordScorer from './passwordScorer';
import { OrganizationInput } from '../../common/input';
import WaitingCard from './WaitingCard';

const useStyles = makeStyles(theme => ({
  icon: {
    margin: theme.spacing(0.3)
  }
}));

const SignupForm = ({ passwordScorer = defaultPasswordScorer, additionalSignupValues }) => {
  const [loading, setLoading] = useSafeSetState(false);
  const [waiting, setWaiting] = useSafeSetState(false);
  const signup = useSignup();
  const translate = useTranslate();
  const notify = useNotify();
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const interactionId = searchParams.get('interaction_id');
  const signupType = searchParams.get('type');
  const [password, setPassword] = React.useState('');

  const submit = values => {
    setLoading(true);
    signup({
      ...values,
      'pair:label': `${values['pair:firstName']} ${values['pair:lastName']?.toUpperCase()}`,
      'pair:hasType':
        signupType === 'societaire'
          ? urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'actor')
          : urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'types', 'agent'),
      interactionId,
      ...additionalSignupValues
    }).catch(error => {
      if (
        error.message === "Votre adresse mail n'est pas vérifiée. Veuillez cliquer sur le lien envoyé par mail." ||
        error.message === "Votre compte n'est pas activé. Veuillez attendre la confirmation par email."
      ) {
        setWaiting(true);
      } else {
        setLoading(false);
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
          {
            type: 'warning',
            _: typeof error === 'string' ? error : error && error.message ? error.message : undefined
          }
        );
      }
    });
  };

  if (!signupType) {
    return <PreSignupForm />;
  } else if (waiting) {
    return <WaitingCard isAgent={signupType !== 'societaire'} />;
  } else {
    return (
      <Form onSubmit={submit} noValidate defaultValues={{ email: searchParams.get('email') }}>
        <CardContent sx={{ pt: 0 }}>
          {signupType === 'societaire' ? (
            <Typography variant="body1" sx={{ pb: 3 }}>
              Veuillez sélectionner l'oasis ou l'organisation à laquelle vous appartenez. Un mail leur sera envoyé pour
              confirmer votre appartenance. Si votre organisation n'apparait pas ou si vous êtes sociétaire en tant
              qu'individu, veuillez <a href="mailto:contact@cooperative-oasis.org">nous écrire</a>.
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ pb: 3 }}>
              Pour les annonces immobilières, nous demandons un paiement via{' '}
              <a
                href="https://www.helloasso.com/associations/cooperative-oasis"
                target="_blank"
                rel="noopener noreferrer"
              >
                HelloAsso
              </a>{' '}
              de XXX euros par annonce. Votre annonce ne sera validée qu'une fois le paiement effectué.
            </Typography>
          )}
          {signupType === 'societaire' && (
            <OrganizationInput source="pair:affiliatedBy" label="Organisation" validate={[required()]} />
          )}
          <TextInput source="pair:firstName" label="Prénom" fullWidth validate={[required()]} />
          <TextInput source="pair:lastName" label="Nom de famille" fullWidth validate={[required()]} />
          <TextInput
            source="email"
            label={translate('auth.input.email')}
            autoComplete="email"
            fullWidth
            disabled={loading || (searchParams.has('email') && searchParams.has('force-email'))}
            validate={[required(), email()]}
          />
          {passwordScorer && password && !(searchParams.has('email') && searchParams.has('force-email')) && (
            <>
              <Typography variant="caption" style={{ marginBottom: 3 }}>
                {translate('auth.input.password_strength')}:{' '}
              </Typography>
              <PasswordStrengthIndicator password={password} scorer={passwordScorer} sx={{ width: '100%' }} />
            </>
          )}
          <TextInput
            source="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            label={translate('ra.auth.password')}
            autoComplete="new-password"
            fullWidth
            disabled={loading || (searchParams.has('email') && searchParams.has('force-email'))}
            validate={[required(), validatePasswordStrength(passwordScorer)]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            fullWidth
            className={classes.button}
          >
            {loading ? (
              <CircularProgress className={classes.icon} size={19} thickness={3} />
            ) : (
              translate('auth.action.signup')
            )}
          </Button>
        </CardContent>
      </Form>
    );
  }
};

SignupForm.defaultValues = {
  redirectTo: '/',
  additionalSignupValues: {}
};

export default SignupForm;
