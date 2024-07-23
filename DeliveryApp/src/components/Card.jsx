import Dropdown from "./Dropdown";

export default function Card({ card }) {
  return (
    <>
      <div className="flex flex-col items-center justify-around w-60 h-auto p-2 gap-4 border-2 border-black rounded-lg">
        <img src={card.imageURL} alt={card.recipeName} className="w-auto" />
        <div>
          <div className="text-xl">{card.recipeName}</div>
          <div className="text-base">{card.recipeDesc}</div>
        </div>
        <div className="flex gap-4">
          {card.dropdowns.map((drop) => {
            return <Dropdown options={drop.options} />;
          })}
        </div>
      </div>
    </>
  );
}
