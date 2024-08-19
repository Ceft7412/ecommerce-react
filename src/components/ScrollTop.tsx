import { useEffect, useState } from "react";
import { IoChevronUp } from "react-icons/io5";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTOp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {isVisible && (
        <div
          className="fixed p-2 text-white right-10 bottom-10 bg-orange-500 cursor-pointer text-[18px]"
          onClick={scrollToTOp}
        >
          <IoChevronUp />
        </div>
      )}
    </>
  );
}

export default ScrollTop;
