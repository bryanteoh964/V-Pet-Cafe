<template>
    <div class="background3">
        <div class="create-cat">
            <div class = "createCat">
            <h1>
                Adopt a cat!
            </h1>
            </div>
            <input type="name" v-model="name" placeholder="Cat's name" class="name"><br>
            <button class="make" v-on:click="createCat">Welcome your cat to your family </button>
            <button class="delete" v-on:click="deleteCat">Meow, ciao, mis gatos</button>
        </div>
        <p class="error" v-if="error">{{ error }}</p>
        <table class="cat-table">
        <thead>
            <tr>
            <th>Cat name</th>
            <th>Cat statistics</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cat, i) in cats" :key="i">
            <td>{{ cat.name }}</td>
            <td>{{ cat.stats }}</td>
            </tr>
        </tbody>
        </table>
        <router-link to="/main" class="back">Time to play with your cat!</router-link>
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

<style>
    .background3 {
        background-image: url('../assets/catStore.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .createCat {
        font-size: 2.8vw;
        text-align: left;
        color: rgb(255, 255, 255);
        user-select: none;
    }
    .name {
        width: 20vw;
        height: 5vh;
        font-size: 1.5vw;
        margin: 1vh 0 1vh 0;
        color: rgb(0, 0, 0);
        border-radius: 500px;
        border: 1px solid transparent;
    }
    .make {
        display: inline-block;
        padding: 5px 10px;
        font-size: 20px;
        border-radius: 500px;
        background-color: lightgreen;
        border: 1px solid transparent;
        cursor: pointer;
        margin-right: 0.5vw;
    }
    .make:hover {
      background-image: linear-gradient(rgb(0 0 0/3%) 0 0);
      box-shadow: 0 0.2px 0.6px 0.2px rgba(0, 0, 0, 0.7);
    }
    .delete {
        display: inline-block;
        padding: 5px 10px;
        font-size: 20px;
        border-radius: 500px;
        background-color: lightgreen;
        border: 1px solid transparent;
        cursor: pointer;
        margin-right: 0.5vw;
    }
    .delete:hover {
        background-image: linear-gradient(rgb(0 0 0/3%) 0 0);
        box-shadow: 0 0.2px 0.6px 0.2px rgba(0, 0, 0, 0.7);
    }
    .cat-table {
        border-collapse: collapse;
        margin-top: 1rem;
    }
    .cat-table th, .cat-table td {
        padding: 1rem;
        text-align: 10px;

    }
    .cat-table th {
        font-weight: bold;
        border-bottom: 2px solid #ddd;
        background-color: white;
    }
    .cat-table td {
        border-bottom: 1px solid #ddd;
        background-color: white;
    }
    .back {
        display: inline-block;
        padding: 5px 10px;
        font-size: 20px;
        border-radius: 500px;
        background-color: lightgreen;
        border: 1px solid transparent;
        cursor: pointer;
        margin-right: 5vw;
        margin-top: 3vh;
    }
</style>