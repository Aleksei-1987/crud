import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import PostFormContainer from "../posts/PostFormContainer";

const PostView = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<string>("");

  const { data, isLoading, error, fetchNow } = useFetch({
    url: `http://localhost:7070/posts/${postId}`,
  });

  useEffect(() => {
    fetchNow();
  }, [postId]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const foundPost = data.find(post => post.id === Number(postId));
      if (foundPost) {
        setContent(foundPost.content);
      }
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:7070/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ postId, content }),
      });
      setContent("");
      window.location.href = "/";
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <PostFormContainer
      content={content}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      contentLoadingButton="Сохранение..."
      contentButton="Сохранить"
    />
  );
};

export default PostView;