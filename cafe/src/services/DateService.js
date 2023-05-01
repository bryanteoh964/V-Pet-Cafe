import axios from 'axios';
import { config } from 'dotenv';
const apiUrl = 'http://localhost:3000/date/';
axios.defaults.headers.common['x-api-key'] = "live_30WtDbthzKAWb31WrVZrLxawLpkpp8zwmKWywVFGVs0skdJtFo8q5RDBsfOAYMGb" // Replace here

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
}
export default DateService;
