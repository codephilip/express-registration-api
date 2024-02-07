const middleware1 = function(req, res, next) {

  console.log('middleware1. :]');
  next();

}
module.exports = { middleware1 };
