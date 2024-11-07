import { createContext, useState } from 'react';

const questionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
    const [emailAddress, setEmailAddress] = useState('');

    const onChangeEmailAddress = (value) => {
        setEmailAddress(value)
    }

    return (
        <questionnaireContext.Provider
            value={{
                emailAddress, onChangeEmailAddress
            }}>
            {children}
        </questionnaireContext.Provider>
    );
};

export default questionnaireContext;
