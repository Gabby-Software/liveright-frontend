import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'antd';
import Styles from './login.styles';
import userTypes from "../../../enums/user-types.enum";

type LoginDataType = {
  type: string;
  email: string;
  password: string;
};
const initialValues: LoginDataType = {
    type: userTypes.CLIENT,
    email: '',
    password: ''
};
const Login = () => {
    return (
        <Modal title={'Login'} visible footer={null} closeIcon={<div/>}>
            <Button type={'primary'}>LOGIN</Button>
        </Modal>
    )
};

export default Login;
