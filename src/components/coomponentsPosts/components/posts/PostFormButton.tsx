/**
 * Рендерит кнопку под формой.
 *
 * @param {boolean} isLoading - Indicates whether the button is in a loading state
 * @param {string} contentLoadingButton - The content to display on the button when in a loading state
 * @param {string} contentButton - The content to display on the button when not in a loading state
 * @return {JSX.Element} The rendered button component
 */
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