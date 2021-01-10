import React from 'react';
import {IFileUpload} from "../../models/models";
import {toBase64} from "../../services/utils";

interface IImageUploadProps {
    handleChange: (picture: IFileUpload) => void
    enableMultiple: boolean
}

interface IIMageUploadStates {
    uploadedFile: string
}

export default class ImageUpload extends React.Component<IImageUploadProps, IIMageUploadStates> {

    constructor(props: IImageUploadProps | Readonly<IImageUploadProps>) {
        super(props);
        this.state = {
            uploadedFile: ''
        }
    }

    private handleChange = (picture: any) => {
        const uploadedPictures = picture.target.files;
        [...uploadedPictures].map((file: any) => {
            toBase64(file).then((res:any)=>{
                const imageName = file.name
                const base64 = res.replace("data:image/jpeg;base64,","")
                this.setState({
                    uploadedFile: base64
                })
                this.props.handleChange({content:base64,file_name:imageName})
            })

        })

    }

    render() {
        return (
            <div className='input-box'>
                <input type="file" className="input-field input" onChange={this.handleChange}
                       multiple={this.props.enableMultiple}/>
            </div>
        );
    }
}