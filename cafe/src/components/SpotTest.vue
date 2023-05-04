<template>
    <div>
        <button v-on:click="test">Find</button>
        <button v-on:click="logOut">Out</button>
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
    import TalkService from '../services/TalkService';

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
            async test() {
                const t = await TalkService.getTalk('happiness');
                console.log(t)
            },
            async findUser() {
                this.userRes = await SpotService.getUser(this.user, localStorage.getItem('authCode'))
                if(this.userRes.images.length > 0) {
                    this.picLink = this.userRes.images[0].url;
                } else {
                    this.picLink = '';
                }
            },
            async logOut() {
                const log = await SpotService.logout(localStorage.getItem('authCode'))
                localStorage.removeItem('authCode')
            }
        }
    }
</script>