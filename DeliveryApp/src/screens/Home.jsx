import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { cards } from "../Data.js";
import img1 from "../assets/Carousel Images/img1.jpg";
import img2 from "../assets/Carousel Images/img2.jpg";
import img3 from "../assets/Carousel Images/img3.jpg";
let images = [img1, img2, img3];
import CarouselTransition from "../components/Carousel.jsx";
import MyCart from "../components/MyCart.jsx";
let Cards = await cards();
export default function Home() {
  const [search, setSearch] = useState("");
  const [isCartVisible, setCartVisible] = useState(false);
  const [myOrders, setOrders] = useState([]);
  return (
    <>
      <Navbar visible={setCartVisible} />

      <div>
        <CarouselTransition
          image={images}
          search={search}
          setSearch={(search) => setSearch(search)}
        />
      </div>
      {Cards.foodCategory.map((cat) => {
        return (
          <>
            <div className="text-center pt-6 text-2xl font-bold">
              {cat.CategoryName}
            </div>
            <div className="flex justify-center items-center p-10">
              <div className="grid grid-cols-4 gap-10 ">
                {Cards.foodItems
                  .filter((cat) =>
                    cat.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((card) => {
                    if (card.CategoryName === cat.CategoryName) {
                      return <Card card={card} category={cat} />;
                    }
                  })}
              </div>
            </div>
          </>
        );
      })}

      <MyCart
        visible={isCartVisible}
        setVisible={setCartVisible}
        myOrders={setOrders}
      />
      <Footer />
    </>
  );
}
