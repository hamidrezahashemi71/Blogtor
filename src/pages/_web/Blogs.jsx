import {useState} from "react";
import Loading from "../../components/_general/Loading";
import BlogCard from "../../components/_web/BlogCard";
import Search from "../../components/_web/Search";

const Blogs = () => {
  const [loading, setLoading] = useState(false);

  if (loading) return <Loading />;
  return (
    <>
      <Search />
      <div className='flex flex-wrap p-10 mx-auto '>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </>
  );
};

export default Blogs;
