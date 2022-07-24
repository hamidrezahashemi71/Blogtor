import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {useState, useEffect} from "react";
import baseUrl from "./lib/server";

import Cookies from "universal-cookie";

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
import Loading from "./components/_general/Loading";
import Welcome from "./components/_general/Welcome";
import AccessDenied from "./components/_general/AccessDenied";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser, userSelect} from "./features/Slice";

function App() {
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const dispatch = useDispatch(); 
  const currentUser = useSelector(userSelect);

  useEffect(() => {
    fetch(`${baseUrl}/user/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setCurrentUser(data));
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />

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

          <Route
            path='/dashboard/'
            element={currentUser._id ? <DashLayout /> : <AccessDenied />}>
            <Route path='/dashboard/' element={<Welcome />} />
            <Route path='write' element={<PostBlog />} />
            <Route path='profile' element={<EditProfile />} />
            <Route path='editblog' element={<EditBlog />} />
            <Route path='myblogs' element={<MyBlogs />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
