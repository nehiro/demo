import { format } from 'date-fns';
import Link from 'next/link';
import { useUser } from '../lib/user';
import { Post } from '../types/post';

const PostItemCard = ({ post }: { post: Post }) => {
  const user = useUser(post.authorId);
  return (
    <div className="rounded-md p-4 shadow">
      <h2 className="line-clamp-2">
        <Link href={`/posts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h2>
      {user && (
        <div className="flex items-center">
          <img
            src={user.avatarURL}
            alt=""
            className="mr-2 block h-8 w-8 rounded-full"
          />
          <div>
            <p className="truncate">{user.name}</p>
            <p className="text-sm text-slate-500">
              {format(post.createdAt, 'yyyy年MM月dd日')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItemCard;
