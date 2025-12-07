const hostname = window.location.hostname;

const CONFIG_MAP = {
  "localhost": {
    AUTH_URL: "http://localhost:3003/auth",
    ADDRESS_URL: "http://localhost:3003",
    RESTAURANT_URL: "http://localhost:3004",
    MEDIA_URL: "http://localhost:3002",
    ORDER_URL: "http://localhost:3005"
  },

  "blinkfeast.com": {
    API_URL: "https://api.blinkfeast.com",
    PAYMENT_URL: "https://payments.blinkfeast.com",
    DELIVERY_URL: "https://delivery.blinkfeast.com",
    TRACKING_URL: "https://tracking.blinkfeast.com",
  },
};

const appConfig = CONFIG_MAP[hostname] || CONFIG_MAP["blinkfeast.com"];

export default appConfig;
