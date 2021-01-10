import React from "react";
import HamburgerMenu from "../components/hamburgerMenu/hamburgerMenu";
import {ALERT_TYPES, BASE_URL, MENU} from "../constants/constants";
import '../app.css';
import Registration from "../components/registration/registration";
import Diagnose from "../components/diagnose/diagnose";
import Analyze from "../components/analyze/analyze";
import AlertPopup from "../components/alert-popup/alert-popup";
import {IAnalyze, IDiagnose, IFileUpload, IPatient} from "../models/models";
import FirebaseService from "../services/firebase-service";
import HttpService from "../services/http-service";
import Dashboard from "../components/dashboard/dashboard";
import {isEqual} from 'lodash';

interface IAppContainerStates {
    selectedMenu: string;
    alertType: string;
    alertMessage: string,
    showAlert: boolean,
    patientDiagnoses: any[]
    patientAnalysis: any[];
    selectedPatient:any
}

interface IAppContainerProps {
    selectedNIC: string;
    patients:IPatient[]
}

class AppContainer extends React.Component<IAppContainerProps, IAppContainerStates> {
    private httpService: HttpService = new HttpService(BASE_URL)

    constructor(props: IAppContainerProps) {
        super(props);
        this.state = {
            selectedMenu: MENU.ROOT,
            alertMessage: '',
            alertType: '',
            showAlert: false,
            patientDiagnoses: [],
            patientAnalysis: [],
            selectedPatient:null
        }
    }

    componentWillReceiveProps(nextProps: Readonly<IAppContainerProps>, nextContext: any) {
        if (!isEqual(nextProps.selectedNIC, this.props.selectedNIC)) {
            this.getPatientDiagnoses(nextProps.selectedNIC);
            this.getPatientAnalysis(nextProps.selectedNIC)
            this.setSelectedPatient(nextProps.patients,nextProps.selectedNIC)
        }
    }

    private setSelectedPatient(patients:any,nic: string){
        let selectedPatient = null
        patients && Object.keys(patients).map(key => {
            if(patients[key].nic === nic ){
                selectedPatient = patients[key]
            }
        })
       this.setState({
           selectedPatient:selectedPatient
       })
    }

    private onMenuClick = (path: string) => {
        this.setState({
            selectedMenu: path
        })
    }

    private onRegister = (register: IPatient) => {
        FirebaseService.registerPatient(register).then(res => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.SUCCESS,
                alertMessage: 'Patient Registered Successfully!'
            })
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.ERROR,
                alertMessage: 'Failed to register patient'
            })
        })
    }

    private onDiagnose = (): Promise<any> => {
        return this.httpService.get(":5000/predict").then(res => {
            return Promise.resolve(res);
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.ERROR,
                alertMessage: 'Failed to run diagnose'
            })
        })
    }

    private onUpload = (documents: IFileUpload[]) => {
        const diagnoseBody = {documents: documents};
        this.httpService.post(":8888/uploads/", diagnoseBody).then(res => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.SUCCESS,
                alertMessage: 'Images uploaded Successfully!'
            })
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.ERROR,
                alertMessage: 'Failed to upload images'
            })
        })
    }
    private onSaveDiagnose = (diagnose: IDiagnose) => {
        FirebaseService.saveDiagnoseResult(diagnose).then(res => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.SUCCESS,
                alertMessage: 'Diagnoses Saved!'
            })
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.ERROR,
                alertMessage: 'Failed to save diagnoses'
            })
        })
    }

    private onAnalyze = (analyzeBody: any[]): Promise<any> => {
        return this.httpService.post(':5000/predictDR', analyzeBody).then(res => {
            const results = res.data;
            return Promise.resolve(results)
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.ERROR,
                alertMessage: 'Failed to run analyzes'
            })
            return Promise.reject(err)

        })
    }

    private onSaveAnalyze = (analyzeBody: IAnalyze) => {
        FirebaseService.saveAnalyzeResult(analyzeBody).then(res => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.SUCCESS,
                alertMessage: 'Analyzes Saved!'
            })
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertType: ALERT_TYPES.ERROR,
                alertMessage: 'Failed to save analyzes'
            })
        })
    }

    private getPatientAnalysis = (selectedNIC:string) => {
        if (selectedNIC !== "") {
            FirebaseService.getPatientAnalysis(selectedNIC).then(res => {
               this.setState({patientAnalysis: res})
            }).catch(err => {
                this.setState({
                    showAlert: true,
                    alertType: ALERT_TYPES.ERROR,
                    alertMessage: 'Failed to fetch patient analyzes'
                })
            })
        }
    }

    private getPatientDiagnoses = (selectedNIC:string) => {
        if (selectedNIC !== "") {
            FirebaseService.getPatientDiagnoses(selectedNIC).then(res => {
                this.setState({patientDiagnoses: res})
            }).catch(err => {
                this.setState({
                    showAlert: true,
                    alertType: ALERT_TYPES.ERROR,
                    alertMessage: 'Failed to fetch patient diagnoses'
                })
            })
        }
    }


    render() {
        return (
            <div className='page-container' style={{backgroundColor: '#172631'}}>
                <HamburgerMenu onMenuClick={this.onMenuClick}/>
                <div className='page-content-wrapper'>
                    <div className="page-content main-content" style={{minHeight: 876}}>
                        <div className='row'>
                            {
                                this.state.selectedMenu === MENU.ROOT &&
                                <div className='col-md-8 offset-md-2'>
                                    <Dashboard
                                        patientAnalysis={this.state.patientAnalysis}
                                        patientDiagnoses={this.state.patientDiagnoses}
                                        patient={this.state.selectedPatient}
                                    />
                                </div>
                            }
                            {
                                this.state.selectedMenu === MENU.REGISTRATION &&
                                <div className='col-md-8 offset-md-2'>
                                    <Registration
                                        onRegister={this.onRegister}
                                    />
                                </div>
                            }

                            {
                                this.state.selectedMenu === MENU.DIAGNOSE &&
                                <div className='col-md-8 offset-md-2'>
                                    <Diagnose
                                        onDiagnose={this.onDiagnose}
                                        onSave={this.onSaveDiagnose}
                                        onUpload={this.onUpload}
                                        selectedNIC={this.props.selectedNIC}
                                    />
                                </div>
                            }

                            {
                                this.state.selectedMenu === MENU.ANALYSE &&
                                <div className='col-md-8 offset-md-2'>
                                    <Analyze
                                        onAnalyze={this.onAnalyze}
                                        onAnalyzeSave={this.onSaveAnalyze}
                                        selectedNIC={this.props.selectedNIC}
                                    />
                                </div>
                            }
                        </div>
                        {
                            this.state.showAlert &&
                            <AlertPopup
                                alertMessage={this.state.alertMessage}
                                alertType={this.state.alertType}
                                onOkClick={() => {
                                    this.setState({showAlert: false})
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AppContainer;
