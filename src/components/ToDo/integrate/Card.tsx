type Props = {
  item: IcardData;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    data: IcardData
  ) => void;
};

const Card = ({ item, handleDragStart }: Props) => {
  return (
    <>
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, item)}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{item.title}</p>
      </div>
    </>
  );
};

export default Card;
