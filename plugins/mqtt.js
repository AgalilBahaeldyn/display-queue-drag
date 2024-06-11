import { createPahoMqttPlugin } from 'vue-paho-mqtt';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createPahoMqttPlugin({
      PluginOptions: {
        autoConnect: true,
        showNotifications: false,
      },
      MqttOptions: {
        host: '27.254.144.161', // Change to your MQTT broker IP
        port: 8083,
        clientId: `RX_${Math.random() * 9999}`,
        enableMainTopic: false,
        username: 'server_mix_station',
        password: 'mix@stati0n!$',
        useSSL: false,
        watchdogTimeout: 1000,  // 1 second
        reconnectTimeout: 1000, // 1 second
      },
    })
  );
});
