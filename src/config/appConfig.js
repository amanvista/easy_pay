const hostname = window.location.host;

const CONFIG_MAP = {
  "localhost": {
    AUTH_URL: "http://localhost/api/user/auth",
    ADDRESS_URL: "http://localhost/api/user",
    RESTAURANT_URL: "http://localhost/api/restaurant",
    MEDIA_URL: "http://localhost/api/media",
    ORDER_URL: "http://localhost/api/orders"
  },

  "blinkfeast.com": {
    API_URL: "https://api.blinkfeast.com",
    PAYMENT_URL: "https://payments.blinkfeast.com",
    DELIVERY_URL: "https://delivery.blinkfeast.com",
    TRACKING_URL: "https://tracking.blinkfeast.com",
  },

  "default": {
    AUTH_URL: "http://localhost:3003/auth",
    ADDRESS_URL: "http://localhost:3003",
    RESTAURANT_URL: "http://localhost:3004",
    MEDIA_URL: "http://localhost:3002",
    ORDER_URL: "http://localhost:3005"
  }
};

const appConfig = CONFIG_MAP[hostname] || CONFIG_MAP["default"];

export default appConfig;
