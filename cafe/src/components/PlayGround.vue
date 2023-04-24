<script>
  import TalkService from '../services/TalkService';
  import StatBoard from './StatBoard.vue';

  export default {
    components: {
      StatBoard
    },
    data() {
      return {
        position: { x: 300, y: 300},
        prev_position: { x: 300, y: 300},
        catTalk: "",
        question: ""
      };
    },
    mounted() {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('click', this.handleClick);
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('click', this.handleClick);
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      callStatBoard(call) {
        const statBoard = this.$refs.statBoardRef;
        switch(call) {
          case "increaseHappiness":
            statBoard.increaseHappiness();
            break;
          case "increaseHunger":
            statBoard.increaseHunger();
            break;
          case "takeShower":
            statBoard.takeShower();
            break;
        }
      },
      async talk() {
        this.catTalk = await TalkService.getTalk(this.question)
      },
      handleResize(event) {
        const width = event.currentTarget.innerWidth;
        const height = event.currentTarget.innerHeight;
        this.position.x = 0.2 * width;
        this.position.y = 0.2 * height;
      },
      handleKeyDown(event) {
        switch (event.code) {
          case 'ArrowUp':
            this.position.y -= 30;
            break;
          case 'ArrowDown':
            this.position.y += 30;
            break;
          case 'ArrowLeft':
            this.position.x -= 30;
            break;
          case 'ArrowRight':
            this.position.x += 30;
            break;
        }
        if (this.position.x < 0) {
          this.position.x = 0;
        }
        if (this.position.y < 0) {
          this.position.y = 0;
        }
        if (this.position.x > screen.width + 20) {
          this.position.x = this.position.x  - 30;
        }
        if (this.position.y > screen.height - 50) {
          this.position.y = this.position.y - 30;
        }
      },
      handleClick(event) {
        // save the previous position
        this.prev_position.x = this.position.x
        this.prev_position.y = this.position.y
        // get the position of the click relative to the character's parent element
        let x_dist = 0
        let y_dist = 0
        // moving cat towards labels
        // cafe label
        if (event.clientX < 0.22*screen.availWidth && event.clientX > 0.14*screen.availWidth && event.clientY > 0.07*screen.availHeight && event.clientY < 0.13*screen.availHeight) {
          x_dist = 0.32*screen.width - this.position.x
          y_dist = 0.2*screen.height - this.position.y
        // play label
        } else if (event.clientX < 0.46*screen.width && event.clientX > 0.39*screen.width && event.clientY > 0.56*screen.height && event.clientY < 0.61*screen.height) {
          x_dist = 0.25*screen.availWidth - this.position.x
          y_dist = 0.55*screen.height - this.position.y
        // bathroom label
        } else if (event.clientX < 0.82*screen.width && event.clientX > 0.73*screen.width && event.clientY > 0.07*screen.height && event.clientY < 0.13*screen.height) {
          x_dist = 0.78*screen.availWidth - this.position.x
          y_dist = 0.17*screen.height - this.position.y
        // sleep label
        } else if (event.clientX < 0.86*screen.width && event.clientX > 0.78*screen.width && event.clientY > 0.51*screen.height && event.clientY < 0.55*screen.height) {
          x_dist = 0.88*screen.availWidth - this.position.x
          y_dist = 0.62*screen.height - this.position.y
        } else{
          x_dist = (event.clientX - 40) - this.position.x
          y_dist = (event.clientY - 30) - this.position.y
        }
        x_dist -= 50
        y_dist -= 40
        
        // write a for loop that moves the character in steps towards the click
        for (let i = 0; i < 100; i++) {
          setTimeout(() => {
            this.position.x += x_dist / 100
            this.position.y += y_dist / 100
          }, i * 10)
        }
      },
      doNotMove(event) {
        this.prev_position.x = this.position.x
        this.prev_position.y = this.position.y
        // get the position of the click relative to the character's parent element
        let x_dist = -((event.clientX - this.prev_position.x)) + 90
        let y_dist = -((event.clientY - this.prev_position.y)) + 70
        
        // write a for loop that moves the character in steps towards the click
        for (let i = 0; i < 100; i++) {
          setTimeout(() => {
            this.position.x += x_dist / 100
            this.position.y += y_dist / 100
          }, i * 10)
        }
        this.prev_position.x = this.position.x
        this.prev_position.y = this.position.y
      },
    },
  };
