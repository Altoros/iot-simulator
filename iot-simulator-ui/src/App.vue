<template>
  <div id='app'>
    <Sender/>
    <Measurements/>
  </div>
</template>

<script>
import Sender from './components/Sender'
import Measurements from './components/Measurements'

export default {
  name: 'app',
  components: { Sender, Measurements }
}
</script>

<style>
  body {
    background-color: rgba(100, 100, 100, 0.2)
  }
</style>
