/**
 * рендерит крестик на форме,
 * при клике на него переносит на главную страницу
 *
 * @return {JSX.Element} The PostFormHeader component
 */
const PostFormHeader = () => (
  <a href="/" className="close_btn">
    <span>✖</span>
  </a>
);
export default PostFormHeader;