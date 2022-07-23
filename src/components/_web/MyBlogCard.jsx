import React from "react";

const MyBlogCard = () => {
  return (
    <div className='pt-12 px-12 ml-52'>
      <div className='h-max flex justify-center items-center rounded-3xl'>
        <div className='container mx-auto'>
          <div className='max-w-md mx-auto md:max-w-lg'>
            <div className='w-full'>
              <ul className='px-0'>
                <li className='m-auto  px-4 py-2 bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5'>
                  <div className='flex items-center'>
                    <div className='w-1/3 pr-4'>
                      <img
                        src={"/assets/images/blog-hero.png"}
                        className='shadow-md transform transition hover:scale-110 h-24 w-24 flex rounded-full aspect-square object-cover'
                      />
                    </div>
                    <div className='flex flex-col w-2/3'>
                      <h1 className='text-gray-700 hover:text-gray-900 cursor-pointer font-bold text-md tracking-tight mb-2'>
                        Blog Title
                      </h1>
                      <div className='flex justify-end'>
                        <button className=' mx-1 px-2 py-1 rounded text-white text-xs font-normal bg-gray-900 hover:bg-gray-700'>
                          Edit
                        </button>
                        <button className=' ml-1 px-2 py-1 rounded text-white text-xs font-normal bg-blue-700 hover:bg-blue-600'>
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
  );
};

export default MyBlogCard;
