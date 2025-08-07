import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./PostsNew.css";
import PostFormContainer from "../posts/PostFormContainer";

const PostNew = () => {
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<number>(0);

  const { isLoading, error, fetchNow, data } = useFetch({
    url: "http://localhost:7070/posts",
    options: {
      method: "POST",
      body: JSON.stringify({ id, content }),
    },
  });

  console.info(error);
  console.info(data); // Проверяем полученные данные

  // Сохраняет новый текст в Local Storage
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    localStorage.setItem("content", JSON.stringify(value));
  };

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

  // Запрашивает сервер и увеличивает ID при успешной отправке
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchNow();
    setId((prevId) => {
      const newId = prevId + 1;
      localStorage.setItem("id", String(newId)); // Сохраняем увеличенный ID
      return newId;
    });
    window.location.href = "/";
    setContent("");
  };

  return (
    <PostFormContainer
      content={content}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      contentLoadingButton={"Отправка..."}
      contentButton={"Отправить"}
    />
  );
};

export default PostNew;