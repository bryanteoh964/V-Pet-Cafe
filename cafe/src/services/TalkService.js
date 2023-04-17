import axios from 'axios';
const apiUrl = 'http://localhost:3000/cat/';

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
}

export default TalkService