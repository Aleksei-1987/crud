import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./posts.css";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { data, isLoading, error, fetchNow } = useFetch({
    url: "http://localhost:7070/posts",
  });

  useEffect(() => {
    fetchNow();
  }, []);

  
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:7070/posts/${id}`, {
        method: "DELETE",
      });
      fetchNow();
    } catch (err) {
      console.error('Ошибка при удалении поста:', err);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    console.log('Ошибка:', error);
    return <div>Ошибка загрузки данных: {JSON.stringify(error)}</div>;
  }

  if (!data || !data.length) {
    return <div>Нет доступных постов.</div>;
  }

  return (
    
    <div>
      {data.map((item) => (
    
        <div key={item.id} className="posts__list_item">
          <p>{item.content}</p>
          <button onClick={() => handleDelete(item.id)}>Удалить</button>
          <Link to={`/posts/${item.id}`}>
            <button>Редактировать</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsList;