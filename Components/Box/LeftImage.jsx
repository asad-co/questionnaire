import shoeImg from "../../assets/imgs/shoes.png"
import arrowImg from "../../assets/imgs/arrow.png"
import shadowImg from "../../assets/imgs/shadow.png"
import Image from "next/image"
import "./box.css"


const LeftImage = ({ hideOnBig }) => {
    const hideOnBigScreenClass = hideOnBig ? "hide-on-big" : ""
    return (
        <div className={`left-image ${hideOnBigScreenClass}`}>
            <div className="arrowImg-abs">
                <Image src={arrowImg} alt={"arrow image"} className={`img-fluid `} />
            </div>
            <div className="shoeImg-abs">
                <Image src={shoeImg} alt={"shoes image"} className={`img-fluid `} />
                <Image src={shadowImg} alt={"shadow image"} className={`img-fluid `} />
            </div>
        </div>
    )
}

export default LeftImage
