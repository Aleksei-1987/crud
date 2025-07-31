import { Route, Routes } from "react-router-dom";
import PostsList from "./components/postList/PostsList";
import PostNews from "./components/postNew/PostsNew";
import PostView from "./components/postView/PostView";


/**
 * Renders a component to display different routes for displaying posts.
 *
 * @return {JSX.Element} The rendered component for displaying routes.
 */
const ComponentPosts = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/new" element={<PostNews />} />
        <Route path="/posts/:postId" element={<PostView />} />
      </Routes>
    </>
  );
};
export default ComponentPosts;