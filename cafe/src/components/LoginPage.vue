<template>
    <h1>Login through Spotify</h1>
    <br>
    <button v-on:click="redirectLogin">LOGIN</button>
    <p class="error" v-if="error">{{ error }}</p>
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
            this.getLogin();
        },
        methods: {
            async getLogin() {
                try {
                    this.loginURL = await SpotService.loginUrl();
                } catch (err) {
                    this.error = err.message;
                }
            },
            redirectLogin() {
                window.location.href=this.loginURL;
            }
        }
    }
</script>