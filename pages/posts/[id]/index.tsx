import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../../../components/layout';
import { useAuth } from '../../../context/auth';
import { adminDB } from '../../../firebase/server';
import { useUser } from '../../../lib/user';
import { Post } from '../../../types/post';
import { NextPageWithLayout } from '../../_app';

export const getStaticProps: GetStaticProps<{
  post: Post;
}> = async (context) => {
  const snap = await adminDB.doc(`posts/${context.params?.id}`).get();
  const post = snap.data() as Post;
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const PostDetailPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  const { fbUser } = useAuth();
  const user = useUser(post?.authorId);
  const isAuthor = fbUser?.uid === post?.authorId;

  if (!post) {
    return <p>記事が存在しません。</p>;
  }

  return (
    <div className="container">
      <div className="aspect-video bg-slate-200 mb-4 rounded-md"></div>
      <h1 className="font-bold text-lg mb-2">{post.title}</h1>
      {user && (
        <div className="flex mb-4">
          <div className="w-10 h-10 bg-slate-400 rounded-full mr-2"></div>
          <div className="flex-1">
            <p>{user.name}</p>
            <p className="text-slate-600">
              {format(post.createdAt, 'yyyy年MM月dd日')}
            </p>
          </div>
        </div>
      )}
      <p>{post.body}</p>
      {isAuthor && (
        <Link href={`/posts/${post.id}/edit`}>
          <a className="text-slate-500">編集</a>
        </Link>
      )}
    </div>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default PostDetailPage;
