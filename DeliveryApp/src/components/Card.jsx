import Dropdown from "./Dropdown";

export default function Card({ card }) {
  return (
    <div
      className="flex flex-col items-center justify-around h-fit p-4 gap-4 rounded-lg bg-white dark:bg-gray-800 shadow transition duration-300 ease-in-out"
      style={{ width: "21em" }}
    >
      <img
        src={card.img}
        alt={card.name}
        className="w-72 h-52 object-cover rounded-lg"
      />
      <div className="text-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-white">
          {card.name}
        </div>
        <div className="text-base text-gray-600 dark:text-gray-400">
          {card.description}
        </div>
      </div>
      <div className="flex gap-4">
        <Dropdown card={card} />
      </div>
    </div>
  );
}
