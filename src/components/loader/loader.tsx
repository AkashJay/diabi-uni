import React from "react";
import {usePromiseTracker} from "react-promise-tracker";
import animationData from './loaderData';
import Lottie from 'react-lottie';
import './loader.css';

const LoadingIndicator = (props:any)=> {

    const {promiseInProgress} = usePromiseTracker()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div>
            {
                promiseInProgress &&
                <div className='loader'>
                    <div className='spinner'>
                        <Lottie options={defaultOptions} height={75} width={75}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default LoadingIndicator;
