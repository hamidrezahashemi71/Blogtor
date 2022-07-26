import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Loading from "../../components/_general/Loading";
import BlogCard from "../../components/_web/BlogCard";
import UserCard from "../../components/_web/UserCard";
import baseUrl from "../../lib/server";

const Home = () => {
  const [topBlogs, setTopBlogs] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/blog/top-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTopBlogs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/user/top-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTopUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <div className='relative bg-white overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <svg
              className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
              fill='currentColor'
              viewBox='0 0 100 100'
              preserveAspectRatio='none'
              aria-hidden='true'>
              <polygon points='50,0 100,0 50,100 0,100' />
            </svg>

            <main className='mt-10 mx-auto max-w-6xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl'>
                  <span className='block xl:inline'>
                    Start Learning Front End
                  </span>{" "}
                  <span className='block text-indigo-600 xl:inline'>
                    by reading & posting blogs!
                  </span>
                </h1>
                <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                  <div className='rounded-md shadow'>
                    <Link
                      to={"/signup"}
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
                      Get started
                    </Link>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:ml-3'>
                    <Link
                      to={"/blogs"}
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10'>
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
          <img
            className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
            src='https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
            alt=''
          />
        </div>
      </div>
      <div className='bg-blue-100 rounded-lg py-2 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-4 xl:mt-28'>
        <div className='sm:text-center lg:text-left'>
          <h1 className='text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl'>
            <span className='block xl:inline'>Top Blogs</span>
          </h1>
        </div>
        <div className='flex flex-wrap mt-4'>
          {topBlogs.length === 0 ? (
            <p className='font-semibold text-center text-xl text-blue-700'>
              There are no blogs yet!
            </p>
          ) : (
            topBlogs.map((blog) => {
              return <BlogCard key={blog._id} blog={blog} />;
            })
          )}
        </div>
      </div>
      <div className='bg-blue-100 rounded-lg py-2 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-4 xl:mt-28'>
        <div className='sm:text-center lg:text-left'>
          <h1 className='text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl'>
            <span className='block xl:inline'>Top Users</span>
          </h1>
        </div>
        <div className='flex flex-wrap mt-4'>
          {topUsers.length === 0 ? (
            <p className='font-semibold text-center text-xl text-blue-700'>
              There are no users yet!
            </p>
          ) : (
            topUsers.map((topUser) => {
              return <UserCard key={topUser._id} user={topUser} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
