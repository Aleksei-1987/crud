import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./PostsNew.css";
import PostFormContainer from "../posts/PostFormContainer";

const PostNew = () => {
  const [content, setContent] = useState<string>("");
  const [_id, setId] = useState<number>(0);
  const [loading, setLoading] = useState(false); // Добавлен флаг загрузки
  const [formError, setFormError] = useState<string | null>(null); // Добавлено состояние ошибки формы

  const { isLoading, error, fetchNow } = useFetch({
    url: "http://localhost:5173/posts",
    options: {
      method: "POST",
      body: JSON.stringify({ content }),
    },
  });

  // Извлекаем хранящиеся данные из Local Storage при загрузке компонента
  useEffect(() => {
    const storedContent = localStorage.getItem("content");
    const storedId = localStorage.getItem("id");

    if (storedContent !== null && storedContent.length > 0) {
      try {
        setContent(JSON.parse(storedContent));
      } catch (err) {
        console.error("Ошибка разбора JSON (контента): ", err);
        setContent("");
      }
    }

    if (storedId !== null && storedId.length > 0) {
      try {
        setId(Number(storedId));
      } catch (err) {
        console.error("Ошибка разбора JSON (идентификатора): ", err);
        setId(0);
      }
    }
  }, []);

  // Обработчик изменений в тексте
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim(); // Trim уберёт пробелы слева-справа
    setContent(value);
  };

  // Запрашивает сервер и увеличивает ID при успешной отправке
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.length === 0 || loading) {
      setFormError("Пост не может быть пустым.");
      return;
    }

    setLoading(true); // Начинаем показывать индикатор загрузки
    await fetchNow();

    if (error) {
      setFormError("Ошибка отправки поста: " + (error?.message || ""));
    } else {
      setId((id) => {
        const newId = id + 1;
        localStorage.setItem("id", String(newId)); // Сохраняем увеличенный ID
        return newId;
      });
      localStorage.removeItem("content"); // Удаляем контент после удачной отправки
      window.location.href = "/posts";
      setContent("");
      setFormError(null); // Очистка ошибки после успешной отправки
    }

    setLoading(false); // Завершаем индикаторы загрузки
  };

  return (
    <PostFormContainer
      content={content}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading || loading} // Комбинируем оба флага загрузки
      error={formError || (error && error.message) || null} // Объединяем внутренние и внешние ошибки
      contentLoadingButton="Отправка..."
      contentButton="Отправить"
    />
  );
};

export default PostNew;