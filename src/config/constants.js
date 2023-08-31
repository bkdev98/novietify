// const devConfig = {
//   MONGO_URL: 'mongodb://localhost:27017/novietify-dev',
//   EMAIL_USER: '',
//   EMAIL_PASS: '',
//   HOSTNAME: 'http://localhost:7112',
// };

// const testConfig = {
//   MONGO_URL: 'mongodb://localhost:27017/novietify-test',
//   EMAIL_USER: '',
//   EMAIL_PASS: '',
//   HOSTNAME: 'http://localhost:7112',
// };

const prodConfig = {
  MONGO_URL: process.env.MONGODB_URI,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  HOSTNAME: process.env.HOSTNAME || 'https://novietify.qckhnh.com',
};

const defaultConfig = {
  PORT: process.env.PORT || 7112,
};

function envConfig(env) {
  switch (env) {
    // case 'dev':
    //   return devConfig;
    // case 'test':
    //   return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
