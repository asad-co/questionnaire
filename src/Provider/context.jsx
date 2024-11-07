import { createContext, useState } from 'react';

const questionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
    const [emailAddress, setEmailAddress] = useState('');

    const onChangeEmailAddress = (value) => {
        setEmailAddress(value)
    }

    const beginSurvey = ()=>{
        console.log({emailAddress})
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
