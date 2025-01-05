import React from "react";

const SearchBox = React.memo(() => {
    return (
        <div className='max-w-prose md:w-1/2 w-full'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <i className="fa-solid fa-magnifying-glass text-xl"></i>
                </div>
                <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search" placeholder="Search something.." />
            </div>
        </div>
    )
});

export default SearchBox;