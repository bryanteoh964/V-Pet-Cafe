<template>
    <div class="background3">
        <div class="CC-Left">
                <div class="create-cat">
                        <div class = "createCat">
                        <h1>
                            Adopt a cat!
                        </h1>
                        </div>
                        <input type="name" v-model="name" placeholder="Cat's name" class="name"><br>
                        <button class="make" v-on:click="createCat">Welcome your cat to your family </button>
                        <!-- <button class="delete" v-on:click="deleteCat">Meow, ciao mis gatos</button> -->
                </div>
                <p class="error" v-if="error">{{ error }}</p>
                <div clas="create-cat">
                    <div class="createCat">
                        <h1>
                            Rename your cat!
                        </h1>
                    </div>
                    <input type="text" v-model="newName" placeholder="Cat's New name" class="name"><br>
                    <button class="back" v-on:click="renameCat()">Rename your fur-friend</button>
                </div>
        </div>
        <div class="CC-Right">
                <table class="cat-table">
                        <thead>
                                <tr>
                                    <th>Owner</th>
                                    <th>Cat name</th>
                                    <th>Happiness</th>
                                    <th>Full-ness</th>
                                    <th>Cleanliness</th>
                                </tr>
                        </thead>
                        <tbody>
                                <tr v-for="(cat, i) in cats" :key="i">
                                    <td>{{ cat.user }}</td>
                                    <td>{{ cat.name }}</td>
                                    <td>{{ cat.stats.happy }}</td>
                                    <td>{{ cat.stats.full }}</td>
                                    <td>{{ cat.stats.awake }}</td>
                                </tr>
                        </tbody>
                </table>
        </div>
    </div>
</template>

<script>
    import CatService from '../services/CatService';
    import SpotService from '../services/SpotService';

    export default {
        name: 'DatabaseTesting',
        data() {
            return {
                cats: [],
                error: '',
                name: '',
                newName: '',
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
                const curCat = await CatService.getCat(localStorage.getItem('authCode'));
                
                if (curCat) {
                    return
                }

                const owner = await SpotService.getCurrentUser(localStorage.getItem('authCode'));
                const cat = {name: this.name, image: '', user: owner, stats: {happy: 1000, full: 1000, awake: 1000}};
                console.log(cat);
                await CatService.addCat(cat);
                this.cats = await CatService.getCats();
            },
            async deleteCat() {
                await CatService.deleteCats();
                this.cats = await CatService.getCats();
                this.redirect();
            },
            async renameCat() {
                const catToRename = await CatService.getCat(localStorage.getItem('authCode'));
                if (!catToRename) return;
                await CatService.updateCatName(localStorage.getItem('authCode'), this.newName);
                this.cats = await CatService.getCats();
            },
            redirect() {
                setTimeout(() => {
                    this.$router.push('/main');
                }, 400);
            }
        }
    }
</script>

<style>
    .CC-Left {
        position: relative;
        width: 50vw;
    }
    .CC-Right {
        position: relative;
        width: 50vw;
    }
    .createCat h1 {
        text-shadow: -1px 1px 0 #000,
                          1px 1px 0 #000,
                         1px -1px 0 #000,
                        -1px -1px 0 #000;   
    }
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
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .createCat {
        font-size: 2vw;
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
        margin-top: 1vh;
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
        margin-top: 1vh;
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
        margin-top: 1vh;
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
        margin-top: 1vh;
    }
</style>