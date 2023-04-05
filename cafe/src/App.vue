// Create a function to add numbers from 1 to 10
<script>
	import Start from './components/StartPage.vue'
	import Playground from './components/PlayGround.vue'

	const routes = {
		'/': Start,
		'/main': Playground
	}

  export default {
    data() {
      return {
        currentPath: window.location.hash
      }
    },
    computed: {
      currentView() {
        return routes[this.currentPath.slice(1) || '/']
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
        this.currentPath = window.location.hash
      })
    }
  }
</script>

<template>
  <component :is="currentView" />
</template>

<!-- 
<style scoped>
  header {
    line-height: 1.5;
  }
</style> -->
