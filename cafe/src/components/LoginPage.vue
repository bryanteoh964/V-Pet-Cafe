<template>
    <!-- <h1>Login through Spotify</h1>
    <br>
    <button class="button log-button" v-on:click="redirectLogin">LOGIN</button>
    <p class="error" v-if="error">{{ error }}</p> -->
</template>

<script>
    import SpotService from '../services/SpotService';
    export default {
        name: 'LoginComponent',
        data() {
            return {
                loginURL: null,
                error: ''
            }
        },
        mounted() {
            this.redirectLogin();
        },  
        created() {
            setInterval(() => {
                this.redirectLogin();
            }, 1000);
        },
        methods: {
            async getLogin() {
                console.log("getLogin() called")
                try {
                    this.loginURL = await SpotService.loginUrl();
                    console.log("there is no error");
                } catch (err) {
                    console.log("there is an error");
                    this.error = err.message;
                }
            },
            redirectLogin() {
                console.log("redirectLogin() called")
                this.getLogin().then(() => {
                    window.location.href=this.loginURL;
                });
            }
        }
    }
</script>