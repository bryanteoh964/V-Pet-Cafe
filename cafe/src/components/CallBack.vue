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

                localStorage.removeItem('authCode')
                localStorage.setItem('authCode', this.authData)
            }
        }
    }
</script>