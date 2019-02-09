import jwt from 'jsonwebtoken';

export default opts => (ctx, next) => {
  const { path } = opts;
  let isMatch;

  if (!!path && path.length) {
    isMatch = path.some(path => path.test(ctx.originalUrl));
  }

  if (isMatch) {
    if (!ctx.header || !ctx.header.authorization) {
      ctx.throw(401, 'Token not found');
    }

    let token;
    const parts = ctx.header.authorization.split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        ctx.header.authorization = token = credentials;
      }
    }

    if (!token) {
      ctx.throw(401, 'Token not found');
    }

    const { key } = opts;

    try {
      const decoded = jwt.verify(token, key);
      if (decoded.exp <= Date.now() / 1000) {
        ctx.throw(401, 'Unavailable token');
      }
    } catch (err) {
      ctx.throw(401, 'Invalid token');
    }
  }
  return next();
};
