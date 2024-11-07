import shoeImg from "../../assets/imgs/shoes.png"
import arrowImg from "../../assets/imgs/arrow.png"
import shadowImg from "../../assets/imgs/shadow.png"

const LeftImage = () => {
    return (
        <div className='left-image'>
            <div className="arrowImg-abs">
                <img src={arrowImg} alt={"hey"} className={`img-fluid `} />
            </div>
            <div className="shoeImg-abs">
                <img src={shoeImg} alt={"hey"} className={`img-fluid `} />
                <img src={shadowImg} alt={"hey"} className={`img-fluid `} />
            </div>
        </div>
    )
}

export default LeftImage
