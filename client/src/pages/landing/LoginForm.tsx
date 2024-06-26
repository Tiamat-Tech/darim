import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getI18n } from '../../utils/i18n';
import * as authApi from '../../api/auth';
import * as userApi from '../../api/user';
import { TextField, Button, Container, Section, LoadingDots } from '../../components';
import { Session } from '../../models';

interface Props {
  sessionState: [Session | null, React.Dispatch<React.SetStateAction<Session | null>>];
  hasSignUpButton?: boolean;
}

const SignUpButton = styled(Button)`
  border-left: 0;
`;

const FullWidthTextField = styled(TextField)`
  flex: 4;
  width: 100%;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 14px;
  color: #0366d6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm: React.FC<Props> = ({ sessionState , hasSignUpButton }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setSession = sessionState[1];

  const [isSigning, setIsSigning] = useState(false);

  const i18n = getI18n({
    signIn: {
      ko: '로그인 ↗',
      en: 'Sign in ↗',
    },
    signUp: {
      ko: '회원가입 ↗',
      en: 'Sign up ↗',
    },
    signing: {
      ko: '안전한 암호화 알고리즘으로 로그인 중입니다',
      en: 'Signing up with secure encryption algorithm',
    },
    forgotPassword: {
      ko: '비밀번호를 잊으셨나요?',
      en: 'Forgot password?',
    },
  });

  const login = async () => {
    setIsSigning(true);
    const accessToken = await authApi.login(email, password);
    if (accessToken) {
      const user = await userApi.fetchUser(accessToken);
      if (user) {
        const fetchedSession: Session = { user, accessToken };
        setIsSigning(false);
        setSession(fetchedSession);
      } else {
        setIsSigning(false);
      }
    } else {
      setIsSigning(false);
    }
  };

  return <Container>
    {!isSigning ? (
      <Section>
        <Section nowrap>
          <form onSubmit={login}>
            <Section row>
              <FullWidthTextField type='email' placeholder={i18n.text('email')} value={email} onChange={({ target: { value } }) => setEmail(value)} />
              <FullWidthTextField type='password' placeholder={i18n.text('password')} value={password} onChange={({ target: { value } }) => setPassword(value)}/>
              <Button onClick={login}>{i18n.text('signIn')}</Button>
            </Section>
          </form>
          {hasSignUpButton && (
            <Link to='/join'>
              <SignUpButton>{i18n.text('signUp')}</SignUpButton>
            </Link>
          )}
        </Section>
        <Section top={12}>
          <span><ForgotPasswordLink to='/password_reset'>{i18n.text('forgotPassword')}</ForgotPasswordLink></span>
        </Section>
      </Section>
    ) : (
      <Section row>
        {i18n.text('signing')}
        <LoadingDots />
      </Section>
    )}
  </Container>
};

export default LoginForm;
