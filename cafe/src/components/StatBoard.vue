<script>
import CatService from '../services/CatService';

const MAX_STAT_VALUE = 1000;
const MIN_STAT_VALUE = 0;
const PASSIVE_STAT_CHANGE = 5;

export default {
    data() {
        return {
            happiness: MAX_STAT_VALUE,
            hunger: MAX_STAT_VALUE,
            cleanliness: MAX_STAT_VALUE,
        };
    },
    beforeUnmount() {
        this.postStats()
    },
    created() {
        this.getStats();
        // Start a timer to decrease stats every second AND check bounds
        setInterval(() => {
            if (this.happiness > MIN_STAT_VALUE) {
                this.happiness -= PASSIVE_STAT_CHANGE;
            }
            if (this.hunger > MIN_STAT_VALUE) {
                this.hunger -= PASSIVE_STAT_CHANGE;
            }
            if (this.cleanliness < MAX_STAT_VALUE) {
                this.cleanliness += PASSIVE_STAT_CHANGE;
            }
            if (this.happiness < MIN_STAT_VALUE) {
                this.happiness = MIN_STAT_VALUE;
            }
            if (this.hunger < MIN_STAT_VALUE) {
                this.hunger = MIN_STAT_VALUE;
            }
            if (this.cleanliness > MAX_STAT_VALUE) {
                this.cleanliness = MAX_STAT_VALUE;
            }
        }, 1000);
    },
    methods: {
        async getStats() {
            const stats = await CatService.getCatStat(localStorage.getItem('authCode'));
            this.happiness = stats.happy;
            this.hunger = stats.full;
            this.cleanliness = stats.awake;
        },
        async postStats() {
            const stats = {happy: this.happiness, full: this.hunger, awake: this.cleanliness};
            CatService.updateCatStat(localStorage.getItem('authCode'), stats);
        },
        increaseHappiness() {
            this.changeStat("happiness", 50);
        },
        increaseHunger() {
            // const snd = new Audio(required("..\assets\nom-nom-nom.wav"));
            // snd.play();
            this.changeStat("hunger", 50);
        },
        takeShower() {
            this.changeStat("happiness", -100);
            this.changeStat("cleanliness", -80);
        },
        changeStat(stat, change) {
            let rate_of_change = 1;
            if (change < 0) {
                rate_of_change = -1;
            }
            let count = 0;
            const interval = setInterval(() => {
                if (count >= Math.abs(change)) {
                    clearInterval(interval);
                }
                switch(stat) {
                    case "happiness":
                        // code block
                        this.happiness += rate_of_change;
                        break;
                    case "hunger":
                        this.hunger += rate_of_change;
                        break;
                    case "cleanliness":
                        this.cleanliness += rate_of_change;
                        break;
                }
                count += Math.abs(rate_of_change);
                this.boundsCheck();
            }, 15);
        },
        boundsCheck() {
            // Make sure stats don't go out of bounds
            if (this.happiness > MAX_STAT_VALUE) {
                this.happiness = MAX_STAT_VALUE;
            }
            if (this.happiness < MIN_STAT_VALUE) {
                this.happiness = MIN_STAT_VALUE;
            }
            if (this.hunger > MAX_STAT_VALUE) {
                this.hunger = MAX_STAT_VALUE;
            }
            if (this.hunger < MIN_STAT_VALUE) {
                this.hunger = MIN_STAT_VALUE;
            }
            if (this.cleanliness < MIN_STAT_VALUE) {
                this.cleanliness = MIN_STAT_VALUE;
            }
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="stats-board">
            <div class="portrait">
                <img src="..\assets\cat-9161.png" class="cat-icon">
            </div>
            <p class="text">Happiness: {{ happiness }}</p>
            <div class="status-bar-border">
                <div class="status-bar happiness" :style="{ width: `${happiness / 10}%` }"></div>
            </div>
            <p class="text">Hunger: {{ hunger }}</p>
            <div class="status-bar-border">
                <div class="status-bar cleanliness" :style="{ width: `${hunger / 10}%` }"></div>
            </div>
            <p class="text">Cleanliness: {{ cleanliness }}</p>
            <div class="status-bar-border">
                <div class="status-bar hunger" :style="{ width: `${cleanliness / 10}%` }"></div>
            </div>
        </div>
        <!-- <div>
            <button id="pet-cat" class="buttons" @click="increaseHappiness">Pet Cat</button>
            <button id="feed-cat" class="buttons" @click="increaseHunger">Feed Cat</button>
            <button id="take-shower" class="buttons" @click="takeShower">Take a Shower</button>
        </div> -->
    </div>
</template>
  
<style scoped>
    .portrait {
        display: inline-block;
        padding: 10px;
        border-radius: 10px;
        background-color: lightgreen;
        border: 1px solid black;
    }
    .cat-icon {
        margin: 0;
        padding: 0;
        height: 5vh;
        user-select: none;
        -webkit-user-drag: none;
        overflow: hidden;
    }
    .container {
        display: flex;
        padding: 0;
        justify-content: center;
        align-items: center;
        height: 40vh;
        left: 0;
        bottom: 0;
    }
    .stats-board {
        height: 30vh;
        width: 18vh;
        padding: 2vw;
        background-color: #f0f0f0;
        border: 1px solid #5c5c5c;
        border-radius: 10px;
        overflow: hidden;
    }
    .text {
        height: 0.5vh;
        width: 10rem;
    }
    .status-bar-border{
        border: 1px solid black;
        width: 100%;
        margin-top: 0px;
    }
    .status-bar {
        bottom: 0;
        left: 0;
        height: 1vh;
    }
    
    .happiness {
      background-color: green;
    }
    .cleanliness {
      background-color: yellow;
    }
    .hunger {
        background-color: red;
    }
</style>