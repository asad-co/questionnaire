"use client"

import ComponentBox from "@/Components/Box/ComponentBox"
import Main from "@/Components/Box/Main"
import SubMain from "@/Components/Box/SubMain"
import ImageButton from "@/Components/Button/ImageButton"
import PrimaryButton from "@/Components/Button/PrimaryButton"
import BoxTitle from "@/Components/Text/BoxTitle"
import Error from "@/Components/Text/Error"
import Label from "@/Components/Text/Label"
import SubHeading from "@/Components/Text/SubHeading"
import blackShoes from "@/assets/imgs/blackShoes.png"
import orangeShoes from "@/assets/imgs/orangeShoes.png"
import "@/assets/imgs/orangeShoes.png"
import ArrowSVG from "@/assets/svgs/ArrowSVG"
import { useContext, useEffect, useRef } from "react"
import questionnaireContext from "@/Provider/context"
import LeftImage from "@/Components/Box/LeftImage"
import { useRouter } from "next/navigation"

const Choice = () => {

    const router = useRouter()
    const {errors,firstQuestion, onChangeFirstQuestion, submitChoices, emailAddress, clearErrors} = useContext(questionnaireContext)

    const btnRef = useRef()

    useEffect(()=>{
        if(!emailAddress){
            router.push("/")
        }
        clearErrors()
    },[])
    return (
        <Main>
            <LeftImage hideOnBig={true}/>

            <SubMain>
                <ComponentBox>
                    <Label>Question 1</Label>
                    <SubHeading>What is your prefferred choice?</SubHeading>

                    <div className="d-flex gap-3">
                        <ImageButton 
                        isSelected={firstQuestion==="nike orange"} 
                        imgSrc={orangeShoes} 
                        onClick={()=>{
                            onChangeFirstQuestion("nike orange")
                        }}
                        label={"Nike Orange"} />

                        <ImageButton 
                        imgSrc={blackShoes} 
                        isSelected={firstQuestion==="nike black"} 
                        onClick={()=>{
                            onChangeFirstQuestion("nike black")
                        }}
                        label={"Nike Black"} />
                    </div>

                    <Error>{errors["choices"]}</Error>

                    <div className="d-flex justify-content-between w-100">

                        <PrimaryButton 
                        onClick={()=>{router.push("/")}}
                        theme={"secondary"} 
                        className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
                            <ArrowSVG direction={"left"} />
                            <BoxTitle>Back</BoxTitle>
                        </PrimaryButton>

                        <PrimaryButton 
                        btnRef={btnRef}
                        onClick={()=>submitChoices(btnRef)}
                        className={"d-flex justify-content-between align-items-center gap-4 py-3 px-4"}>
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
