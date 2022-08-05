import { ReactElement } from 'react';
import Layout from '../components/layout';
import UserForm from '../components/user-form';
import { useAuth } from '../context/auth';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
  const { user } = useAuth();

  return <UserForm isEditMode={true}></UserForm>;
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Profile;
