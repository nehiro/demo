import classNames from 'classnames';
import { doc, setDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/button';
import { useAuth } from '../context/auth';
import { db, storage } from '../firebase/client';
import { User } from '../types/user';
import ImageSelector from './image-selector';

const UserForm = ({ isEditMode }: { isEditMode: boolean }) => {
  const { isLoading, fbUser, user } = useAuth();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  useEffect(() => {
    if (isEditMode && user) {
      reset(user);
    }
  }, [isEditMode, user]);

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push('/login');
    return null;
  }

  const submit = async (data: User) => {
    if (data.avatarURL.match(/^data:/)) {
      const imageRef = ref(storage, `users/${fbUser.uid}/avatar`);
      await uploadString(imageRef, data.avatarURL, 'data_url');
      data.avatarURL = await getDownloadURL(imageRef);
    }
    if (!data.avatarURL && user?.avatarURL) {
      const imageRef = ref(storage, `users/${fbUser.uid}/avatar`);
      await deleteObject(imageRef);
    }
    // console.log(data);
    const documentRef = doc(db, `users/${fbUser.uid}`);
    return setDoc(documentRef, data).then(() => {
      alert(isEditMode ? '更新しました' : 'ユーザーを作成しました');
      if (!isEditMode) {
        router.push('/');
      }
    });
  };
  return (
    <div className="container">
      <h1>{isEditMode ? 'プロフィール編集' : 'アカウント作成'}</h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <h2>プロフィール画像</h2>
          <ImageSelector control={control} name="avatarURL" />
        </div>
        <div>
          <label className="mb-0.5 block" htmlFor="name">
            名前*
          </label>
          <input
            className={classNames(
              'rounded border',
              errors.name ? 'border-red-500' : 'border-slate-300'
            )}
            {...register('name', {
              required: '必須入力です',
              maxLength: { value: 50, message: '最大50文字です' },
            })}
            autoComplete="name"
            id="name"
            name="name"
            type="text"
          />
          {errors.name && (
            <p className="mt-0.5 text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-0.5 block" htmlFor="nickname">
            ニックネーム*
          </label>
          <input
            className={classNames(
              'rounded border',
              errors.nickname ? 'border-red-500' : 'border-slate-300'
            )}
            {...register('nickname', {
              required: '必須入力です',
              maxLength: { value: 50, message: '最大50文字です' },
            })}
            autoComplete="off"
            id="nickname"
            name="nickname"
            type="text"
          />
          {errors.nickname && (
            <p className="mt-0.5 text-red-500">{errors.nickname.message}</p>
          )}
        </div>
        <div>
          <label className="mb-0.5 block" htmlFor="profile">
            プロフィール*
          </label>
          <textarea
            className={classNames(
              'rounded border',
              errors.profile ? 'border-red-500' : 'border-slate-300'
            )}
            {...register('profile', {
              required: '必須入力です',
              maxLength: { value: 255, message: '最大255文字です' },
            })}
            defaultValue=""
            id="profile"
            name="profile"
          />
          <p className="text-sm leading-none text-slate-400">
            {watch('profile')?.length || 0}/255
          </p>
          {errors.profile && (
            <p className="mt-0.5 text-red-500">{errors.profile.message}</p>
          )}
        </div>
        <Button disabled={isSubmitting}>
          {isEditMode ? '更新' : 'アカウント作成'}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
