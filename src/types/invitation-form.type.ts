export type InvitationFormType = {
    email: string;
    type: 'training'|'organizational',
    organization_id?: number;
    role_id?: number;
    first_name: string;
    last_name: string;
    birthday: string;
    gender: string;
    phone_number: string;
    address: string;
    country_code: string;
    city: string;
    dietary_restrictions: string;
    injuries: string;
    message: string;
}
