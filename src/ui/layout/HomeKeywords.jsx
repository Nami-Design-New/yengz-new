import { useState } from "react";
import SearchPath from "../modals/SearchPath";

function HomeKeywords({ categories }) {
  const [targetedCategory, setTargetedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="words">
        {categories?.map((category) => (
          <span
            key={category?.id}
            className="word"
            onClick={() => {
              setShowModal(true);
              setTargetedCategory(category);
            }}
          >
            {category?.name}
          </span>
        ))}
      </div>

      <SearchPath
        category={targetedCategory}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default HomeKeywords;
