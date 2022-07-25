import {Link} from "react-router-dom";
import moment from "moment";
import {useState} from "react";
import ConfirmDelete from "../_general/ConfirmDelete";

const MyBlogCard = ({blog, deleteBlog}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const showConfirmDelete = (blog) => {
    setConfirmDelete(true);
    setCurrentBlog(blog);
  };

  const hideConfirmDelete = () => {
    setConfirmDelete(false);
    setCurrentBlog(null);
  };

  return (
    <>
      <div className='pt-12 px-12 ml-52'>
        <div className='h-max flex justify-center items-center rounded-3xl'>
          <div className='container mx-auto'>
            <div className='max-w-md mx-auto md:max-w-lg'>
              <div className='w-full'>
                <ul className='px-0'>
                  <li className='m-auto  px-4 py-2 bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5'>
                    <div className='flex items-center'>
                      <div className='w-1/3 pr-4'>
                        <Link to={`/blogs/${blog._id}`}>
                          <img
                            src={
                              blog.imgurl === ""
                                ? "/assets/images/blog-image.webp"
                                : blog.imgurl
                            }
                            className='shadow-md transform transition hover:scale-110 h-24 w-24 flex rounded-full aspect-square object-cover'
                          />
                        </Link>
                      </div>
                      <div className='flex flex-col w-2/3'>
                        <h1 className='text-gray-700 hover:text-gray-900 cursor-pointer font-bold text-md tracking-tight mb-2'>
                          {blog.title}
                        </h1>
                        <p className='text-gray-700 hover:text-gray-900 cursor-pointer font-bold text-sm tracking-tight mb-2'>
                          {`${moment(blog.createdAt).format(
                            "dddd, MMMM Do YYYY"
                          )}`}
                        </p>
                        <div className='flex justify-end'>
                          <Link to={`/dashboard/editblog/${blog._id}`}>
                            <button className=' mx-1 px-2 py-1 rounded text-white text-xs font-normal bg-gray-900 hover:bg-gray-700'>
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => showConfirmDelete(blog)}
                            className=' ml-1 px-2 py-1 rounded text-white text-xs font-normal bg-blue-700 hover:bg-blue-600'>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirmDelete ? (
        <ConfirmDelete
          deleteBlog={deleteBlog}
          blog={blog}
          hideConfirmDelete={hideConfirmDelete}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyBlogCard;
