import React from "react";

const Comments = () => {
  return (
    <div className='py-8 w-full'>
      <div className='lg:flex items-center justify-center w-full'>
        <div className='lg:w-6/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded'>
          <div className='flex items-center border-b border-gray-200 pb-6'>
            <img
              src='https://cdn.tuk.dev/assets/components/misc/doge-coin.png'
              alt=''
              className='w-12 h-12 rounded-full'
            />
            <div className='flex items-start justify-between w-full'>
              <div className='pl-3 w-full'>
                <p className='text-xl font-medium leading-5 text-gray-800'>
                  Dogecoin nerds
                </p>
                <p className='text-sm leading-normal pt-2 text-gray-500'>
                  November 2022
                </p>
              </div>
            </div>
          </div>
          <div className='px-2'>
            <p className='text-sm leading-5 py-4 text-gray-600'>
              A group of people interested in dogecoin, the currency and a bit
              of side for the meme and dof that we all know and love. These
              cases are perfectly simple and easy to distinguish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
