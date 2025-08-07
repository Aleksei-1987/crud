const PostFormButton = ({
  isLoading,
  contentLoadingButton,
  contentButton,
}: {
  isLoading: boolean;
  contentLoadingButton: string;
  contentButton: string;
}) => (
  <button type="submit" disabled={isLoading}>
    {isLoading ? `${contentLoadingButton}...` : `${contentButton}`}
  </button>
);

export default PostFormButton;