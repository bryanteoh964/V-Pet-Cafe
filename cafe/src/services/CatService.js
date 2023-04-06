import axios from 'axios';
const apiUrl = 'http://localhost:3000/temp/';

class CatService {
    static getCats() {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(apiUrl);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static addCat(cat) {
        return axios.post(`${apiUrl}create/`, cat)
    }

    static deleteCats() {
        return axios.delete(`${apiUrl}delete/`)
    }
}

export default CatService;