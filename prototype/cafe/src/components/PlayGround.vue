<script>
  export default {
    data() {
      return {
        position: { x: 300, y: 300 },
      };
    },
    mounted() {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('click', this.handleClick);
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('click', this.handleClick);
    },
    methods: {
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
        if (event.clientX > 600 && event.clientY < 150) {
          x_dist = (700) - this.position.x
          y_dist = (70) - this.position.y
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
    <div id="playground">
        <div 
        class="pet"
        :style="{ top: position.y + 'px', left: position.x + 'px' }" 
        @click="moveTo($event)"
        tabindex="0">
          <img src="..\assets\cat-9161.png" class="cat">
        </div>
    </div>
</template>

<style>
    body {
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
      height: 70px;
    }
    #playground {
        height: 500px;
        width: 500px;
        outline: 0px solid black;
        position: relative;
    }
    .pet {
        height: 150px;
        width: 150px;
        position: absolute;
        top: 78px;
        left: 2px;
    }
</style>