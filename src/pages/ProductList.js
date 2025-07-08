import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000"; 


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [translateX, setTranslateX] = useState(0);
  const progressBarRef = useRef(null);
  const swiperRef = useRef(null);

  const fillWidth = 50;

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPop, setMinPop] = useState("");
  const [maxPop, setMaxPop] = useState("");

  const fetchProducts = async (filters = "") => {
    try {
      const res = await axios.get(`${API_URL}/products${filters}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Veri çekilemedi:", err);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const handleSlideChange = (swiper) => {
    swiperRef.current = swiper;

    const totalSlides = swiper.slides.length;
    const spv =
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1;

    const maxIndex = totalSlides - spv;
    const containerWidth = progressBarRef.current?.offsetWidth || 0;
    const maxTranslate = containerWidth - fillWidth;
    const step = maxIndex > 0 ? maxTranslate / maxIndex : 0;

    const newTranslate = step * swiper.activeIndex;
    setTranslateX(newTranslate);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (minPop) params.append("minPopularity", minPop);
    if (maxPop) params.append("maxPopularity", maxPop);

    fetchProducts("?" + params.toString());
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="section-title text-center mb-4">Product List</h1>

      <form
        onSubmit={handleFilterSubmit}
        className="d-flex flex-wrap justify-content-center gap-2 mb-4"
      >
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="form-control w-auto"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="form-control w-auto"
        />
        <input
          type="number"
          placeholder="Min Popularity (0-5)"
          value={minPop}
          onChange={(e) => setMinPop(e.target.value)}
          className="form-control w-auto"
        />
        <input
          type="number"
          placeholder="Max Popularity (0-5)"
          value={maxPop}
          onChange={(e) => setMaxPop(e.target.value)}
          className="form-control w-auto"
        />
        <button type="submit" className="btn btn-dark">
          Apply Filters
        </button>
      </form>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-progress-bar" ref={progressBarRef}>
        <div
          className="custom-progress-fill"
          style={{ transform: `translateX(${translateX}px)` }}
        ></div>
      </div>
    </div>
  );
};

export default ProductList;
