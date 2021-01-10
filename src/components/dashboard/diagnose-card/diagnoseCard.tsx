import React from "react";
import {IFileUpload} from "../../../models/models";

interface IDiagnoseCardProps {
    files: IFileUpload[],
}

export default class DiagnoseCard extends React.Component<IDiagnoseCardProps, any> {

    render() {
        return (
            <div className='diagnose-card'>
                <div className='row'>

                    {this.props.files && this.props.files.map(file => {
                        return (
                            <div className='col-md-3'>
                                <img src={`data:image/jpeg;base64,${file.content}`} width={100} height={100}
                                     style={{margin: 5}} className='image'/>
                                {file.label &&
                                <div style={{backgroundColor: 'white', marginLeft: 5, width: 100, fontSize: 10}}>DR
                                    Stage : {file.label}</div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}