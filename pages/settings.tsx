import { ReactElement } from 'react';
import Button from '../components/button';
import Layout from '../components/layout';
import { useAuth } from '../context/auth';
import { login } from '../lib/auth';
import { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>設定</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
        veritatis labore provident eaque quasi deleniti dolores iusto, natus eum
        nostrum laudantium sint modi eius animi saepe dolorum enim accusantium
        odit?
      </p>
    </div>
  );
};
Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Settings;
