<template>
    <div>
        <div class="spotify-user">
            <label for="spotify-user">Find Spotify user</label><br>
            <input type="fuser" id="fuser" v-model="user" placeholder="Username"><br>
            <button v-on:click="findUser">Find</button>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <div v-if="userRes">
            <p>{{ userRes.display_name }}</p>
            <p>Number of folowers: {{ userRes.followers.total }}</p>
            <img v-if="picLink" :src="picLink">
        </div>
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
                user: '',
                picLink: '',
            }
        },
        methods: {
            async findUser() {
                this.userRes = await SpotService.getUser(this.user, JSON.parse(localStorage.getItem('authCode')).access_token)
                if(this.userRes.images.length > 0) {
                    this.picLink = this.userRes.images[0].url;
                } else {
                    this.picLink = '';
                }
            }
        }
    }
</script>