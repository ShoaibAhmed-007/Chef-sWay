import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { cards } from "../Data.js";
import img1 from "../assets/Carousel Images/img1.jpg";
import img2 from "../assets/Carousel Images/img2.jpg";
import img3 from "../assets/Carousel Images/img3.jpg";
import CarouselTransition from "../components/Carousel.jsx";
import MyCart from "../components/MyCart.jsx";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isCartVisible, setCartVisible] = useState(false);
  const [myOrders, setOrders] = useState([]);
  const [Cards, setCards] = useState({ foodCategory: [], foodItems: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await cards();
      setCards(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar visible={setCartVisible} />
      <div className="min-h-screen bg-gray-300">
        <CarouselTransition
          image={[img1, img2, img3]}
          search={search}
          setSearch={(search) => setSearch(search)}
        />
        {Cards.foodCategory.map((cat) => {
          return (
            <div key={cat.CategoryName}>
              <div className="text-center pt-6 text-2xl font-bold text-green-700">
                {cat.CategoryName}
              </div>
              <div className="flex justify-center items-center p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Cards.foodItems
                    .filter((item) =>
                      item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((card) => {
                      if (card.CategoryName === cat.CategoryName) {
                        return (
                          <Card key={card._id} card={card} category={cat} />
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MyCart
        visible={isCartVisible}
        setVisible={setCartVisible}
        myOrders={setOrders}
      />
      <Footer />
    </>
  );
}
