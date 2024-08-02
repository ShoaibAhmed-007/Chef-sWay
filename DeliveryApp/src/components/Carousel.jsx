import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import Searchbar from "./Searchbar";

export default function CarouselTransition({ image, search, setSearch }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((current) => (current === 0 ? image.length - 1 : current - 1));

  const next = () =>
    setCurrent((current) => (current === image.length - 1 ? 0 : current + 1));

  return (
    <div className="relative overflow-x-hidden" style={{ height: "30em" }}>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {image.map((img, index) => (
          <div
            key={index}
            className="min-w-full flex justify-center items-center h-[30em]"
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full text-gray-800 p-2 shadow"
        >
          <ChevronLeft size={32} />
        </button>
        <div className="w-full flex justify-center absolute bottom-0 pb-6">
          <Searchbar search={search} setSearch={setSearch} />
        </div>
        <button
          onClick={next}
          className="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full text-gray-800 p-2 shadow"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
