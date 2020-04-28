var path = require('path');
module.exports = {
     watch: true ,
     entry:  { index: './servics_library/service_funcs.js' } ,
     output: {
          path: path.resolve(__dirname, 'dist'),
          filename: './service_build/[name].js'
     }
};
