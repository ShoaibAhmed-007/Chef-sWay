import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { cards } from "../Data.js";
import img1 from "../assets/Carousel Images/img1.jpg";
import img2 from "../assets/Carousel Images/img2.jpg";
import img3 from "../assets/Carousel Images/img3.jpg";
let images = [img1, img2, img3];
import CarouselTransition from "../components/Carousel.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-full max-h-120">
        <CarouselTransition image={images} />
      </div>
      <div className="flex justify-center p-10">
        <div className="grid grid-cols-3 gap-10 p-2 w-4/6">
          {cards.map((card) => {
            return <Card card={card} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
