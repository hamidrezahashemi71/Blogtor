import React from "react";

const AddComment = ({commentBlog, myComment, setMyComment}) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='h-80 px-7 w-[700px] rounded-[12px] bg-white p-4'>
        <p className='text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black'>
          Add Comment/Questions
        </p>
        <textarea
          value={myComment}
          onChange={(e) => setMyComment(e.target.value)}
          className='h-40 px-3 text-sm py-1 mt-5 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm'
          placeholder='Add your comments here'></textarea>

        <div className='flex justify-between mt-2'>
          <button
            onClick={commentBlog}
            className='h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600'>
            Submit comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
