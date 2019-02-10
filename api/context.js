
const models = require('./models');


module.exports = async ({request}) => {
  let user;

  try {

    if (request.headers.authorization) {
      const token = Array.isArray(request.headers.authorization)
        ? request.headers.authorization[0].split(' ')[1]
        : request.headers.authorization.split(' ')[1];

      if (token !== '') {
        user = await models.User.findOne({token}).exec();
      }
    }
    
    return {
      models,
      req: request,
      user
    };

  } catch (err) {
    console.error(err);
  }
};