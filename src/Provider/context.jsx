import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
    const navigate = useNavigate();

    const host = import.meta.env.VITE_BACKEND_URL;

    const [emailAddress, setEmailAddress] = useState('');
    const [firstQuestion,setFirstQuestion] = useState('')
    const [secondQuestion,setSecondQuestion] = useState({})
    const [errors, setErrors] = useState({
        welcome: "",
        choices: "",
        score: "",
        end: ""
    })

    const onChangeEmailAddress = (value) => {
        setEmailAddress(value)
    }

    const beginSurvey = async () => {
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
                if(!jsonResponse.step1){
                    navigate('/choice');
                }
                else{
                    navigate('/score')
                }
            }
            
            if (response.status === 201) {
                navigate('/choice');
            }
            else{
                console.log({jsonResponse})
                setErrors({welcome:jsonResponse.message});
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
                errors, firstQuestion, secondQuestion
            }}>
            {children}
        </questionnaireContext.Provider>
    );
};

export default questionnaireContext;
