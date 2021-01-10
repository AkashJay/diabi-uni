import firebase from "firebase";
import {FIREBASE_CONFIG} from "../constants/constants";
import {IAnalyze, IDiagnose, IPatient} from "../models/models";
import { trackPromise } from 'react-promise-tracker';

class FirebaseServices {
    constructor(config:any) {
        firebase.initializeApp(config)
    }

    public registerPatient(patient:IPatient):Promise<any>{
        const patientListRef = firebase.database().ref('patients/')
        const newPatientRef = patientListRef.push();
        return trackPromise(newPatientRef.set(patient, (err => {
            if (err) {
               Promise.reject("Failed to write data")
            } else {
                Promise.resolve("success")
            }

        })))
    }

    public getPatients():Promise<any>{
        let patients:any[] = []
        return trackPromise(firebase.database().ref('patients/').once('value').then((snapshot) => {
            patients = snapshot.val() ? snapshot.val() : []
            return Promise.resolve(patients)
        }).catch(err => {
            return Promise.reject(err)
        }));
    }

    public saveDiagnoseResult(diagnose:IDiagnose):Promise<any> {
        const diagnoseListRef = firebase.database().ref('diagnose/')
        const newDiagnoseRef = diagnoseListRef.push();
        return trackPromise(newDiagnoseRef.set(diagnose, (err => {
            if (err) {
                Promise.reject("Failed to write data")
            } else {
                Promise.resolve("success")
            }
        })))
    }

    public saveAnalyzeResult(analyze:IAnalyze):Promise<any> {
        const analyzeListRef = firebase.database().ref('analyze/')
        const newAnalyzeRef = analyzeListRef.push();
        return trackPromise(newAnalyzeRef.set(analyze, (err => {
            if (err) {
                Promise.reject("Failed to write data")
            } else {
                Promise.resolve("success")
            }
        })))
    }

    public getPatientAnalysis(NIC: string):Promise<any>{
        const analyzeListRef = firebase.database().ref('analyze')
        let analysis = []
        return trackPromise(analyzeListRef.orderByChild('patientNIC').equalTo(NIC).once('value').then((snapshot) => {
            analysis = snapshot.val() ? snapshot.val() : []
            return Promise.resolve(analysis)
        }).catch(err => {
            return Promise.reject(err)
        }));
    }

    public getPatientDiagnoses(NIC: string):Promise<any>{
        const diagnoseListRef = firebase.database().ref('diagnose')
        let diagnoses = []
        return trackPromise(diagnoseListRef.orderByChild('patientNIC').equalTo(NIC).once('value').then((snapshot) => {
            diagnoses = snapshot.val() ? snapshot.val() : []
            return Promise.resolve(diagnoses)
        }).catch(err => {
            return Promise.reject(err)
        }));
    }

}

export default new FirebaseServices(FIREBASE_CONFIG);
