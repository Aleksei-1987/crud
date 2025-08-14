import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import "./posts.css";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { data, isLoading, error, fetchNow } = useFetch({
    url: "http://localhost:5173/posts",
  });

  useEffect(() => {
    fetchNow(); // Отправляем запрос при монтировании компонента
  }, []);

  // Реализация метода handleDelete
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5173/posts/${id}`, {
        method: "DELETE",
      });
      fetchNow(); // Перезагружаем данные после успешного удаления
    } catch (err) {
      console.error('Ошибка при удалении поста:', err); // Логируем ошибку
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>; // Индикатор загрузки
  }

  if (error) {
    console.log('Ошибка:', error);
    return <div>Ошибка загрузки данных: {JSON.stringify(error)}</div>; // Вывод ошибки
  }

  if (!data || !data.length) {
    return <div>Нет доступных постов.</div>; // Нет данных
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