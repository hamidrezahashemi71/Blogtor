import {Link} from "react-router-dom";

const BlogCard = () => {
  return (
    <div className='max-w-lg mx-auto'>
      <div className='bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5'>
        <Link to='#'>
          <img
            className='rounded-t-lg'
            src='https://flowbite.com/docs/images/blog/image-1.jpg'
            alt=''
          />
        </Link>
        <div className='p-5'>
          <Link to='#'>
            <h5 className='text-gray-900 font-bold text-2xl tracking-tight mb-2'>
              Noteworthy technology acquisitions 2021
            </h5>
          </Link>
          <p className='font-normal text-gray-700 mb-3'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div className='flex justify-between'>
            <Link to='#!'>
              <div className='flex items-center'>
                <div className='shrink-0'>
                  <img
                    src={"assets/images/user.png"}
                    className='rounded-full w-10'
                    alt='Avatar'
                  />
                </div>
                <div className='grow ml-3'>
                  <p className='text-sm font-semibold text-blue-600'>
                    Jason McCoel
                  </p>
                </div>
              </div>
            </Link>
            <Link
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center'
              to='#'>
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
