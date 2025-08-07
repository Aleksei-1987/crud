import PostFormButton from "./PostFormButton";
import PostFormError from "./PostFormError";
import PostFormHeader from "./PostFormHeader";
import PostFormTextarea from "./PostFormTextarea";

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