import React from 'react';
import {GetInvitationComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './VerifyEmail.module.scss'
import LoadingComponent from "../../../components/loading/loading/LoadingComponent";
import ErrorToManyRequest from "../../../components/error/error-429/ErrorToManyRequest";
const cn = classNames.bind(styles)



const VerifyEmailPage = () => {
    return <div data-testid={'verify'} className={cn("container_verifyEmail_page")}>
        <LoadingComponent/>
        <ErrorToManyRequest/>
        <GetInvitationComponent/>
    </div>;
};

export default VerifyEmailPage;