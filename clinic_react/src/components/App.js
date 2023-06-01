import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageWrapper } from './Common/PageWrapper';
import { Main } from './Main/Main';
import { PersonalAccount } from './PersonalAccount/PersonalAccount';
import { MakeAppointment } from './MakeAppointment/MakeAppointment';
import { Services } from './Services/Services';
import { Doctors } from './Doctors/Doctors';
import { About } from './About/About';
import { Error } from './Error/Error';
import { AdminPage } from './Admin/AdminPage';
import { AdminAuth } from './Admin/AdminAuth';
import { AdminGreetings } from './Admin/AdminGreetings';
import { AdminPatients } from './Admin/AdminPatients';

import { RequireAdmin } from '../hoc/RequireAdmin'
import { AuthProvider } from '../hoc/AuthProvider'
import { RequirePatient } from '../hoc/RequirePatient';
import { ErrorMessageProvider } from '../hoc/ErrorMessageProvider';
import { AdminDoctors } from './Admin/AdminDoctors';
import { AdminServices } from './Admin/AdminServices';
import { AdminAppointments } from './Admin/AdminAppointments';
import { Contacts } from './Contacts/Contacts';
import { TermsAndConditions } from './TermsAndConditions/TermsAndConditions';
import { AdminStatistics } from './Admin/AdminStatistics';

class App extends Component {

  render() {
    return (
      <ErrorMessageProvider>
        <AuthProvider>
          <BrowserRouter basename='/'>
            <Routes>

              <Route path='/' element={<PageWrapper />}>
                <Route index element={<Main />} />
                <Route path='lk' element={
                  <RequirePatient>
                    <PersonalAccount />
                  </RequirePatient>
                } />
                <Route path='make_appointment' element={
                  <RequirePatient>
                    <MakeAppointment />
                  </RequirePatient>
                } />
                <Route path='services' element={<Services />} />
                <Route path='doctors' element={<Doctors />} />
                <Route path='contacts' element={<Contacts />} />
                <Route path='about' element={<About />} />
                <Route path='agreement' element={<TermsAndConditions />} />
                <Route path='*' element={<Error error='404' errorInfo='Запрашиваемая страница не найдена' />} />
              </Route>


              <Route path='/admin' element={<AdminPage />}>
                <Route path='auth' element={<AdminAuth />} />
                <Route index element={
                  <RequireAdmin>
                    <AdminGreetings />
                  </RequireAdmin>
                } />
                <Route path='patients' element={
                  <RequireAdmin>
                    <AdminPatients />
                  </RequireAdmin>
                } />
                <Route path='doctors' element={
                  <RequireAdmin>
                    <AdminDoctors />
                  </RequireAdmin>
                } />
                <Route path='services' element={
                  <RequireAdmin>
                    <AdminServices />
                  </RequireAdmin>
                } />
                <Route path='appointments' element={
                  <RequireAdmin>
                    <AdminAppointments />
                  </RequireAdmin>
                } />
                <Route path='statistics' element={
                  <RequireAdmin>
                    <AdminStatistics />
                  </RequireAdmin>
                } />
                <Route path='*' element={
                  <RequireAdmin>
                    <Error error='404' errorInfo='Запрашиваемая страница не найдена' />
                  </RequireAdmin>
                } />
              </Route>

            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ErrorMessageProvider>
    );
  }
}


export default App;
