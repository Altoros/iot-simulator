<template>
  <form>
    <label>Measurement A: <input name='a'></label>
    <button v-on:click='save'>Submit</button>
  </form>
</template>

<script>
export default {
  created () {
    this.createConnection();
  },
  data () {
    return {
      socket: null,
      measurement: null,
    }
  },
  methods: {
    createConnection () {
      this.socket = new WebSocket(process.env.API_URL);
      this.socket.onclose = () => {
        this.createConnection();
      };
    },
    save (e) {
      this.measurement = {};
      for (let input of this.$el.querySelectorAll('input')) {
        this.measurement[input.name] = input.value;
      }
      try {
        this.socket.send(JSON.stringify(this.measurement));
      } catch (e) {
        alert('Failed to save');
      } finally {
        this.$el.reset();
      }
    }
  }
}
</script>

<style scoped>
</style>