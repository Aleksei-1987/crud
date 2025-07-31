/**
 * Renders a textarea for posting content.
 *
 * @param {string} content - The content of the textarea
 * @param {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} handleChange - The function to handle changes in the textarea
 * @return {JSX.Element} The rendered textarea component
 */
const PostFormTextarea = ({
  content,
  handleChange,
}: {
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="post__texterea" className="post__label__textarea">
        Напишите пост:
      </label>
      <textarea
        id="post__texterea"
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