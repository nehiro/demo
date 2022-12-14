import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import PostItemCard from '../components/post-item-card';
import { useAuth } from '../context/auth';
import { adminDB } from '../firebase/server';
import styles from '../styles/Home.module.css';
import { Post } from '../types/post';
import { NextPageWithLayout } from './_app';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import 'swiper/css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async (context) => {
  const snap = await adminDB
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .get();
  const posts = snap.docs.map((doc) => doc.data() as Post);
  // console.log(posts, 'posts');
  return {
    props: {
      posts,
    },
  };
};

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  // console.log(posts, 'posts');
  const { user, isLoading } = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <div className="relative">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              loop
              modules={[Navigation, Pagination, Keyboard]}
              navigation={{
                nextEl: '#next',
                prevEl: '#prev',
              }}
              pagination={{
                el: '#pagenation',
                bulletClass: 'w-2 h-2 block bg-slate-400 cursor-pointer',
                bulletActiveClass: 'bg-blue-500',
                clickable: true,
              }}
              keyboard
            >
              {new Array(5).fill(null).map((_, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="z-10 aspect-video  bg-slate-200">
                      <p>{index}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div
              id="next"
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 cursor-pointer p-4 opacity-60"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </div>
            <div
              id="prev"
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 cursor-pointer p-4 opacity-60"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </div>
          </div>
          <div
            id="pagenation"
            className="mt-4 flex justify-center space-x-2"
          ></div>
        </div>
        <h2>???????????????</h2>
        {posts.length ? (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.id}>
                <PostItemCard post={post}></PostItemCard>
              </li>
            ))}
          </ul>
        ) : (
          <p>????????????????????????</p>
        )}
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
