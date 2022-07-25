import {Link} from "react-router-dom";

const BlogCard = ({blog}) => {
  return (
    <div className='max-w-lg mx-3'>
      <div className='bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5'>
        <img
          className='rounded-t-lg'
          src={
            blog.imgurl === "" ? "/assets/images/blog-image.webp" : blog.imgurl
          }
          alt=''
        />
        <div className='p-5'>
          <h5 className='text-gray-900 font-bold text-2xl tracking-tight mb-2'>
            {blog.title}
          </h5>

          <p className='font-normal text-gray-700 mb-3'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div className='flex justify-between'>
            {blog.creator ? (
              <Link to={`/users/${blog.creator._id}`}>
                <div className='flex items-center'>
                  <div className='shrink-0'>
                    <img
                      src={
                        blog.creator.avatar === ""
                          ? "/assets/images/user.png"
                          : blog.creator.avatar
                      }
                      className='rounded-full w-10'
                      alt='Avatar'
                    />
                  </div>
                  <div className='grow ml-3'>
                    <p className='text-sm font-semibold text-blue-600'>
                      {blog.creator.name}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              ""
            )}
            <Link
              to={`/blogs/${blog._id}`}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center'>
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
