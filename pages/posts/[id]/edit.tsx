import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
import PostForm from '../../../components/post-form';
import { NextPageWithLayout } from '../../_app';

const Edit: NextPageWithLayout = () => {
  return (
    <div className="container">
      <PostForm isEditMode={true} />
    </div>
  );
};
Edit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Edit;
