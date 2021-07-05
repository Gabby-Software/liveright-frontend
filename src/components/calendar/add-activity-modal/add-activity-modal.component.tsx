import React, {useState, useEffect} from 'react';
import Styles from './add-activity-modal.styles';
import Modal from "../../modal/modal.component";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

type Props = {
    isOpen: boolean;
    onCancel: () => boolean;
}
const AddActivityModal = ({isOpen, onCancel}: Props) => {
    return (
        <Modal visible>
            <Styles>
                {/*<Formik>*/}

                {/*</Formik>*/}
            </Styles>
        </Modal>
    )
};

export default AddActivityModal;
