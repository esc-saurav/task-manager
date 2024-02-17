import { useState } from "react";
import { BinIcon } from "../../../assets/icons";

type DelProps = {
  setCards: React.Dispatch<React.SetStateAction<IcardData[]>>;
};
export const DeleteCard = ({ setCards }: DelProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragleave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards &&
      setCards((prev) => [...prev].filter((item) => item.id !== cardId));
    console.log(cardId, "cardId");
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragleave}
      onDrop={handleDragEnd}
      className={`h-32 mt-10 w-56 shrink-0 grid place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 text-neutral-500 bg-neutral-500/20"
      }`}
    >
      <BinIcon
        className={`h-6 w-6 duration-300 ${
          active ? "text-red-500 scale-125" : "text-neutral-400 scale-100"
        }`}
      />
    </div>
  );
};
