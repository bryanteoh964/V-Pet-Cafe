<template>
    <div>
      <div class="title">
        <h1>Find your Purrmate</h1>
      </div>
      <img :src="image" class="img" alt="Random cat image">
      <div>
        <button v-on:click="likeImage">Purrfect</button>
        <button v-on:click="getImage">Meow, next</button></div>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
</template>
  
<script>
    import DateService from '../services/DateService';
    
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
        axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace here
        this.getImage();
        this.getFavourites();
      },
      methods: {
        async getImage() {
            const response = await DateService.fetchCatImage();
            this.image = response.url;
            this.liked = false;
        }, 
        async likeImage() {
            const response = await DateService.favouriteImage(this.image);
            this.liked = true;
        },
        async getFavourite() {
            const response = await DateService.fetchFavourites();
            console.log(response);
      }
    } 
    } 
</script>

<style>
    .img {
        width: 500px;
        height: 500px;
    }

    .background {
        background-color: #552727;
        background-position: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .title {
        text-align: left;
        font-size: 10px;
        color: #552727;
    }
</style>
  