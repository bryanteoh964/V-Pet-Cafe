<script>
  export default {
    data() {
      return 0
    }
  }
</script>

<template>
  <div class="start_page">
    <h1>Welcome to the V-Pet Cafe!</h1><br>
    <div>
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/main" class="button">Playground</router-link>
      <router-link to="/dbtest" class="button">DbTest</router-link>
      <router-link to="/spottest" class="button">SpotTest</router-link>
    <p>Click anywhere to move your cat to the desired location.</p>
    <p>Click on the cactivity labels to interact with your cat.</p>
    <p>HAVE FUN!!</p>
    </div>
  </div>
</template>

<style>
  .body {
    background-color: white;
    margin: 0;
    top: 100px;
    padding: 0;
  }
  .start_page {
    margin: auto;
    padding: 100px ;
    width: 50%;
    border: 2px solid rgb(168, 168, 168);
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 12px;
  }
  .button {
    background-color: green;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
  }
</style>

