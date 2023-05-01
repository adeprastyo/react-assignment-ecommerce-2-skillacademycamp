import React, { useState } from "react";

const NavBar = (props) => {
  const [inputData, setInputData] = useState("");

  const handleSearch = (e) => {
    props.onSearch(inputData, e);
  };

  return (
    <>
      <nav
        data-testid="navbar"
        className="navbar flex px-20 py-5 justify-around items-center shadow-md"
      >
        <div className="logo">
          <a href="/">
            <h1 className="font-bold text-2xl">RUANGBELANJA</h1>
          </a>
        </div>
        <div className="search-input w-1/4 h-8 ">
          <form data-testid="searchForm" className="flex gap-5 w-full h-full">
            <input
              onChange={(e) => {
                setInputData(e.target.value);
              }}
              value={inputData}
              data-testid="searchInput"
              className="w-full h-full px-3 text-sm border border-slate-600 outline-slate-500 rounded-full"
              type="text"
              placeholder="Search..."
            />
            <input
              onClick={handleSearch}
              data-testid="searchButton"
              className="w-1/4 h-full px-3 text-sm border border-slate-600 outline-slate-500 rounded-full"
              type="submit"
              value="Search"
            />
          </form>
        </div>
        <div className="flex gap-3 font-medium">
          <a
            className="rounded-full px-3 py-2 text-slate-700 font-medium hover:shadow-lg hover:bg-slate-50"
            href="/"
          >
            Shop
          </a>
          <a
            className="rounded-full px-3 py-2 text-slate-700 font-medium hover:shadow-lg hover:bg-slate-50"
            href="/"
          >
            Most Wanted
          </a>
          <a
            className="rounded-full px-3 py-2  text-slate-700 font-medium hover:shadow-lg hover:bg-slate-50"
            href="/"
          >
            New Arrival
          </a>
          <a
            className="rounded-full px-3 py-2 text-slate-700 font-medium hover:shadow-lg hover:bg-slate-50"
            href="/"
          >
            Brands
          </a>

          <p className="text-3xl font-thin text-slate-200">|</p>

          <input
            className="rounded-full px-3 py-2 text-slate-700 font-medium hover:shadow-lg hover:bg-slate-50"
            type="submit"
            value="My Cart"
          />
          <input
            className="rounded-full px-3 py-2 text-slate-700 font-medium hover:shadow-lg hover:bg-slate-50"
            type="submit"
            value="Profile"
          />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
