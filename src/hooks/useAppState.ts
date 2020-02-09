import { useContext } from "react"
import { AppStateContext } from "../contexts/AppStateContext"

export const useAppState = () => {
    const appState = useContext(AppStateContext);
    return appState;
}