import { useState } from "react";
import { PlusIcon } from "../../../assets/icons";
import { v4 as uuidv4 } from "uuid";

export const AddCard = ({ setCards, column }: any) => {
  type newCard = {
    id: string;
    title: string;
    column: string;
  };
  const [active, setActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) return;
    const newCard: newCard = {
      id: uuidv4(),
      title: text.trim(),
      column: column,
    };
    setCards((prev: any) => [...prev, newCard]);
    setText("");
    setActive(false);
  };

  return (
    <div>
      {!active ? (
        <button
          onClick={() => setActive(true)}
          className="px-3 py-1 flex items-center gap-x-1 text-neutral-200"
        >
          <p className="text-xs">Add card</p>
          <PlusIcon className="h-4 w-4" />
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            placeholder="Add new task..."
          />
          <div className="flex items-center justify-end mt-1 gap-x-1">
            <button
              onClick={() => setActive(false)}
              type="button"
              className="px-3 py-1.5 text-neutral-200"
            >
              <p className="text-xs">Close</p>
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 flex items-center gap-x-1 bg-white text-black rounded"
            >
              <p className="text-xs">Add</p>
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
