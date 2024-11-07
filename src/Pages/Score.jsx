import ComponentBox from "../Components/Box/ComponentBox"
import Main from "../Components/Box/Main"
import SubMain from "../Components/Box/SubMain"
import RatingField from "../Components/Input/RatingField"
import BoxTitle from "../Components/Text/BoxTitle"
import Label from "../Components/Text/Label"
import SubHeading from "../Components/Text/SubHeading"
import Error from "../Components/Text/Error"
import ArrowSVG from "../assets/svgs/ArrowSVG"
import PrimaryButton from "../Components/Button/PrimaryButton"
import { useNavigate } from "react-router-dom"

const Score = () => {
    const navigate = useNavigate()

    return (
        <Main>
            <SubMain>
                <ComponentBox>

                    <Label>Question 2</Label>
                    <SubHeading>How important are these aspects for you?</SubHeading>

                    <div className="d-flex flex-column gap-3">
                        <RatingField maxRating={5} currentRating={3} updateRating={() => { }}>
                            <BoxTitle>Comfort</BoxTitle>
                        </RatingField>
                        <Error>Please Select one</Error>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <RatingField maxRating={5} currentRating={3} updateRating={() => { }}>
                            <BoxTitle>Looks</BoxTitle>
                        </RatingField>
                        <Error>Please Select one</Error>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <RatingField maxRating={5} currentRating={3} updateRating={() => { }}>
                            <BoxTitle>Price</BoxTitle>
                        </RatingField>
                        <Error>Please Select one</Error>
                    </div>

                    <div className="d-flex justify-content-between w-100">

                        <PrimaryButton 
                        onClick={()=>{navigate("/choice")}}
                        theme={"secondary"} 
                        className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <ArrowSVG direction={"left"} />
                            <BoxTitle>Back</BoxTitle>
                        </PrimaryButton>

                        <PrimaryButton 
                        onClick={()=>{navigate("/thanks")}}
                        theme={"tertiary"} 
                        className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <BoxTitle>Send</BoxTitle>
                            <ArrowSVG direction={"right"} />
                        </PrimaryButton>

                    </div>
                </ComponentBox>
            </SubMain>
        </Main>
    )
}

export default Score
