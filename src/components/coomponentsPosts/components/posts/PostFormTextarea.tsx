const PostFormTextarea = ({
  content,
  handleChange,
}: {
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="post__textarea" className="post__label__textarea">
        Напишите пост:
      </label>
      <textarea
        id="post__textarea"
        value={content}
        onChange={handleChange}
        name="content"
        cols={20}
        rows={7}
      />
    </>
  );
};

export default PostFormTextarea;