<template>
    <div class="background2">
      <div class="title">
        <h1>Find your Purrmate</h1>
      </div>
      <img :src="image" class="img" alt="Random cat image">
      <div>
        <button v-on:click="displayMessage('You have chosen your Purrmate time to go on a coffee date!')">Purrfect</button>
        <button v-on:click="getImage">Meow, next</button></div>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
</template>
  
<script>
    import DateService from '../services/DateService';
    import axios from 'axios';
    
    export default {
      name: 'DateAPITesting',
      data() {
        return {
          image: '',
          liked: false,
          error: '',
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
        },  
        async displayMessage(message) {
            alert(message);
            await this.$router.push('/main');
        }
    } 
    } 
</script>

<style>
    .img {
        width: 500px;
        height: 500px;
    }

    .background2 {
        background-image: url('../assets/lovebackground.svg');
        background-size: cover;
    }

    .title {
        text-align: left;
        top: 0;
        left: 0;
        margin: 0;
        font-size: 15px;
        color: #000000;
        font-weight: 700;
        padding: 20px;
        outline-style: 0;
        text-shadow: none;

    }
</style>
  