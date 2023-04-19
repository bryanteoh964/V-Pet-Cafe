<script>
  import TalkService from '../services/TalkService';

  export default {
    data() {
      return {
        position: { x: 300, y: 300 },
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
      async talk() {
        this.catTalk = await TalkService.getTalk(this.question)
      },
      handleResize(event) {
        const width = event.currentTarget.innerWidth;
        const height = event.currentTarget.innerHeight;
        console.log(width)
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
        // get the position of the click relative to the character's parent element
        // this.position.x = event.clientX - 40
        // this.position.y = event.clientY - 30
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
        
        // write a for loop that moves the character in steps towards the click
        for (let i = 0; i < 100; i++) {
          setTimeout(() => {
            this.position.x += x_dist / 100
            this.position.y += y_dist / 100
        }, i * 10)
      }
    },
    },
  };
</script>

<template>
  <div class="text-box">
      <input v-model="question" placeholder="Question"><br>
      <button v-on:click="talk">Talk</button>
  </div>
  <div id="playground">
      <div 
      class="pet"
      :style="{ top: position.y + 'px', left: position.x + 'px' }" 
      @click="moveTo($event)"
      tabindex="0">
        <img src="..\assets\cat-9161.png" class="cat">
        <p> {{ catTalk }}</p>
      </div>
  </div>
</template>

<style>
    #playground {
      background-image: url("../assets/petcafebackground.svg");
      margin: 0;
      top: 100px;
      padding: 0;
      height: 95vh;
      width: 100wh;
      background-size: 100%;
      background-repeat: no-repeat;
      /* background-color: #cccccc; */
    }
    .cat {
      margin: 0;
      padding: 0;
      width: 9vw;
    }
    /* #playground {
        height: 500px;
        width: 500px;
        outline: 0px solid black;
        position: relative;
    } */
    .pet {
        height: 150px;
        width: 150px;
        position: relative;
        top: 78px;
        left: 2px;
    }
    .textbox {
        position: fixed;
        top: 0;
        left: 100px;
        text-align: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>