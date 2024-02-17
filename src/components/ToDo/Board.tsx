import { useEffect, useState } from "react";
import Column from "./integrate/Column";
import { DeleteCard } from "./integrate/DeleteCard";

const Board = () => {
  const ColumnData = [
    {
      title: "Backlog",
      column: "backlog",
      bgColour: "bg-neutral-500/10",
      headingColor: "text-neutral-500",
    },
    {
      title: "ToDo",
      column: "todo",
      bgColour: "bg-yellow-50/10",
      headingColor: "text-yellow-200",
    },
    {
      title: "In Progress",
      column: "inprogress",
      bgColour: "bg-blue-50/10",
      headingColor: "text-blue-200",
    },
    {
      title: "Complete",
      column: "complete",
      bgColour: "bg-emerald-50/10",
      headingColor: "text-emerald-200",
    },
  ];
  const [cards, setCards] = useState<IcardData[]>([]);
  const [checkedData, setCheckedData] = useState<boolean>(false);

  useEffect(() => {
    const cardData = localStorage.getItem("cards");
    setCards(cardData ? JSON.parse(cardData) : []);
    setCheckedData(true);
  }, []);

  useEffect(() => {
    checkedData && localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  return (
    <div className="flex h-full w-full p-12 overflow-scroll gap-3">
      {ColumnData?.map((item, idx) => {
        return (
          <Column
            key={idx}
            title={item.title}
            column={item.column}
            bgColour={item.bgColour}
            headingColor={item.headingColor}
            cards={cards}
            setCards={setCards}
          />
        );
      })}
      <DeleteCard setCards={setCards} />
    </div>
  );
};

export default Board;
