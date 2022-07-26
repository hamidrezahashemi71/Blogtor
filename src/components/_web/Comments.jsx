import baseUrl from "../../lib/server";
import moment from "moment";

const Comments = ({comments}) => {
  return (
    <>
      {comments.length ? (
        comments.map((comment) => {
          return (
            <div className='py-8 w-full' key={comment._id}>
              <div className='lg:flex items-center justify-center w-full'>
                <div className='lg:w-6/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded'>
                  <div className='flex items-center border-b border-gray-200 pb-6'>
                    <img
                      src={
                        comment.user.avatar
                          ? `${baseUrl}/${comment.user.avatar}`
                          : "/assets/images/user.png"
                      }
                      alt=''
                      className='w-12 h-12 rounded-full'
                    />
                    <div className='flex items-start justify-between w-full'>
                      <div className='pl-3 w-full'>
                        <p className='text-xl font-medium leading-5 text-gray-800'>
                          {comment.user.name}
                        </p>
                        <p className='text-sm leading-normal pt-2 text-gray-500'>
                          {`Posted at: ${moment(comment.createdAt).format(
                            "DD/MM/YYYY"
                          )}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='px-2'>
                    <p className='text-sm leading-5 py-4 text-gray-600'>
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className='flex items-center space-x-2 justify-center'>
          <div className='w-4 h-1 rounded-full bg-blue-700'></div>
          <p className='font-semibold text-lg '>No comments yet !</p>
          <div className='w-4 h-1 rounded-full bg-blue-700'></div>
        </div>
      )}
    </>
  );
};

export default Comments;
