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

    static updateCat(auth, img) {
        axios({
            method: 'post',
            url: `${apiUrl}upCat/`,
            headers: {
                'Authorization': `${auth}`
            },
            data: {
                image: img
            }
        })
    }

    static updateCatName(auth, catName) {
        axios({
            method: 'post',
            url: `${apiUrl}upCatName/`,
            headers: {
                'Authorization': `${auth}`
            },
            data: {
                newName: catName
            }
        })
    }

    static updateCatStat(auth, stat) {
        axios({
            method: 'post',
            url: `${apiUrl}stat/`,
            headers: {
                'Authorization': `${auth}`
            },
            data: {
                stats: stat
            }
        })
    }

    static getCatStat(auth) {
        return new Promise(async (resolve, reject) => {
            try {  
                const config = {
                    headers: {
                        'Authorization': `${auth}`
                    }
                }
                const res = await axios.get(`${apiUrl}getStat/`, config);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static getCat(auth) {
        return new Promise(async (resolve, reject) => {
            try {  
                const config = {
                    headers: {
                        'Authorization': `${auth}`
                    }
                }
                const res = await axios.get(`${apiUrl}getCat/`, config);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
    }

    static async getCatImage(auth) {
        return new Promise(async (resolve, reject) => {
        try {
            const config = {
                headers: {
                    'Authorization': `${auth}`
                }
            }
            const res = await axios.get(`${apiUrl}getCatImage/`,  config);
            const data = res.data;
            resolve(data);
        } catch (err) {
            reject(err);
        }
      }) 
}}

export default CatService;