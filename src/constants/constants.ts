export const MENU =  {
    ROOT:'/',
    REGISTRATION:'/registration',
    DIAGNOSE : '/diagnose',
    ANALYSE : '/analyse',
    REPORTS :'/reports',
    LOGIN:'/login'
}


export const BASE_URL = 'http://139.59.30.175'

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCGPoIEdPT2l-BC-e1bvbfXN5hRIRHBams",
    authDomain: "diabi-uni.firebaseapp.com",
    projectId: "diabi-uni",
    storageBucket: "diabi-uni.appspot.com",
    messagingSenderId: "738852419410",
    appId: "1:738852419410:web:3f27efe0f22d9fc52aac8b"
};

export const ALERT_TYPES = {
    SUCCESS:'Success',
    ERROR:'Error'
}

export const DATE_FORMAT = "DD/MM/yyyy"

export const NIC_REGEX = new RegExp("^([0-9]{9}[x|X|v|V]|[0-9]{12})$");
