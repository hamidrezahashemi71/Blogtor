import React from "react";

const EditProfile = () => {
  return (
    <>
      <form className='pt-12 px-12 ml-52' onSubmit={(e) => e.preventDefault()}>
        <p className='text-3xl text-center text-blue-700 text- pt-10 mx-auto mb-5'>
          Edit Your Profile
        </p>
        <div className='flex items-center justify-center mb-5'>
          <div className='shrink-0'>
            <img
              src={"/assets/images/user.png"}
              className='rounded-full w-28'
              alt='Avatar'
            />
          </div>
        </div>
        <label htmlFor='chat' className='sr-only'>
          Name
        </label>
        <div className='flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'>
          <button
            type='button'
            className='inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
            <svg
              aria-hidden='true'
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                clipRule='evenodd'></path>
            </svg>
            <span className='sr-only'>Upload image</span>
          </button>
          <textarea
            id='chat'
            rows='1'
            className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Name ... '></textarea>
          <button
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
        <textarea
          className='mt-5 rounded w-full p-2 resize-none mb-5'
          rows={10}
          placeholder='My bio ...'></textarea>
      </form>
    </>
  );
};

export default EditProfile;
