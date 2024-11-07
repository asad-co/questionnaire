import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
    const navigate = useNavigate();

    const host = import.meta.env.VITE_BACKEND_URL;

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

    const beginSurvey = async () => {
        if (!emailAddress || !emailAddress.length > 0) {
            setErrors(prev => ({ ...prev,welcome: "Please enter valid email" }))
            return
        }
        try {

            const response = await fetch(`${host}/api/startSurvey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailAddress })
            });

            const jsonResponse = await response.json()
            if (response.status === 409) {
                navigate('/thanks');
            }
            if (response.status === 202) {
                setFirstQuestion(jsonResponse.step1)
                setSecondQuestion(jsonResponse.step2)
                if (!jsonResponse.step1) {
                    navigate('/choice');
                }
                else {
                    navigate('/score')
                }
            }

            if (response.status === 201) {
                navigate('/choice');
            }
            else {
                setErrors(prev => ({ ...prev,welcome: jsonResponse.message }))
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }
    }

    const submitChoices = async () => {
        if (!firstQuestion || !firstQuestion.length > 0) {
            setErrors(prev => ({ ...prev,choices: "Please Select One"}))
            return
        }
        try {

            const response = await fetch(`${host}/api/choice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailAddress,
                    choice: firstQuestion
                })
            });

            const jsonResponse = await response.json()
            if (response.status === 404) {
                navigate('/');
            }
            if (response.status === 202 || response.status === 200) {
                navigate('/score')
            }
            else {
                setErrors(prev => ({ ...prev,choices: jsonResponse.message}))
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }
    }

    const submitScores = async () => {
        if (!secondQuestion?.comfort) {
            console.log({secondQuestion})
            setErrors(prev => ({ ...prev, score: { ...prev.score, comfort: "Please Select One" } }))
            return
        }
        if (!secondQuestion?.looks) {
            setErrors(prev => ({  ...prev ,score: { looks: "Please Select One"}}))
            return
        }
        if (!secondQuestion?.price) {
            setErrors(prev => ({ ...prev,score: { price: "Please Select One" }}))
            return
        }

        try {
            const response = await fetch(`${host}/api/score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailAddress,
                    comfort: secondQuestion.comfort,
                    looks: secondQuestion.looks,
                    price: secondQuestion.price
                })
            });

            const jsonResponse = await response.json()
            if (response.status === 404) {
                navigate('/');
            }
            if (response.status === 202 || response.status === 200) {
                navigate('/thanks')
            }
            else {
                setErrors({ ...prev, score: { price: jsonResponse.message } });
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }
    }

    const completedSurvey = async ()=>{
        try {
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
                navigate('/');
            }
            else {
                setErrors({ ...prev, end: jsonResponse.message });
            }

        } catch (error) {
            console.log("An error Occured")
            return false
        }
    }

    return (
        <questionnaireContext.Provider
            value={{
                emailAddress, onChangeEmailAddress, beginSurvey,
                errors, firstQuestion, secondQuestion, onChangeFirstQuestion,
                submitChoices, onChangeSecondQuestion,
                submitScores, completedSurvey
            }}>
            {children}
        </questionnaireContext.Provider>
    );
};

export default questionnaireContext;
