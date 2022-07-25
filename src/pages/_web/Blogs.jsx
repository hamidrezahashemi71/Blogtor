import {useState, useEffect} from "react";
import Loading from "../../components/_general/Loading";
import BlogCard from "../../components/_web/BlogCard";
import Search from "../../components/_web/Search";
import baseUrl from "../../lib/server";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <Search searchVal={searchVal} setSearchVal={setSearchVal} />
      <div className='flex flex-wrap p-10 mx-auto '>
        {blogs.length === 0 ? (
          <p className='font-semibold text-center text-xl text-blue-700'>
            There are no blogs yet!
          </p>
        ) : (
          blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((blog) => {
              return <BlogCard key={blog._id} blog={blog} />;
            })
        )}
      </div>
    </>
  );
};

export default Blogs;
