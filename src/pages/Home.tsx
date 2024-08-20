import { useState, useEffect } from "react";
import { MdOutlineCircle } from "react-icons/md";
import { MdCircle } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import mensClothingImage from "../assets/images/mens_clothing.png";
import womensClothingImage from "../assets/images/womens_clothing.png";
import Products from "../components/Products";

const contents = [
  {
    category: "Men's Clothing",
    image: mensClothingImage,
    description:
      "This is a collection of men's clothing including shirts, pants, jackets, and more.",
  },
  {
    category: "Women's Clothing",
    image: womensClothingImage,
    description:
      "This is a collection of women's clothing including shirts, pants, jackets, and more.",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();
  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % contents.length);
  };
  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + contents.length) % contents.length);
  };
  const handleSpecificClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % contents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  const { category, image, description } = contents[currentIndex];
  return (
    <>
      <section className="relative h-screen bg-orange-50 pt-[80px] flex justify-center items-center min-w-80">
        <div className="w-full h-full flex px-38 justify-between">
          <div className="md:w-[50%] flex  justify-center md:pl-40 p-10 pb-20 text-neutral-800 flex-col">
            <p className="text-[25px] text-orange-500">OUR ALL TIME FAVORITES</p>
            <h1 className="text-[20px] text-[40px] md:text-[60px] xl-[80px] font-medium">
              {category}
            </h1>
            <p className="font-medium text-neutral-500">{description}</p>
            <div className="pt-16">
              <button
                onClick={() => navigate("/shop")}
                className="tracking-widest border p-2 bg-neutral-700 text-white font-medium hover:bg-neutral-800 outline-none"
              >
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="hidden md:flex sm:w-[50%] justify-center items-center ">
            <img
              src={image}
              alt={category}
              className="h-full hidden sm:block pr-40 object-contain rounded-xl3"
            />
          </div>
        </div>

        <div className="text-[25px] text-neutral-400">
          <div
            className="absolute md:left-10 left-2 top-[45%] hover:text-black transition-colors duration-400"
            onClick={handlePrevClick}
          >
            <IoIosArrowBack />
          </div>

          <div
            className="absolute md:right-10 right-2 rotate-180 top-[45%] hover:text-black transition-colors duration-400"
            onClick={handleNextClick}
          >
            <IoIosArrowBack />
          </div>
        </div>
        <div className="absolute bottom-5 text-neutral-500 flex gap-1">
          {contents.map((content, index) =>
            currentIndex === index ? (
              <MdCircle key={index} className="text-black" />
            ) : (
              <MdOutlineCircle
                key={index}
                className="hover:text-black transition-colors duration-400"
                onClick={() => handleSpecificClick(index)}
              />
            )
          )}
        </div>
      </section>
      <Products />
    </>
  );
}

export default Home;
