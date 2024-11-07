import Main from "../Components/Box/Main"
import SubMain from "../Components/Box/SubMain"
import MainHeading from "../Components/Text/MainHeading"
import SubHeading from "../Components/Text/SubHeading"
import ArrowSVG from "../assets/svgs/ArrowSVG"
import PrimaryButton from "../Components/Button/PrimaryButton"
import BoxTitle from "../Components/Text/BoxTitle"
import ComponentBox from "../Components/Box/ComponentBox"
import { useNavigate } from "react-router-dom"
import LeftImage from "../Components/Box/LeftImage"
import { useContext,useEffect } from "react"
import questionnaireContext from "../Provider/context"
import Error from "../Components/Text/Error"

const Thanks = () => {
    const navigate = useNavigate()

    const {clearErrors, emailAddress, completedSurvey} = useContext(questionnaireContext)


    useEffect(()=>{
        if(!emailAddress){
            navigate("/")
        }
        completedSurvey()
        clearErrors()
    },[])
    return (
        <Main>
            <LeftImage/>

            <SubMain rightAligned={true}>
                <ComponentBox isWelcome={true}>
                    <MainHeading>Thank you</MainHeading>
                    <SubHeading> for your feedback!</SubHeading>

                    <div className="d-flex justify-content-between w-75">
                        <PrimaryButton
                            onClick={() => { navigate("/score") }}
                            theme={"secondary"}
                            className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <ArrowSVG direction={"left"} />
                            <BoxTitle>Back</BoxTitle>
                        </PrimaryButton>

                        <PrimaryButton
                            onClick={() => { navigate("/") }}
                            theme={"tertiary"}
                            className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <BoxTitle>Back to Home</BoxTitle>
                            <ArrowSVG direction={"right"} />
                        </PrimaryButton>

                    </div>
                </ComponentBox>
            </SubMain>
        </Main>
    )
}

export default Thanks