</script>

<template>
  <div class="background">
    <div class="stat-display" @click="doNotMove($event)">
      <StatBoard ref="statBoardRef"></StatBoard>
    </div>
    <div class="text-box" @click="doNotMove($event)">
        <input class="input" v-model="question" placeholder="Meow, let's chat!">
        <button class="submit" v-on:click="talk">Talk</button>
    </div>
    <div class="playground">
        <div 
        class="pet"
        :style="{ top: position.y + 'px', left: position.x + 'px' }" 
        @click="moveTo($event)"
        tabindex="0">
          <img src="..\assets\cat-9161.png" class="cat">
          <p class="response-box"> {{ catTalk }}</p>
        </div>
    </div>
    <div>
        <img src="..\assets\play.png" class="playsign sign" id="pet-cat"  @click="doNotMove($event); callStatBoard('increaseHappiness')">
        <div id="feed-cat">
          <div class="hover">
            <img src="..\assets\eat.png" class="eatsign sign" @click="doNotMove($event); callStatBoard('increaseHunger')">
          </div>
          <div class="disclaimer">Disclaimer: Chocolate is not safe for cats!!</div>
        </div>
        <img src="..\assets\shower.png" class="showersign sign" id="take-shower" @click="doNotMove($event); callStatBoard('takeShower')">
    </div>
  </div>
</template>

<style>
    .background {
      position: fixed;
    }
    .playground {
      background: url("../assets/Petbackground.svg") no-repeat center fixed;  
      background-size: cover;
      margin: 0;
      top: 0;
      left:0;
      padding: 0;
      height: 98vh;
      width: 98vw;
      overflow: hidden;
      background-repeat: no-repeat;
    }

    .sign{
      border-radius: 10px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    }
    .eatsign {
      top: 12%;
      left: 22%;
      width: 8vw; 
      height: auto;
    }
    .showersign {
      position: absolute;
      top: 12%;
      left: 79%;
      width: 8vw; 
      height: auto;
    }
    .playsign {
      position: absolute;
      top: 85%;
      left: 50%;
      width: 8vw; 
      height: auto;
    }
    .sleepsign {
      position: absolute;
      top: 70%;
      left: 74%;
      width: 8vw; 
      height: auto;
    }

    .cat {
      margin: 0;
      padding: 0;
      width: 9vw;
      user-select: none;
      -webkit-user-drag: none;
      overflow: hidden;
      pointer-events: none; 
    }
    .response-box {
      height: auto;
      width: 9vw;
    }
    .pet {
        margin: 0;
        padding: 0 0;
        position: relative;
        top: 78px;
        left: 2px;
    }
        
    .stat-display {
      position: absolute;
      bottom: 2.5vh;
      left: 1vw;
    }
    .buttons {
      position: absolute;
    }
    #pet-cat {
      position: absolute;
      top: 60vh;
      left: 25vw;
    }
    #feed-cat {
      position: absolute;
      top: 23vh;
      left: 25vw;
    }
    .disclaimer {
      display: none;
    }
    .hover:hover + .disclaimer {
      display: block;
      color: red;
      background-color: white;
      padding: 5px;
      margin: 20px;
      border-radius: 10px;
      border: 1px solid transparent;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.49);
    }
    #take-shower {
      position: absolute;
      top: 15vh;
      left: 79vw;
    }

    .text-box {
      display: inline-block;
      position: absolute;
      background-color: #fff;
      padding: 10px;
      width: auto;
      height: auto;
      top: 86vh;
      left: 22vw;
      border-radius: 10px;
      font-family: Avenir;
      font-size: 14px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .input, .submit {
        display: inline-block;
        padding: 10px 15px;
        font-size: 20px;
        border-radius: 500px;
    }
    .input {
        border: 1px solid lightgray;
        height: 2.5vh;
        width: 35vw;
    }
    .submit {
        background-color: lightgreen;
        border: 1px solid transparent;
    }

    .layered-image {
    position: absolute;
    top: 0;
    left: 0;
    }
</style>