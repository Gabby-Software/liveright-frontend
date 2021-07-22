import api from "./api.manager";
import {EP_CHECK_EMAIL_EXIST, EP_INVITE_NEW_USER} from "../enums/api.enum";
import {clientFormSteps} from "../components/clients/add-client-modal/add-client-modal.context";
import {toast} from "../components/toast/toast.component";
import {serverError} from "../pipes/server-error.pipe";
import {InvitationFormType} from "../types/invitation-form.type";
import {AccountType} from "../types/account.type";
import userTypes from "../enums/user-types.enum";

export default class InvitationManager {
    public static checkEmailExist(email: string) {
        return api.get(`${EP_CHECK_EMAIL_EXIST}?email=${email}`)
            .then(res => res.data?.data)
            .catch(e => toast.show({type: 'error', msg:serverError(e)}));
    }
    public static sendInvitationExistingUser(email:string, type: 'training'|'organizational') {
        return api.post(EP_INVITE_NEW_USER, {email, type})
            .then(res => res.data.data)
    }
    public static sendInvitationNewUser(invitationData: InvitationFormType) {
        return api.post(EP_INVITE_NEW_USER, {...invitationData})
            .then(res => res.data.data)

    }
    public static acceptInvitation() {

    }
    public static rejectInvitation() {

    }
}
