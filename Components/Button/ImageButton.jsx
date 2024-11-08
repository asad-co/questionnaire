import "./button.css"
import shadowImg from "../../assets/imgs/shadow.png"

const ImageButton = ({ label, onClick, disabled, children, style, className, btnRef, type, imgSrc, altTxt, isSelected }) => {
    const selectedBtnClass = isSelected ? "selected-img-btn" : ""
    return (
        <button
            type={type}
            ref={btnRef}
            style={style}
            disabled={disabled}
            onClick={onClick}
            className={`${className} image-button py-2 px-3 gap-3 position-relative ${selectedBtnClass}`} >
                <div className="ellipse"></div>
            {children || label}
            {/* <img src={imgSrc} alt={altTxt} className={`img-fluid btn-img`} /> */}
            {/* <img src={shadowImg} alt={"hey"} className={`img-fluid opacity-25`} /> */}

        </button>
    )
}

export default ImageButton
