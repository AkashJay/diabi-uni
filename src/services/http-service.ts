import axios from 'axios'
import { trackPromise } from 'react-promise-tracker';

class HttpService {
    private baseUrl: string = ''

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    public get(url: string): Promise<any> {
        return trackPromise(axios.get(`${this.baseUrl}${url}`).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(new Error(err))
        }))
    }

    public post(url: string, body: any): Promise<any> {
        return trackPromise(axios.post(`${this.baseUrl}${url}`, body, {headers: {"Content-Type": "application/json"}}).then(res => {
            return Promise.resolve(res)
        }).catch(err => {
            return Promise.reject(new Error(err))
        }))
    }
}

export default HttpService;


