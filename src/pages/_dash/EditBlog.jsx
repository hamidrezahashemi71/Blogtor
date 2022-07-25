import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import baseUrl from "../../lib/server";
import Wysiwyg from "../../components/_dash/Wysiwyg";
import Loading from "../../components/_general/Loading";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

const EditBlog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const cookies = new Cookies();
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    imgUrl: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/blog/single-blog/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogInfo({
          ...blogInfo,
          title: data.title,
          imgUrl: data.imgurl,
          content: data.content,
        });
      })
      .then(setLoading(false));
  }, []);

  const editBlog = () => {
    fetch(`${baseUrl}/blog/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: params.id,
        data: {
          title: blogInfo.title,
          content: editorRef.current.getContent(),
          imgurl: blogInfo.imgUrl,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Your blog has been updated successfully!");
        navigate("/dashboard/myblogs");
      });
  };

  if (loading) return <Loading />;
  return (
    <>
      <form className='pt-12 px-12 ml-52' onSubmit={(e) => e.preventDefault()}>
        <p className='text-3xl text-center text-blue-700 text- pt-10 mx-auto mb-5'>
          Edit Your Blog
        </p>
        <label htmlFor='chat' className='sr-only'>
          Blog title
        </label>
        <div className='flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'>
          <button
            type='button'
            className='p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
            <svg
              aria-hidden='true'
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                clipRule='evenodd'></path>
            </svg>
            <span className='sr-only'>Add emoji</span>
          </button>
          <textarea
            value={blogInfo.title}
            onChange={(e) => setBlogInfo({...blogInfo, title: e.target.value})}
            id='title'
            rows='1'
            className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Blog title...'></textarea>
          <textarea
            value={blogInfo.imgUrl}
            onChange={(e) => setBlogInfo({...blogInfo, imgUrl: e.target.value})}
            id='image-url'
            rows='1'
            className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Blog Image Url...'></textarea>
          <button
            onClick={editBlog}
            type='submit'
            className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'>
            <svg
              aria-hidden='true'
              className='w-6 h-6 rotate-90'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
            </svg>
            <span className='sr-only'>Send message</span>
          </button>
        </div>
        <Wysiwyg initialValue={blogInfo.content} editorRef={editorRef} />
      </form>
    </>
  );
};

export default EditBlog;
