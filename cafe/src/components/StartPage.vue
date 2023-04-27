<script>
export default {
  data() {
    return 0
  }
}
</script>

<template>
  <div class="start_page">
    <div class="left-div">
      <div class="title">
        <h1>Welcome to V-Pet Cafe!</h1>
      </div>
      <div class="instructions">
          <p>Here's how to play:</p>
          <p>•Use your mouse to navigate your feline friend to wherever you desire.</p>
          <p>•Activate your kitty's abilities by clicking on the various cactivity labels.</p>
          <p>•Prepare for endless enjoyment and excitement!</p>
          <p>•Get ready to embark on an epic journey with your furry companion!</p>
      </div>
    </div>
    <div class="right-div">
      <div class="profile-bar">
        <div class="profile-card">
          <div class="profile-picture"></div>
          <div class="profile-name"></div>
        </div>
      </div>
      <div class="right-div-window">
        <div class="cat-card"></div>
        <div class="activity-links">
          <router-link to="/main" class="button">Playground</router-link> <br>
          <router-link to="/login" class="button">Login</router-link>
          <router-link to="/login" class="button">Logout</router-link>
          <!-- <router-link to="/dbtest" class="button">DbTest</router-link>
                  <router-link to="/spottest" class="button">SpotTest</router-link> -->
          <!-- <p>Directions:</p>
          <p>Click anywhere to move your cat to the desired location.</p>
          <p>Click on the cactivity labels to interact with your cat.</p>
          <p>HAVE FUN!!</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/selfworld');
@import url('https://fonts.cdnfonts.com/css/hontary');
@import url('https://fonts.cdnfonts.com/css/games');
@import url('https://fonts.cdnfonts.com/css/castlery');

.title {
  font-family: 'castlery', sans-serif;
  font-size: 2.8vw;
  text-align: center;
  margin: 25vh 8vw 31vh 8vw;
  color: rgb(255, 255, 255);
  text-shadow: 0 0 3px #55ec5f, 0 0 5px #0000FF;
  user-select: none;
}
.instructions p{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
  font-family: 'Games', sans-serif;
  font-size: 1.2vw;
}

.start_page {
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #D2B48C;
  /* padding-left: 1vw;
    padding-right: 1vw; */
}

.left-div {
  top: 0px;
  left: 0px;
  width: 60%;
  height: 100%;
  background-color: #adb5bd;
  overflow: hidden;
  z-index: 1;
  border-right: 0.3vh solid rgb(88, 78, 78);
  /* box-shadow: 3px 0px 3px 0px #5b5b5b; */
  background-image: linear-gradient(68.4deg, rgba(248, 182, 204, 1) 0.5%, rgba(192, 198, 230, 1) 49%, rgba(225, 246, 240, 1) 99.8%);
}

.right-div {
  width: 40%;
  height: 100%;
  background-color: #d3ff96;
  overflow: hidden;
}

/* .profile-bar {
    width: auto;
    height: 12%;
    border-bottom: 0.1vh solid rgb(154, 154, 154);
    background-color: #adb5bd;
  } */
.profile-card {
  position: absolute;
  top: 1.5vh;
  right: 1.5vw;
  width: 12vw;
  height: 9vh;
  background-color: #d3ff96;
  border-radius: 2vh;
  border: 0.3vh solid rgb(154, 154, 154);
  box-shadow: 1px 1px 1px -1px #313131;
}

.right-div-window {
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0px;
  bottom: 0px;
  width: auto;
  height: 100%;
  background-color: #ffffff;
  margin: 0;
  /* background-image: radial-gradient(circle farthest-corner at 1.3% 2.8%, rgba(239, 249, 249, 1) 0%, rgba(182, 199, 226, 1) 100.2%); */
  /* background-image: linear-gradient( 68.4deg,  rgba(248,182,204,1) 0.5%, rgba(192,198,230,1) 49%, rgba(225,246,240,1) 99.8% ); */
}

.activity-links {
  width: 50%;
  padding: 4vh 2vw 4vh 2vw;
  border: 0.3vh solid rgb(168, 168, 168);
  background-color: rgb(255, 255, 255);
  border-radius: 1.5vh;
  font-size: 3vh;
  box-shadow: 2px 1px 1px -1px #313131;
  font-family: 'Games', sans-serif;
}

.button {
  background-color: green;
  color: white;
  padding: 1.2vh 1.8vw;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 2vh;
  margin: 1vh 0.2vw;
  cursor: pointer;
  border-radius: 1.5vh;
  border: 0.1vh solid rgb(154, 154, 154);
}</style>

