<template>
    <div>
    <Navbar />
    </div>
</template>

<script>
import AppMain from './App-main.vue'
import Navbar from './Navbar.vue'

export default {
name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
}
</script>