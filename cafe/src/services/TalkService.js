import axios from 'axios';
const apiUrl = 'http://localhost:3000/cat/';
const apiUrl2 = 'http://localhost:3000/quote/';

class TalkService {
    static getTalk(question) {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl}${question}`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static getQuote(type) {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl2}${type}`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default TalkService