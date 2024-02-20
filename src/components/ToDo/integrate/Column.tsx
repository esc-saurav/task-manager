import React, { useState } from "react";
import Card from "./Card";
import { AddCard } from "./AddCard";

type Props = {
  title: string;
  headingColor: string;
  bgColour: string;
  column: string;
  cards: IcardData[];
  setCards: React.Dispatch<React.SetStateAction<IcardData[]>>;
};

const Column = ({
  title,
  headingColor,
  bgColour,
  cards,
  setCards,
  column,
}: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const filteredCards = cards.filter((item) => item.column === column);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    data: IcardData
  ) => {
    e.dataTransfer.setData("cardId", data.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardID = e.dataTransfer.getData("cardId");
    let allCards = [...cards];
    const findedCard = allCards.find((item) => item.id === cardID);
    if (findedCard) {
      findedCard.column = column;
      allCards = allCards.filter((item) => item.id !== column);  //cardID
      setCards(allCards);
      setActive(false);
    }
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      className="w-56 shrink-0"
    >
      <div className="mb-3 flex items-center gap-x-2">
        <h3
          className={`font-medium flex items-center gap-x-1 rounded-xl px-2 py-1 text-sm ${bgColour} ${headingColor}`}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-400"></div>
          {title}
        </h3>
        <span className={`rounded text-xs ${headingColor}`}>
          <p>{filteredCards?.length}</p>
        </span>
      </div>
      <div
        className={`h-full space-y-1 w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {Array.isArray(filteredCards) && filteredCards.length !== 0
          ? filteredCards?.map((item) => {
              return (
                <Card
                  handleDragStart={handleDragStart}
                  key={item.id}
                  item={item}
                />
              );
            })
          : ""}
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
