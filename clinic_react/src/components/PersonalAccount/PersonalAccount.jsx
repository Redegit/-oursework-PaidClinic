import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { RootContext } from '../..';

import './PersonalAccount.scss'
import '../Common/Styles/CommonStyle.scss'

import { PersonalData } from './PersonalData';
import { AppointmentList } from './AppointmentList';


export const PersonalAccount = () => {

    return (
        <div className='container'>
            <div className='big_title'>Личный кабинет</div>
            <PersonalData/>
            <AppointmentList />
        </div>
    )
}