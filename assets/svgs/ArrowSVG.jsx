import React from 'react';

const ArrowSVG = ({ direction }) => (
  <>
    {direction === "right" && (
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.9907 0.749512L14.9911 4.16176L15 4.1707L14.9911 4.17965V15.2339L10.1626 15.2339L10.1626 9.00811L3.92023 15.2505L0.506226 11.8365L6.76505 5.57765L0.50633 5.57765L0.50633 0.749512L14.9907 0.749512Z" fill="black" />
      </svg>
    )}
    {direction === "left" && (
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.12462e-05 15.2468H4.8282V8.988L11.087 15.2468L14.501 11.8328L8.25879 5.59057L14.4844 5.59057L14.4845 0.762422L3.43063 0.762423L3.42126 0.753052L3.41189 0.762423L6.10352e-05 0.762423L6.12462e-05 15.2468Z" fill="black" />
      </svg>
    )}
  </>
);

export default ArrowSVG;
