<template>
  <div>
    <h3>Measurements</h3>
    <div v-for='measurement in measurements'>
      <pre>{{measurement}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.createConnection();
  },
  data () {
    return {
      socket: null,
      measurements: [],
    }
  },
  methods: {
    createConnection () {
      this.socket = new WebSocket(process.env.API_URL);
      this.socket.onclose = () => {
        this.createConnection();
      };
      this.socket.onmessage = this.onMessage;
    },
    onMessage (msg) {
      this.measurements.unshift(JSON.parse(msg.data));
    },
  }
}
</script>

<style scoped>
</style>