import { auth } from '../firebase/client';

export const revalidate = async (path: string) => {
  const token = await auth.currentUser?.getIdToken(true);
  return fetch(`/api/revalidate?path=${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
