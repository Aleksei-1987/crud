import { Route, Routes } from "react-router-dom";
import PostsList from "./components/postList/PostsList";
import PostNew from "./components/postNew/PostsNew";
import PostView from "./components/postView/PostView";


const ComponentPosts = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/new" element={<PostNew />} />
        <Route path="/posts/:postId" element={<PostView />} />
      </Routes>
    </>
  );
};
export default ComponentPosts;