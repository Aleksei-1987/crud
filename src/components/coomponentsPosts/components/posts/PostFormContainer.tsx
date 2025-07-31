import PostFormButton from "./PostFormButton";
import PostFormError from "./PostFormError";
import PostFormHeader from "./PostFormHeader";
import PostFormTextarea from "./PostFormTextarea";
/**
 * рендерит новый пост ил пост для редактирования
 *
 * @param {string} content - The content to be posted
 * @param {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} handleChange - The function to handle content change
 * @param {(e: React.FormEvent<HTMLFormElement>) => void} handleSubmit - The function to handle form submission
 * @param {boolean} isLoading - Indicates if the form is currently loading
 * @param {null | string} error - The error that occurred during form submission, if any
 * @param {string} contentLoadingButton - The label for the loading button
 * @param {string} contentButton - The label for the regular button
 * @return {JSX.Element} The form container component
 */
const PostFormContainer = ({
  content,
  handleChange,
  handleSubmit,
  isLoading,
  error,
  contentLoadingButton,
  contentButton,
}: {
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: null | string;
  contentLoadingButton: string;
  contentButton: string;
}) => {
  return (
    <div className="post__container">
      <form action="" className="post__form" onSubmit={handleSubmit}>
        <PostFormHeader />
        <PostFormTextarea content={content} handleChange={handleChange} />
        <PostFormButton
          isLoading={isLoading}
          contentLoadingButton={contentLoadingButton}
          contentButton={contentButton}
        />
        {error && <PostFormError />}
      </form>
    </div>
  );
};

export default PostFormContainer;