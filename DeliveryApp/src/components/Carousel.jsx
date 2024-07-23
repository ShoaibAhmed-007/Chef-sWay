import Searchbar from "./Searchbar";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useState } from "react";

export default function CarouselTransition({ image }) {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((current) =>
      current === 0 ? (current = image.length - 1) : current - 1
    );
  const next = () =>
    setCurrent((current) =>
      current === image.length - 1 ? (current = 0) : current + 1
    );

  return (
    <>
      <div className="overflow-hidden h-96 relative">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {image.map((img) => {
            return <img src={img}></img>;
          })}
        </div>
        <div className="p-1 absolute inset-0 flex items-center justify-between">
          <button
            onClick={prev}
            className="shadow hover:bg-white rounded-full text-gray-800 w-10"
          >
            <ChevronLeft size={40}></ChevronLeft>
          </button>
          <div className="pt-72">
            <Searchbar></Searchbar>
          </div>
          <button
            onClick={next}
            className=" shadow hover:bg-white rounded-full text-gray-800 w-10"
          >
            <ChevronRight size={40}></ChevronRight>
          </button>
        </div>
      </div>
    </>
  );
}
