import { useState } from 'react'
import "./rating.css"

const RatingField = ({ children, maxRating, currentRating, updateRating }) => {


    const handleClick = (newRating) => {
        updateRating(newRating);
    };

    return (
        <div className="rating-input-container px-4 py-3 gap-5">
            {children}
            <div className='w-50 d-flex justify-content-evenly'>
                {Array.from({ length: maxRating }, (_, index) => index + 1).map((index) => (
                    <button
                        key={index}
                        className={`rating-button ${index <= currentRating ? 'rating-button-active' : ''}`}
                        onClick={() => handleClick(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default RatingField
