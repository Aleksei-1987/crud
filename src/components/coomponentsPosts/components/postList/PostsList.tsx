import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./posts.css";
import { Link } from "react-router-dom";


const PostsList = () => {
  const { data, isLoading,  fetchNow } = useFetch({
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
      if (err instanceof Error) {
        console.error("Ошибка при удалении поста:", err.message);
      } else {
        console.error("Неожиданная ошибка:", err);
      }
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }


  return (
    <div>
      {data &&
        data.map((item) => (
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