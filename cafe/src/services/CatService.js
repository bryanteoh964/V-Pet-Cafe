import axios from 'axios';
const apiUrl = 'http://localhost:3000/catstat/';

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

    static updateCat(cat, img) {
        const queryParams = new URLSearchParams({
            catId: cat,
            catImg: img
        });
        return axios.post(`${apiUrl}upCat/${queryParams}`)
    }

    static getCat(owner) {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl}getCat/${owner}`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default CatService;