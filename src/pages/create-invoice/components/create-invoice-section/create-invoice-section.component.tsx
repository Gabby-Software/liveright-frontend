import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-section.styles';
import PageSubtitle from '../../../../components/titles/page-subtitle.styles';

type Props = {
    title: string;
    children: React.ReactNode
};
const CreateInvoiceSection = ({title, children}:Props) => {
    return (
        <Styles>
            <PageSubtitle className={'create-invoice__section-title'}>{title}</PageSubtitle>
            {children}
        </Styles>
    );
};

export default CreateInvoiceSection;
