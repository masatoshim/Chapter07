import classes from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [fetched, setFetched] = useState(false);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setFetched(false);
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
      const data = await res.json();
      setPosts(data.posts);
      setFetched(true);
    };
    fetcher();
  }, []);

  if (!fetched) return <div>読み込み中...</div>;
  if (!posts) return <div>投稿が見つかりません</div>;

  return (
    <>
      <div className={classes.container}>
        <ul>
          {posts.map((post) => (
            <li className={classes.list} key={post.id}>
              <Link to={`/posts/${post.id}`} className={classes.link}>
                <div className={classes.post}>
                  <div>
                    <div className={classes.postInfo}>
                      <div className={classes.postDate}>{ new Date(post.createdAt).toLocaleDateString('ja-JP') }</div>
                      <div className={classes.postCategories}>
                        { post.categories.map((category, index) => <div className={classes.postCategory} key={`${post.id}-${index}`}>{category}</div>) }
                      </div>
                    </div>
                    <p className={classes.postTitle}>{ post.title }</p>
                    <div className={classes.postBody} dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}