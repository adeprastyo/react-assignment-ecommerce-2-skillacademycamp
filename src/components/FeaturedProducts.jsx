import React, { useState } from "react";

const FeaturedProducts = (props) => {
  const [option, setOption] = useState("default");

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    // console.log(value);
    // console.log(id);
    setOption(value);
    props.onchange(value, id);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="font-bold text-lg mb-4">
        <h1>Featured Products</h1>
      </div>
      <div className="flex gap-3">
        <div>
          <select
            data-testid="filterBy"
            id="filter"
            className="p-2 border border-slate-300 rounded-md"
            value={option}
            onChange={handleChange}
          >
            <option value="All">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <select
            data-testid="sortBy"
            id="sort"
            value={option}
            onChange={handleChange}
            className="p-2 border border-slate-300 rounded-md"
          >
            <option value="default">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
