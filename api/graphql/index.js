const { typeDefs, resolvers } = require('./schema');

exports.schema = {};

exports.context = async ({request}) => {
  let user;

  if (request.headers.authorization) {
    const token = Array.isArray(request.headers.authorization)
      ? request.headers.authorization[0].split(' ')[1]
      : request.headers.authorization.split(' ')[1];

    if (token !== '') {
      let result = await driver.session().run(`
      MATCH (u:User { token: $token })
      RETURN u
      `, {token});
      
      if (result.records[0]) {
        const { u } = result.records[0].toObject();
        user = u;
      }
    } else { 
      user = undefined
    }

  }
  
  return {
    driver,
    req: request,
    user
  };
};