
import { useContext } from "react"
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

const Welcome = () => {
    const { emailAddress, onChangeEmailAddress, beginSurvey } = useContext(questionnaireContext)
    return (
        <Main>
            <SubMain rightAligned={true}>
                <ComponentBox>
                    <MainHeading>Questionnaire</MainHeading>
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
                            className="p-3"
                            value={emailAddress}
                            onChange={(e) => { onChangeEmailAddress(e.target.value) }}
                            placeholder={"Enter email address"} />
                    </div>
                    <PrimaryButton 
                    className="w-100 d-flex justify-content-between align-items-center p-4" 
                    onClick={beginSurvey}>
                        <BoxTitle>Start Survey</BoxTitle>
                        <ArrowSVG direction={"right"} />
                    </PrimaryButton>
                </ComponentBox>
            </SubMain>
        </Main>
    )
}

export default Welcome
