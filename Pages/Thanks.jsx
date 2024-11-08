"use client"

import Main from "@/Components/Box/Main"
import SubMain from "@/Components/Box/SubMain"
import MainHeading from "@/Components/Text/MainHeading"
import SubHeading from "@/Components/Text/SubHeading"
import ArrowSVG from "@/assets/svgs/ArrowSVG"
import PrimaryButton from "@/Components/Button/PrimaryButton"
import BoxTitle from "@/Components/Text/BoxTitle"
import ComponentBox from "@/Components/Box/ComponentBox"
import LeftImage from "@/Components/Box/LeftImage"
import { useContext, useEffect, useRef } from "react"
import questionnaireContext from "@/Provider/context"
import Error from "@/Components/Text/Error"
import SmRightAlignedBox from "@/Components/Box/SmRightAlignedBox"
import { useRouter } from "next/navigation"

const Thanks = () => {

    const router = useRouter()

    const { clearErrors, emailAddress, completedSurvey } = useContext(questionnaireContext)
    const btnRefHome = useRef()
    const btnRefBack = useRef()

    useEffect(() => {
        if (!emailAddress) {
            router.push("/")
        }
        completedSurvey(btnRefBack, btnRefHome)
        clearErrors()
    }, [])
    return (
        <Main>
            <LeftImage />

            <SubMain rightAligned={true}>
                <ComponentBox isWelcome={true}>
                    <SmRightAlignedBox>
                        <MainHeading>Thank you</MainHeading>
                        <SubHeading> for your feedback!</SubHeading>
                    </SmRightAlignedBox>
                    <div className="d-flex justify-content-between w-100">
                        <PrimaryButton
                            btnRef={btnRefBack}
                            onClick={() => { router.push("/score") }}
                            theme={"secondary"}
                            className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <ArrowSVG direction={"left"} />
                            <BoxTitle>Back</BoxTitle>
                        </PrimaryButton>

                        <PrimaryButton
                            btnRef={btnRefHome}
                            onClick={() => { router.push("/") }}
                            theme={"tertiary"}
                            style={{
                                minWidth: "fit-content"
                            }}
                            className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4 "}>
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
