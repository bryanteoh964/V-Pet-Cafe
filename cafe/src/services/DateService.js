import axios from 'axios';
import { config } from 'dotenv';
const apiUrl = 'http://localhost:3000/date/';

class DateService {
    static fetchCatImage() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`https://api.thecatapi.com/v1/images/search`);
                this.image = res.data[0];
                resolve(this.image);
            } catch (err) {
                console.error('Failed to fetch cat image:', err);
                reject(err);
            }
        })
    }

    async getFavourite(){
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get('https://api.thecatapi.com/v1/favourites'); 
                this.favourite = response.data; 
                resolve(this.favourite);
            } catch(err){
                reject(err)
            }
        })
    }
    async favouriteImage(image_id){
        try{
            let response = await axios.post('https://api.thecatapi.com/v1/favourites', post_body ) 
            this.page = 1;
            this.getFavourites()
        }catch(error){
            console.log(error)
            this.error_message = error.response.data.message
        }
    }
}
export default DateService;
