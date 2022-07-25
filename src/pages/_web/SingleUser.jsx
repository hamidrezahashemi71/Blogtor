import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import ReactStars from "react-stars";
import Loading from "../../components/_general/Loading";
import NotFound from "../../components/_general/NotFound";
import baseUrl from "../../lib/server";
import moment from "moment";
import BlogCard from "../../components/_web/BlogCard";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [thisUserBlogs, setThisUserBlogs] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/user/singleUser/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("single user: ", data);
        if (data.msg === "bad request: no such user found") setNotFound(true);
        setUser(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/blog/by-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("blog by user: ", data);
        setThisUserBlogs(data);
      });
  }, []);

  const submitRate = (newRating) => {
    if (!cookies.get("ut"))
      return toast.warn("Only Blogtor users can submit ratings!");
    fetch(`${baseUrl}/blog/submit-rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: params.id,
        score: Number(newRating),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        return toast.success("Thanks for contributing!");
      });
  };

  if (loading) return <Loading />;
  if (notFound) return <NotFound />;
  // console.log(user);
  return (
    <>
      <main className='profile-page'>
        <section className='relative block' style={{height: "500px"}}>
          <div
            className='absolute top-0 w-full h-full bg-center bg-cover'
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}>
            <span
              id='blackOverlay'
              className='w-full h-full absolute opacity-50 bg-black'></span>
          </div>
          <div
            className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden'
            style={{height: "70px"}}>
            <svg
              className='absolute bottom-0 overflow-hidden'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'>
              <polygon
                className='text-gray-300 fill-current'
                points='2560 0 2560 100 0 100'></polygon>
            </svg>
          </div>
        </section>
        <section className='relative py-16 bg-gray-300'>
          <div className='container mx-auto px-4'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                    <div className='relative'>
                      <img
                        alt='user-avatar'
                        src={
                          user.avatar === ""
                            ? "/assets/images/user.png"
                            : `${baseUrl}/${user.avatar}`
                        }
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16'
                        style={{maxWidth: "150px"}}
                      />
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                    <div className='py-6 px-3 mt-32 sm:mt-0'>
                      <button
                        onClick={() => navigate(-1)}
                        className='bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1'
                        type='button'
                        style={{transition: "all .15s ease"}}>
                        Back
                      </button>
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-1'>
                    <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-gray-700'>
                          {user.averageScore}
                        </span>
                        <span className='text-sm text-gray-500'>Rating</span>
                      </div>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-gray-700'>
                          {user.blogs.length}
                        </span>
                        <span className='text-sm text-gray-500'>Blogs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-12'>
                  <h3 className='text-4xl font-semibold leading-normal text-gray-800 mb-2'>
                    {user.name}
                  </h3>
                  <div className='text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase'>
                    <i className='fas fa-map-marker-alt mr-2 text-lg text-gray-500'></i>{" "}
                    {`Username: ${user.username}`}
                  </div>
                  <div className='mb-2 text-gray-700 mt-10'>
                    <i className='fas fa-briefcase mr-2 text-lg text-gray-500'></i>
                    Joined:
                  </div>
                  <div className='mb-2 text-gray-700'>
                    <i className='fas fa-university mr-2 text-lg text-gray-500'></i>
                    {moment(user.createdAt, "YYYYMMDD").fromNow()}
                  </div>
                </div>
                <div className='mt-10 py-10 border-t border-gray-300 text-center'>
                  <div className='flex flex-wrap justify-center'>
                    <div className='w-full lg:w-9/12 px-4'>
                      <p className='mb-4 text-lg leading-relaxed text-gray-800'>
                        {user.bio === ""
                          ? `${user.name} has not added any bio yet.`
                          : user.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className='flex items-center justify-between my-5 px-10 py-5 max-w-3xl mx-auto bg-gray-700 rounded-lg'>
        <div>
          <p className='text-center text-white'>Rating:</p>
          <ReactStars
            count={5}
            edit={false}
            value={user.averageScore}
            size={24}
            color2={"#ffd700"}
          />
        </div>
        <div>
          <p className='text-center text-white'>Rate This User:</p>
          <ReactStars
            count={5}
            onChange={submitRate}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      </div>
      <div className='bg-blue-100 rounded-lg py-2 mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-4 xl:mt-28'>
        <div className='sm:text-center lg:text-left'>
          <h1 className='text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-3xl'>
            <p className='block xl:inline'>
              Blogs by{" "}
              <span className='text-blue-700 text-semibold'>
                {user.username}
              </span>
            </p>
          </h1>
        </div>
        <div className='flex flex-wrap mt-4'>
          {thisUserBlogs.length === 0 ? (
            <p>{`${user.username} has not posted any blogs yet.`}</p>
          ) : (
            thisUserBlogs.map((blog) => {
              return <BlogCard blog={blog} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default SingleUser;
