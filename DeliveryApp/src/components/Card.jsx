import Dropdown from "./Dropdown";

export default function Card({ card }) {
  return (
    <>
      <div className="flex flex-col items-center justify-around w-80 h-fit p-2 gap-4 border-2 border-black rounded-lg">
        <img src={card.img} alt={card.name} className="w-72 h-52" />
        <div>
          <div className="text-xl">{card.name}</div>
          <div className="text-base">{card.description}</div>
        </div>
        <div className="flex gap-4">
          <Dropdown options={card.options} />
        </div>
      </div>
    </>
  );
}
