import React from "react";
import './dashboard.css';
import DiagnoseCard from "./diagnose-card/diagnoseCard";
import {downloadURI, printElem} from "../../services/utils";
import ReactDOMServer from "react-dom/server";
import {jsPDF} from "jspdf";
import {IPatient} from "../../models/models";
// @ts-ignore
import ReactToPdf from "react-to-pdf";


const html2canvas = require("html2canvas")

interface IDashboardProps {
    patientAnalysis: any[];
    patientDiagnoses: any[];
    patient: IPatient | null
}

class Dashboard extends React.Component<IDashboardProps, any> {
    private printRef: React.RefObject<any> = React.createRef();
    private domServer = ReactDOMServer.renderToStaticMarkup(this.render())
    print = () => {
        const input = document.getElementById('diagnose');
        // html2canvas(input)
        //     .then((canvas: any) => {
        //         const imgData = canvas.toDataURL('image/png');
        //         const pdf = new jsPDF();
        //         // @ts-ignore
        //         pdf.addImage(this.domServer, 'PNG', 0, 0);
        //         // pdf.output('dataurlnewwindow');
        //         const fileName = this.props.patient ? `${this.props.patient.name} report.pdf` : `Patient report.pdf`
        //         pdf.save(fileName);
        //     })
        // ;
        console.log("canvas ", input)
        window.scrollTo(0,0);
        const fileName = this.props.patient ? `${this.props.patient.name} report.png` : `Patient report.png`
        html2canvas((input)).then((canvas:any) => {
            const myImage = canvas.toDataURL();
            const pdf = new jsPDF();
            downloadURI(myImage, fileName);
        }).catch((err:any) => {
            console.log(err)
        });
    }

    render() {
        const {patientAnalysis, patientDiagnoses} = this.props;
        return (
            <div className='diagnose' style={{minHeight: 100}} >
                {patientAnalysis.length === 0 && patientDiagnoses.length === 0 && !this.props.patient &&
                <div className='row'>
                    <div className='col-md-12 text-center'>Select Patient NIC to view details</div>
                </div>
                }
                <div id={'diagnose'} ref={this.printRef}>
                    {
                        this.props.patient &&
                        <div className='row'>
                            <div className='col-6'>Patient Name:{this.props.patient.name}</div>
                            <div className='col-6'>Patient NIC:{this.props.patient.nic}</div>
                        </div>
                    }
                    {
                        patientDiagnoses.length !== 0 &&
                        <div className='row'>
                            <div className='col-md-12 text-center' style={{fontSize: 20}}>DIAGNOSES</div>
                            <div className='col-md-12'>
                                {Object.keys(patientDiagnoses).reverse().map((pd: any) => {
                                    return (
                                        <div className='row'>
                                            <div
                                                className='col-md-12'>{`Diagnosed Date : ${patientDiagnoses[pd].dateDiagnosed}`}</div>
                                            <div className='col-md-12'>
                                                <DiagnoseCard files={patientDiagnoses[pd].images}/>
                                            </div>
                                            <hr/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                    {
                        patientAnalysis.length !== 0 &&
                        <div className='row'>
                            <div className='col-md-12 text-center' style={{fontSize: 20}}>ANALYSIS</div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    {Object.keys(patientAnalysis).reverse().map((pa: any) => {
                                        return (
                                            <div className='col-md-4 analyze-card'>
                                                <div className='row'>
                                                    <div className='col-md-6'>Date</div>
                                                    <div
                                                        className='col-md-6'>{patientAnalysis[pa].analyzeDate} </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-6'>Right VA</div>
                                                    <div className='col-md-6'>{patientAnalysis[pa].rightVA} </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-6'>Left VA</div>
                                                    <div className='col-md-6'>{patientAnalysis[pa].leftVA} </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-6'>Duration</div>
                                                    <div className='col-md-6'>{patientAnalysis[pa].howLong} </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-6'>RD Status</div>
                                                    <div className='col-md-6'>{patientAnalysis[pa].prediction} </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {(patientAnalysis.length !== 0 || patientDiagnoses.length !== 0) &&
                <div className='row' id='print_button'>
                    <div className='col-md-12 text-right'>
                        {/*<ReactToPdf targetRef={this.printRef} filename="code-example.pdf" options={options}>*/}
                        {/*    {(targetRef: any) => <button className='submit-button' onClick={targetRef.toPdf}>*/}
                        {/*        <i className="fa fa-download"></i>*/}
                        {/*        <span style={{marginLeft: 2}}>*/}
                        {/*    Download Report*/}
                        {/*</span>*/}
                        {/*    </button>}*/}

                        {/*</ReactToPdf>*/}
                        <button className='submit-button' onClick={this.print}>
                            <i className="fa fa-download"></i>
                            <span style={{marginLeft: 2}}>
                                Download Report
                            </span>
                        </button>
                    </div>
                </div>
                }

            </div>
        );
    }
}

export default Dashboard;