import { useContext } from "react";
import { ErrorMessageContext } from "../hoc/ErrorMessageProvider";


export function useErrorMessage() {
    return useContext(ErrorMessageContext);
}