import React, {useState, useEffect, useMemo} from 'react';
import Styles from './auth-layout.styles';
import {useLocation} from "react-router";

type Props = {children: React.ReactNode};
const AuthLayout = ({children}:Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthLayout;
