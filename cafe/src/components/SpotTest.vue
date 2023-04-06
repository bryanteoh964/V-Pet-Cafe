<template>
    <div>
        <div class="spotify-user">
            <label for="spotify-user">Find Spotify user</label><br>
            <input type="fuser" id="fuser" v-model="user" placeholder="Username"><br>
            <button v-on:click="findUser">Find</button>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <p>{{ userRes }}</p>
    </div>
</template>

<script>
    import SpotService from '../services/SpotService';

    export default {
        name: 'SpotAPITesting',
        data() {
            return {
                userRes: null,
                error: '',
                user: ''
            }
        },
        methods: {
            async findUser() {
                this.userRes = await SpotService.getUser(this.user, JSON.parse(localStorage.getItem('authCode')).access_token)
            }
        }
    }
</script>