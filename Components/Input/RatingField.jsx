import { useState } from 'react'
import "./rating.css"

const RatingField = ({ children, maxRating, currentRating, updateRating, className }) => {

    const [hoveredRating, setHoveredRating] = useState(0);

    const handleClick = (newRating) => {
        updateRating(newRating);
    };

    const handleMouseEnter = (rating) => {
        setHoveredRating(rating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    return (
        <div className={`rating-input-container px-4 py-3 gap-5 ${className}`}>
            {children}
            <div className='w-50 d-flex justify-content-evenly'>
                {Array.from({ length: maxRating }, (_, index) => index + 1).map((index) => (
                    <button
                        key={index}
                        className={`rating-button ${index <= hoveredRating ? 'rating-button-hover' : ''} ${index <= currentRating ? 'rating-button-active' : ''}`}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default RatingField
