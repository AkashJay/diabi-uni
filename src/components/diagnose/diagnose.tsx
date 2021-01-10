import React from "react";
import './diagnose.css';
import ImageUpload from "../image-upload/image-upload";
import ImageContainer from "./image-container/image-container";
import {IDiagnose, IFileUpload} from "../../models/models";
import moment from "moment";
import classNames from "classnames";
import {DATE_FORMAT} from "../../constants/constants";

interface IDiagnoseStates {
    files: IFileUpload[];
}

interface IDiagnoseProps{
    onUpload:(fileUpload:IFileUpload[]) => void;
    onSave:(diagnose:IDiagnose) => void;
    onDiagnose:() => Promise<any>;
    selectedNIC:string;
}

export default class Diagnose extends React.Component<IDiagnoseProps, IDiagnoseStates> {

    constructor(props: IDiagnoseProps) {
        super(props);
        this.state = {
            files: []
        }

    }

    private onImageUpload = (file: any) => {
        const files = this.state.files;
        files.push(file);
        this.setState({
            files: files
        })
    }

    private onDiagnose = () => {
        this.props.onDiagnose().then(res => {
            const diagnoseResults = res.data;
            const files = this.state.files
            diagnoseResults.map((res:any) => {
                files.map(file => {
                    if(file.file_name === res.id){
                        file.label = res.label
                    }
                })
            })
            this.setState({
                files:files
            })
        }).catch(err => {
            console.log("Diagnose error",err )
        })
    }

    private onUpload = () => {
        const files = this.state.files;
        const documents:IFileUpload[] = []
        files.map(file => {
            documents.push({content:file.content,file_name:file.file_name})
        })
        this.props.onUpload(documents)

    }

    private onSave = () => {
        let diagnose:IDiagnose = {
            dateDiagnosed:moment().format(DATE_FORMAT),
            images:this.state.files,
            patientNIC:this.props.selectedNIC,
        };
        this.props.onSave(diagnose)
    }

    render() {
        return (
                <div className='diagnose'>
                    <div className='row'>
                        <div className='col-md-4'>Upload scanned eye images</div>
                        <div className='col-md-8 text-right'>
                            <ImageUpload handleChange={this.onImageUpload} enableMultiple={true}/>
                        </div>
                    </div>
                    <div className='row'>
                        <ImageContainer files={this.state.files}/>
                    </div>
                    <div className='row'>
                        <div className='offset-md-3 col-md-10 '>
                            <div className='button-bar'>
                                <button className={classNames({'submit-button': this.state.files.length !== 0, 'disable-button': this.state.files.length === 0})} onClick={this.onUpload} disabled={this.state.files.length === 0}>
                                    <i className="fa fa-upload"></i>
                                    <span style={{marginLeft: 2}}>
                                    Upload
                                </span>
                                </button>
                                <button className={classNames({'submit-button': this.state.files.length !== 0, 'disable-button': this.state.files.length === 0})} onClick={this.onDiagnose} disabled={this.state.files.length === 0}>
                                    <i className="fa fa-refresh"></i>
                                    <span style={{marginLeft: 2}}>
                                    Diagnose
                                </span>
                                </button>
                                <button className={classNames({'submit-button': this.state.files.length !== 0, 'disable-button': this.state.files.length === 0})} onClick={this.onSave} disabled={this.state.files.length === 0}>
                                    <i className="fa fa-save"></i>
                                    <span style={{marginLeft: 2}}>
                                    Save
                                </span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
        );
    }
}