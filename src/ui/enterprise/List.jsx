import React from "react";
import ListItem from "./ListItem";

const benefits = [
  {
    id: 1,
    data: "enterprise.benefits.item1",
  },
  {
    id: 2,
    data: "enterprise.benefits.item2",
  },
  {
    id: 3,
    data: "enterprise.benefits.item3",
  },
  {
    id: 4,
    data: "enterprise.benefits.item4",
  },
  {
    id: 5,
    data: "enterprise.benefits.item5",
  },
];

const List = () => {
  return (
    <ul className="list-enterprise">
      {benefits.map((benefit) => (
        <ListItem key={benefit.id} itemData={benefit.data} />
      ))}
    </ul>
  );
};

export default List;
