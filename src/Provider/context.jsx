import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState('');

    const onChangeEmailAddress = (value) => {
        setEmailAddress(value)
    }

    const beginSurvey = ()=>{
        console.log({emailAddress})
        navigate('/choice');
    }

    return (
        <questionnaireContext.Provider
            value={{
                emailAddress, onChangeEmailAddress,beginSurvey
            }}>
            {children}
        </questionnaireContext.Provider>
    );
};

export default questionnaireContext;
