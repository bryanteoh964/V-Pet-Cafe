import axios from 'axios';
const apiUrl = 'http://localhost:3000/spot/';

class SpotService {
    static loginUrl() {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl}getAuthURl`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static getToken(code) {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl}getToken/${code}`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static getUser(user, auth) {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl}getUser/${user}/${auth}`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default SpotService;