<template>
    <div>
        <div class="create-cat">
            <label for="create-cat">Create your cat</label><br>
            <input type="name" id="create-cat-name" v-model="name" placeholder="Cat's name"><br>
            <button v-on:click="createCat">Make</button>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="cat-container">
            <div class="cat" v-for="(cat, index) in cats">
                <p class="name">{{ cat.name }}</p>
                <p class="name">{{ cat.stats }}</p>
            </div>
        </div>
        <button v-on:click="deleteCat">Detele all cats</button>
    </div>
</template>

<script>
import CatService from '../services/CatService';

export default {
    name: 'LoginComponent',
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