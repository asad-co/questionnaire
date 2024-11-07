import "./button.css"

const ImageButton = ({ label, onClick, disabled, children, style, className, btnRef, type, imgSrc, altTxt, isSelected }) => {
    const selectedBtnClass = isSelected ? "selected-img-btn" : ""
    return (
        <button
            type={type}
            ref={btnRef}
            style={style}
            disabled={disabled}
            onClick={onClick}
            className={`${className} image-button py-4 px-5 gap-3 position-relative ${selectedBtnClass}`} >
                <div className="ellipse"></div>
            {children || label}
            <img src={imgSrc} alt={altTxt} className={`img-fluid `} />
        </button>
    )
}

export default ImageButton
