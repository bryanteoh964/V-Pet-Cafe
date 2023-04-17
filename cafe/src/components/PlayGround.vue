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
        if (event.clientX > 0.75*screen.Width && event.clientY < 0.25*screen.Height) {
          x_dist = (700) - this.position.x
          y_dist = (70) - this.position.y
        } else{
          x_dist = (event.clientX - 40) - this.position.x
          y_dist = (event.clientY - 30) - this.position.y
        }
        if (event.clientX < 0.1*screen.Width && event.clientY < 0.25*screen.Height) {
          x_dist = (100) - this.position.x
          y_dist = (10) - this.position.y
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
      background-image: url("../assets/Petcafe.svg");
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