import classes from '../styles/Detail.module.scss'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostType, BlogType } from './common';

// 投稿を取得する関数
const fetchPost: (id?: string) => Promise<BlogType> = async (id?) => {
  if (!id) throw new Error("Post ID is required");
  const res: Response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
  if (!res.ok) throw new Error(res.statusText);
  return await res.json() as BlogType;
};

export default function DetailPage() {
  const { id } = useParams<string>();
  const [post, setPost] = useState<PostType | null>(null);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // APIでpostを取得する処理をuseEffectで実行します。
  useEffect(() => {
    setFetched(false);
    fetchPost(id)
      .then(result => setPost(result.post))
      .catch(err => setError(err.message))
      .finally(() => setFetched(true));
  }, [id]);

  if (!fetched) return <div>読み込み中...</div>;
  if (!post) return <div>投稿が見つかりません</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <div className={classes.postImage}><img src={ post.thumbnailUrl } alt="" /></div>
        <div className={classes.postContent}>
          <div className={classes.postInfo}>
            <div className={classes.postDate}>{ new Date(post.createdAt).toLocaleDateString('ja-JP') }</div>
            <div className={classes.postCategories}>
              { post.categories.map((category, index) => <div className={classes.postCategory} key={`${post.id}-${index}`}>{category}</div>) }
            </div>
          </div>
          <h1 className={classes.postTitle}>{ post.title }</h1>
          <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}