"use client"

import { choice, score, startSurvey } from '@/Lib/Supabase';
import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';

const questionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
    const router = useRouter()

    const host = process.env.NEXT_PUBLIC_CLIENT_BACKEND_URL

    const [emailAddress, setEmailAddress] = useState('');
    const [firstQuestion, setFirstQuestion] = useState('')
    const [secondQuestion, setSecondQuestion] = useState({})
    const [errors, setErrors] = useState({
        welcome: "",
        choices: "",
        score: {
            comfort: "",
            looks: "",
            price: "",
        },
        end: ""
    })

    const onChangeEmailAddress = (value) => {
        setEmailAddress(value)
    }

    const onChangeFirstQuestion = (value) => {
        setFirstQuestion(value)
    }
    const onChangeSecondQuestion = (value) => {
        setSecondQuestion(prev => ({
            ...prev,
            ...value,
        }))
    }

    const clearErrors = () => {
        setErrors({
            welcome: "",
            choices: "",
            score: {
                comfort: "",
                looks: "",
                price: "",
            },
            end: ""
        })
    }

    const beginSurvey = async (btnRef) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailAddress || !emailRegex.test(emailAddress)) {
            setErrors(prev => ({ ...prev, welcome: "Please enter a valid email" }))
            return
        }
        try {
            btnRef.current.setAttribute("disabled", "true")

            const jsonResponse = await startSurvey(emailAddress)

            if (jsonResponse.status === 409) {
                clearErrors()
                router.push('/thanks');
            }
            if (jsonResponse.status === 202) {
                clearErrors()
                setFirstQuestion(jsonResponse.step1)
                setSecondQuestion(jsonResponse.step2)
                if (!jsonResponse.step1) {
                    router.push('/choice');
                }
                else {
                    router.push('/score')
                }
            }

            if (jsonResponse.status === 201) {
                clearErrors()
                setFirstQuestion("")
                setSecondQuestion({})
                router.push('/choice');
            }
            else {
                setErrors(prev => ({ ...prev, welcome: jsonResponse.message }))
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }  finally {
            btnRef.current.removeAttribute("disabled")
        }
    }

    const submitChoices = async (btnRef) => {
        if (!firstQuestion || !firstQuestion.length > 0) {
            setErrors(prev => ({ ...prev, choices: "Please Select One" }))
            return
        }
        try {
            btnRef.current.setAttribute("disabled", "true")

            const jsonResponse = await choice(emailAddress,firstQuestion)

            if (jsonResponse.status === 404) {
                clearErrors()
                router.push('/');
            }
            if (jsonResponse.status === 202 || jsonResponse.status === 200) {
                clearErrors()
                router.push('/score')
            }
            else {
                setErrors(prev => ({ ...prev, choices: jsonResponse.message }))
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }  finally {
            btnRef.current.removeAttribute("disabled")
        }
    }

    const submitScores = async (btnRef) => {
        if (!secondQuestion?.comfort) {
            setErrors(prev => ({ ...prev, score: { ...prev.score, comfort: "Please Select One" } }))
            return
        }
        if (!secondQuestion?.looks) {
            setErrors(prev => ({ ...prev, score: { looks: "Please Select One" } }))
            return
        }
        if (!secondQuestion?.price) {
            setErrors(prev => ({ ...prev, score: { price: "Please Select One" } }))
            return
        }
        
        clearErrors()

        try {
            btnRef.current.setAttribute("disabled", "true")

            const jsonResponse = await score(emailAddress,secondQuestion.comfort,secondQuestion.looks, secondQuestion.price)

            if (jsonResponse.status === 404) {
                clearErrors()
                router.push('/');
            }
            if (jsonResponse.status === 202 || jsonResponse.status === 200) {
                clearErrors()
                router.push('/thanks')
            }
            else {
                setErrors({ ...prev, score: { price: jsonResponse.message } });
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }  finally {
            btnRef.current.removeAttribute("disabled")
        }
    }

    const completedSurvey = async (btnRef1,btnRef2) => {
        try {
            btnRef1?.current?.setAttribute("disabled", "true")
            btnRef2?.current?.setAttribute("disabled", "true")

            const response = await fetch(`${host}/api/completed`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailAddress,
                })
            });

            const jsonResponse = await response.json()
            if (response.status === 404) {
                clearErrors()
                router.push('/');
            }
            else {
                setFirstQuestion(jsonResponse.step1)
                setSecondQuestion(jsonResponse.step2)
                setErrors(prev => ({ ...prev, end: jsonResponse.message }));
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }  finally {
            btnRef1?.current?.removeAttribute("disabled")
            btnRef2?.current?.removeAttribute("disabled")
        }
    }

    return (
        <questionnaireContext.Provider
            value={{
                emailAddress, onChangeEmailAddress, beginSurvey,
                errors, firstQuestion, secondQuestion, onChangeFirstQuestion,
                submitChoices, onChangeSecondQuestion,
                submitScores, completedSurvey, clearErrors
            }}>
            {children}
        </questionnaireContext.Provider>
    );
};

export default questionnaireContext;
