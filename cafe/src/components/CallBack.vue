<template>
    <p>Hi there bob</p>
    
</template>

<script>
    import SpotService from '../services/SpotService';

    export default {
        mounted() {
            this.setToken();
            this.$router.replace('/')
        },
        data() {
            return {
                authData: null
            }
        },
        methods: {
            async setToken() {
                this.authData = await SpotService.getToken(this.$route.query.code);

                // using local storage for testing
                // will switch to a more secure option later
                localStorage.removeItem('authCode')
                localStorage.setItem('authCode', JSON.stringify(this.authData))
            }
        }
    }
</script>