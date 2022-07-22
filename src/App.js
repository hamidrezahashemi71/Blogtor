import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import WebLayout from "./layouts/WebLayout";
import Blogs from "./pages/_web/Blogs";
import Home from "./pages/_web/Home";
import Login from "./pages/_web/Login";
import Signup from "./pages/_web/Signup";
import SingleBlog from "./pages/_web/SingleBlog";
import SingleUser from "./pages/_web/SingleUser";
import Users from "./pages/_web/Users";

import DashLayout from "./layouts/DashLayout";
import PostBlog from "./pages/_dash/PostBlog";
import EditProfile from "./pages/_dash/EditProfile";
import EditBlog from "./pages/_dash/EditBlog";
import MyBlogs from "./pages/_dash/MyBlogs";

import NotFound from "./components/_general/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WebLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='blogs/:id' element={<SingleBlog />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<SingleUser />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>

        <Route path='/dashboard/' element={<DashLayout />}>
          <Route path='write' element={<PostBlog />} />
          <Route path='profile' element={<EditProfile />} />
          <Route path='editblog' element={<EditBlog />} />
          <Route path='myblogs' element={<MyBlogs />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
