import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./PostsNew.css";
import PostFormContainer from "../posts/PostFormContainer";

const PostNew = () => {
  const [content, setContent] = useState<string>("");
  const [_id, setId] = useState<number>(0);
  const [loading, setLoading] = useState(false); 
  const [formError, setFormError] = useState<string | null>(null); 

  const { isLoading, error, fetchNow } = useFetch({
    url: "http://localhost:7070/posts",
    options: {
      method: "POST",
      body: JSON.stringify({ content }),
    },
  });

  
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

 
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim(); 
    setContent(value);
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.length === 0 || loading) {
      setFormError("Пост не может быть пустым.");
      return;
    }

    setLoading(true); 
    await fetchNow();

    if (error) {
      setFormError("Ошибка отправки поста: " + (error?.message || ""));
    } else {
      setId((id) => {
        const newId = id + 1;
        localStorage.setItem("id", String(newId)); 
        return newId;
      });
      localStorage.removeItem("content"); 
      window.location.href = "/posts";
      setContent("");
      setFormError(null); 
    }

    setLoading(false); 
  };

  return (
    <PostFormContainer
      content={content}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading || loading} 
      error={formError || (error && error.message) || null} 
      contentLoadingButton="Отправка..."
      contentButton="Отправить"
    />
  );
};

export default PostNew;