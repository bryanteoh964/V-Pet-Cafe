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

    static updateCatStat(own, stat) {
        axios({
            method: 'post',
            url: `${apiUrl}stat/`,
            headers: {},
            data: {
                owner: own,
                stats: stat
            }
        })
    }

    static getCatStat(owner) {
        return new Promise(async (resolve, reject) => {
            try {  
                const res = await axios.get(`${apiUrl}getStat/${owner}`);
                const data = res.data;
                resolve(data)
            } catch (err) {
                reject(err);
            }
        })
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

    static async getCatImage(cat) {
        return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(`${apiUrl}getCatImage/${cat}`);
            const image = res.data.image;
            resolve(image);
        } catch (err) {
            reject(err);
        }
      }) 
}}

export default CatService;



//get cat image for this specific cat
 //   static getCatImage(cat) {
   //     return new Promise(async (resolve, reject) => {
     //       try {
       //         const res = await axios.get(`${apiUrl}getCatImage/${cat}`);
         //       const data = res.data;
           //     resolve(data)
//            } catch (err) {
  //              reject(err);
    //        }
//        })
  //  }