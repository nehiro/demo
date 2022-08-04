import Router, { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import { useAuth } from '../context/auth';
import { login, logout } from '../lib/auth';
import { NextPageWithLayout } from './_app';

const LoginPage: NextPageWithLayout = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push('/');
  }
  return (
    <div>
      <h1>ログイン</h1>
      <Button type="button" onClick={login}>
        ログインする
      </Button>
    </div>
  );
};
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default LoginPage;
