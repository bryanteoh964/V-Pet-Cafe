<template>
    <p></p>
</template>

<script>
    import SpotService from '../services/SpotService';

    export default {
        mounted() {
            this.setToken();
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

                this.$router.replace('/');
            }
        }
    }
</script>