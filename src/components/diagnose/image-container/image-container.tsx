import React from "react";
import {IFileUpload} from "../../../models/models";

interface IImageContainerProps {
    files: IFileUpload[],
}

export default class ImageContainer extends React.Component<IImageContainerProps, any> {

    render() {
        return (
            <div className='image-container'>
                <div className='row'>
                    {this.props.files && this.props.files.map(file => {
                        return (
                            <div className='col-md-2'>
                                <img src={`data:image/jpeg;base64,${file.content}`} width={85} height={85}
                                     style={{margin: 5}} className='image'/>
                                {file.label &&
                                <div style={{backgroundColor: 'white', marginLeft: 5, width: 85, fontSize: 10}}>DR
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