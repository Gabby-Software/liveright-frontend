import React, {useState, useEffect} from 'react';
import Styles from './clients.styles';
import {useIsMobile} from "../../hooks/is-mobile.hook";
import ClientsDesktop from "./clients-desktop/clients-desktop.component";
import ClientsMobile from "./clients-mobile/clients-mobile.component";

const Clients = () => {
   const isMobile = useIsMobile();
   if(isMobile) return <ClientsMobile/>;
   return <ClientsDesktop/>;
};

export default Clients;
