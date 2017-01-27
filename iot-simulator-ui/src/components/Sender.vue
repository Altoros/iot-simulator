<template>
  <form v-on:submit.prevent='save'>
    <input name='a' v-model='measurement' type='number'></label>
    <button type='submit'>Submit Measurement</button>
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
      measurement: 0,
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
      try {
        this.socket.send(JSON.stringify({ a: this.measurement }));
      } catch (e) {
        alert('Failed to save');
      }
    }
  }
}
</script>

<style scoped>
form {
  display: inline-block;
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  border: 1px solid rgba(117, 24, 160, 0.2);
}

input {
  display: block;
  font-size: 25px;
  margin: 10px 0;
  width: 150px;
}
</style>
