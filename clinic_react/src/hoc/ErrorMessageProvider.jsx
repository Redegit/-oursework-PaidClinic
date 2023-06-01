import { createContext, useState } from 'react';
import { PopUpMessage } from '../components/Common/PopUpMessage/PopUpMessage';

export const ErrorMessageContext = createContext();

export const ErrorMessageProvider = ({ children }) => {
    const [errorPopUp, setErrorPopUp] = useState(false)
    const [okPopUp, setOkPopUp] = useState(false)
    const [customPopUp, setCustomPopUp] = useState(false)
    const [customPopUpMessage, setCustomPopUpMessage] = useState("")


    return (
        <ErrorMessageContext.Provider
            value={{
                setErrorPopUp,
                setOkPopUp,
                setCustomPopUp,
                setCustomPopUpMessage
            }}>

            {children}
            {errorPopUp &&
                <PopUpMessage text={"Ошибка"} type={"err"} resetFunc={() => setErrorPopUp(false)} />
            }
            {okPopUp &&
                <PopUpMessage text={"Успех"} type={"ok"} resetFunc={() => setOkPopUp(false)} />
            }
            {customPopUp &&
                <PopUpMessage text={customPopUpMessage} type={"custom"} resetFunc={() => setCustomPopUp(false)} />
            }
        </ErrorMessageContext.Provider>
    )
}