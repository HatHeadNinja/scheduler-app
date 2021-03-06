import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

// day list items
export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--full": !props.spots,
    "day-list__item--selected": props.selected,
  });

  // for spots remaining
  const formatSpots = (spots) => {
    return `${spots ? spots : `no`} ${
      spots === 1 ? "spot" : "spots"
    } remaining`;
  };

  // day list item props and layout
  return (
    <li
      className={ dayClass }
      data-testid="day"
      onClick={ () => props.setDay(props.name) }
    >
      <h2 className="text--regular">{ props.name }</h2>
      <h3 className="text--light">{ formatSpots(props.spots) }</h3>
    </li>
  )
};