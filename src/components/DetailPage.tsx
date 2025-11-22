import classes from '../styles/Detail.module.scss'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [fetched, setFetched] = useState(false);
  
  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setFetched(false);
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setFetched(true);
    };
    fetcher();
  }, [id]);

  if (!fetched) return <div>読み込み中...</div>;
  if (!post) return <div>投稿が見つかりません</div>;

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