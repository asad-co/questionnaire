import { useNavigate } from "react-router-dom"
import ComponentBox from "../Components/Box/ComponentBox"
import Main from "../Components/Box/Main"
import SubMain from "../Components/Box/SubMain"
import ImageButton from "../Components/Button/ImageButton"
import PrimaryButton from "../Components/Button/PrimaryButton"
import BoxTitle from "../Components/Text/BoxTitle"
import Error from "../Components/Text/Error"
import Label from "../Components/Text/Label"
import SubHeading from "../Components/Text/SubHeading"
import blackShoes from "../assets/imgs/blackShoes.png"
import orangeShoes from "../assets/imgs/orangeShoes.png"
import "../assets/imgs/orangeShoes.png"
import ArrowSVG from "../assets/svgs/ArrowSVG"

const Choice = () => {
    const navigate = useNavigate()
    return (
        <Main>
            <SubMain>
                <ComponentBox>
                    <Label>Question 1</Label>
                    <SubHeading>What is your prefferred choice?</SubHeading>

                    <div className="d-flex gap-3">
                        <ImageButton isSelected={true} imgSrc={orangeShoes} label={"Nike Orange"} />
                        <ImageButton imgSrc={blackShoes} label={"Nike Orange"} />
                    </div>

                    <Error>Please Select one</Error>

                    <div className="d-flex justify-content-between w-100">

                        <PrimaryButton 
                        onClick={()=>{navigate("/")}}
                        theme={"secondary"} 
                        className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <ArrowSVG direction={"left"} />
                            <BoxTitle>Back</BoxTitle>
                        </PrimaryButton>

                        <PrimaryButton className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <BoxTitle>Next</BoxTitle>
                            <ArrowSVG direction={"right"} />
                        </PrimaryButton>
                        
                    </div>

                </ComponentBox>
            </SubMain>
        </Main>
    )
}

export default Choice
