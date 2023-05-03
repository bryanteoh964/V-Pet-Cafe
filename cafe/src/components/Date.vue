<template>
    <div class="background2">
      <div class="date-box">
          <div class="title">
            <h1>Find your Purrmate</h1>
          </div>
          <div class="img-container">
            <img :src="image" class="img" alt="Random cat image" v-if="image_found">
          </div>
          <button class="button" v-on:click="displayMessage('You have chosen your Purrmate time to go on a coffee date!')">Purrfect</button>
          <button class="button" v-on:click="getImage">Meow, next</button></div>
          <router-link to="/main" class="back-button button">{{'⇐ Go Back'}}</router-link>
          <p class="error" v-if="error">{{ error }}</p>
    </div>
</template>
  
<script>
    import DateService from '../services/DateService';
    import CatService from '../services/CatService';
    import SpotService from '../services/SpotService';
    import axios from 'axios';
    
    export default {
      name: 'DateAPITesting',
      data() {
        return {
          image: '',
          liked: false,
          error: '',
          image_found: false,
        };
      },
      mounted() {
        axios.defaults.headers.common['x-api-key'] = "DATE_KEY" // Replace here
        this.getImage();
      },
      methods: {
        async getImage() {
            const response = await DateService.fetchCatImage();
            this.image = response.url;
            this.liked = false;
            this.image_found = true;
        },  
        async displayMessage(message) {
            alert(message);
            const user = await SpotService.getCurrentUser(localStorage.getItem('authCode'));
            const cat = await CatService.getCat(user);
            await CatService.updateCat(cat.name, this.image);
            console.log(this.image)
            //go to playground
            this.$router.push('/main');
        },

    } 
    } 
</script>

<style>
    .date-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .img-container {
        display: flex;
        justify-content: center;
        width: 500px;
        height: 500px;
        margin: 2vh;
        background-color: #B9BDC1;
        border-radius: 2vh;
        border: 0.5px solid;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    }
    .img {
        width: 500px;
        height: 500px;
        border-radius: 2vh;
    }

    .background2 {
        background-image: url('../assets/lovebackground.svg');
        background-size: cover;
        height: 96vh;
    }

    .title {
        font-family: 'selfworld', sans-serif;
        text-align: center;
        top: 0;
        left: 0;
        margin: 0;
        font-size: 2.5vh;
        color: #000000;
        font-weight: 700;
        padding: 20px;
        outline-style: 0;
        text-shadow: none;
        margin: 0;
        padding: 0;
    }
    .title h1 {
      margin: 0;
    }
</style>
  