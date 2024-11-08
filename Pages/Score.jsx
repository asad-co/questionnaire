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
// import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useRef } from "react"
import questionnaireContext from "../Provider/context"
import LeftImage from "../Components/Box/LeftImage"

const Score = () => {
    // const navigate = useNavigate()
    const { clearErrors, errors, secondQuestion, onChangeSecondQuestion, submitScores, emailAddress } = useContext(questionnaireContext)

    const btnRef = useRef()

    useEffect(() => {
        clearErrors()
        if (!emailAddress) {
            navigate("/")
        }
    }, [])

    return (
        <Main>

            <LeftImage hideOnBig={true} />


            <SubMain>
                <ComponentBox>

                    <Label>Question 2</Label>
                    <SubHeading>How important are these aspects for you?</SubHeading>

                    <div className="d-flex flex-column gap-3 w-100">
                        <RatingField
                            className={"w-100"}
                            maxRating={5}
                            currentRating={secondQuestion?.comfort}
                            updateRating={(value) => {
                                onChangeSecondQuestion({ comfort: value })
                            }}>
                            <BoxTitle>Comfort</BoxTitle>
                        </RatingField>
                        <Error>{errors?.score?.['comfort']}</Error>
                    </div>

                    <div className="d-flex flex-column gap-3  w-100">
                        <RatingField
                            className={"w-100"}
                            maxRating={5}
                            currentRating={secondQuestion?.looks}
                            updateRating={(value) => {
                                onChangeSecondQuestion({ looks: value })
                            }}>
                            <BoxTitle>Looks</BoxTitle>
                        </RatingField>
                        <Error>{errors?.score?.['looks']}</Error>
                    </div>

                    <div className="d-flex flex-column gap-3  w-100">
                        <RatingField
                            className={"w-100"}
                            maxRating={5}
                            currentRating={secondQuestion?.price}
                            updateRating={(value) => {
                                onChangeSecondQuestion({ price: value })
                            }}>
                            <BoxTitle>Price</BoxTitle>
                        </RatingField>
                        <Error>{errors?.score?.['price']}</Error>
                    </div>

                    <div className="d-flex justify-content-between w-100">

                        <PrimaryButton
                            // onClick={() => { navigate("/choice") }}
                            theme={"secondary"}
                            className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <ArrowSVG direction={"left"} />
                            <BoxTitle>Back</BoxTitle>
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={()=>submitScores(btnRef)}
                            theme={"tertiary"}
                            btnRef={btnRef}
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
