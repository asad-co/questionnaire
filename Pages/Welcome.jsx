
import { useContext, useEffect, useRef } from "react"
import ArrowSVG from "../assets/svgs/ArrowSVG"
import Main from "../Components/Box/Main"
import SubMain from "../Components/Box/SubMain"
import TextBox from "../Components/Box/TextBox"
import PrimaryButton from "../Components/Button/PrimaryButton"
import InputField from "../Components/Input/InputField"
import BoxTitle from "../Components/Text/BoxTitle"
import Description from "../Components/Text/Description"
import Label from "../Components/Text/Label"
import MainHeading from "../Components/Text/MainHeading"
import questionnaireContext from "../Provider/context"
import ComponentBox from "../Components/Box/ComponentBox"
import LeftImage from "../Components/Box/LeftImage"
import Error from "../Components/Text/Error"
import SubComponentBox from "../Components/Box/SubComponentBox"

const Welcome = () => {
    const { emailAddress, onChangeEmailAddress, beginSurvey, errors, clearErrors } = useContext(questionnaireContext)

    const btnRef = useRef()
    useEffect(() => {
        clearErrors()
    }, [])
    return (
        <Main>
            <LeftImage />
            <SubMain rightAligned={true}>
                <ComponentBox isWelcome={true}>
                    <MainHeading>Questionnaire</MainHeading>
                    <SubComponentBox>
                        <TextBox>
                            <BoxTitle>
                                Welcome!
                            </BoxTitle>
                            <Description>
                                We're excited to hear your thoughts, ideas, and insights. Don't worry about right or wrong answers—just speak from the heart.
                                Your genuine feedback is invaluable to us!
                            </Description>
                        </TextBox>
                        <div className="d-flex flex-column w-100">
                            <Label>Email</Label>
                            <InputField
                                type="email"
                                className="p-3"
                                value={emailAddress}
                                onChange={(e) => { onChangeEmailAddress(e.target.value) }}
                                placeholder={"Enter email address"} />
                        </div>
                        <Error className="w-100 text-start">{errors['welcome']}</Error>
                        <PrimaryButton
                            btnRef={btnRef}
                            className="w-100 d-flex justify-content-between align-items-center p-4"
                            onClick={()=>{beginSurvey(btnRef)}}>
                            <BoxTitle>Start Survey</BoxTitle>
                            <ArrowSVG direction={"right"} />
                        </PrimaryButton>
                    </SubComponentBox>
                </ComponentBox>
            </SubMain>
        </Main>
    )
}

export default Welcome
