import {useState, useEffect} from "react";
import MyBlogCard from "../../components/_dash/MyBlogCard";
import baseUrl from "../../lib/server";
import Loading from "../../components/_general/Loading";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

const MyBlogs = () => {
  const [thisUserBlogs, setThisUserBlogs] = useState([]);
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = () => {
    fetch(`${baseUrl}/blog/my-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setThisUserBlogs(data);
      })
      .then(setLoading(false));
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const deleteBlog = (blogId) => {
    fetch(`${baseUrl}/blog/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({blogId}),
    })
      .then((res) => res.json())
      .then(({msg}) => {
        if (msg === "ok") fetchMyBlogs();
      })
      .then(toast.info("Your blog has been removed."));
  };

  if (loading) return <Loading />;
  // console.log(thisUserBlogs);
  return (
    <>
      {thisUserBlogs.length ? (
        thisUserBlogs.map((blog) => {
          return (
            <MyBlogCard key={blog._id} blog={blog} deleteBlog={deleteBlog} />
          );
        })
      ) : (
        <div className='pt-10 flex items-center space-x-2 justify-center'>
          <div className='w-4 h-1 rounded-full bg-blue-700'></div>
          <p className='font-semibold text-lg '>You have no blogs !</p>
          <div className='w-4 h-1 rounded-full bg-blue-700'></div>
        </div>
      )}
    </>
  );
};

export default MyBlogs;
