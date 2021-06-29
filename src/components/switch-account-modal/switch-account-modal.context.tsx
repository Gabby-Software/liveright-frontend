import {createContext} from "react";
import AccountActions from "../../enums/account-actions.enum";

type SwitchAccountModalContextType = {
    setState: (state: AccountActions) => void;
    onClose:() => void;
}
const SwitchAccountModalContext = createContext<SwitchAccountModalContextType>({setState: ()=>{}, onClose: ()=>{}});
export default SwitchAccountModalContext;
