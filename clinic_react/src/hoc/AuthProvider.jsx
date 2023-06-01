import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(localStorage.admin);
    const [patient, setPatient] = useState(localStorage.patientToken);

    const signAdminIn = (newAdmin, cb) => {
        localStorage.admin = newAdmin;
        setAdmin(newAdmin)
        cb();
    }
    const signAdminOut = (cb) => {
        localStorage.removeItem("admin");
        setAdmin(null)
        cb();
    }

    const signPatientIn = (newPatient, cb) => {
        localStorage.patientId = newPatient.id;
        localStorage.patientToken = newPatient.token;
        setPatient(newPatient)
        cb();
    }
    const signPatientOut = (cb) => {
        localStorage.removeItem("patientId");
        localStorage.removeItem("patientToken");
        setPatient(null)
        cb();
    }

    const value = { admin, patient, signAdminIn, signAdminOut, signPatientIn, signPatientOut }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}