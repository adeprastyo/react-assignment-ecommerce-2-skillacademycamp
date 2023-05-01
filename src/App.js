import { useState, useEffect } from "react";
import Card from "./components/Card";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Promo from "./components/Promo";
import "./index.css";
import FeaturedProducts from "./components/FeaturedProducts";

const App = () => {
  const [data, setData] = useState(undefined); // data asli
  const [products, setProducts] = useState([]); // data yang dimanipulasi

  // const [searchResult, setSearchResult] = useState([]);
  // const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setProducts(data);
      });
  }, []);

  // const filterProducts = (input) => {
  //   const filtered = [...data].filter((product) => {
  //     return product.name.includes(input);
  //   });
  //   setProducts(filtered);
  // };

  if (data === undefined) {
    return (
      <>
        <p>Loading ...</p>
      </>
    );
  }

  const handleSort = (value) => {
    if (value === "asc") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setProducts(sorted);
    } else if (value === "desc") {
      const sorted = [...products].sort((a, b) => a.price - b.price).reverse();
      setProducts(sorted);
    } else if (value === "default") {
      setProducts(data);
    } else if (value === "All") {
      setProducts(data);
    } else if (value === "Men") {
      const filtered = [...data].filter(
        (product) => product.category === "Men"
      );
      setProducts(filtered);
    } else if (value === "Women") {
      const filtered = [...data].filter(
        (product) => product.category === "Women"
      );
      setProducts(filtered);
    }
  };

  // const handleSearch = (input, e) => {
  //   e.preventDefault();
  //   setSearchInput(input);
  //   filterProducts(input);
  // };

  // const displayProducts = searchInput ? products : data;

  return (
    <>
      <div data-testid="app">
        <Promo />
        <NavBar onSearch={() => {}} />
        <div className="flex w-full justify-center">
          <div className="flex flex-col w-3/4 p-5">
            <FeaturedProducts onchange={handleSort} />
            <div className="w-full flex flex-wrap">
              {/* {displayProducts.map((product) => {
                return (
                  <Card
                    key={product.id}
                    image={product.imageUrl}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                  />
                );
              })} */}
              {products.map((product) => {
                return (
                  <Card
                    key={product.id}
                    image={product.imageUrl}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                  />
                );
              })}
               
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
