<template>
    <div>
        <div class="create-cat">
            <label for="create-cat">Create your cat</label><br>
            <input type="name" v-model="name" placeholder="Cat's name"><br>
            <button v-on:click="createCat">Make</button>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <div>
            <div v-for="(cat, i) in cats">
                <p>{{ cat.name }}</p>
                <p>{{ cat.stats }}</p>
            </div>
        </div>
        <button v-on:click="deleteCat">Detele all cats</button>
    </div>
</template>

<script>
    import CatService from '../services/CatService';

    export default {
        name: 'DatabaseTesting',
        data() {
            return {
                cats: [],
                error: '',
                name: ''
            }
        },
        async created() {
            try {
                this.cats = await CatService.getCats();
            } catch(err) {
                this.error = err.message;
            }
        },
        methods: {
            async createCat() {
                const cat = {name: this.name, stats: {happy: 0, full: 0, awake: 0}};
                await CatService.addCat(cat);
                this.cats = await CatService.getCats();
            },
            async deleteCat() {
                await CatService.deleteCats();
                this.cats = await CatService.getCats();
            }
        }
    }
</script>