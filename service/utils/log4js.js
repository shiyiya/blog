import log4js from 'koa-log4';
import path from 'path';

log4js.configure({
  appenders: {
    error: {
      type: 'file',
      category: 'errLogger',
      filename: path.join(__dirname, '../logs/error.log'),
      maxLogSize: 104800,
      backups: 7,
    },
    response: {
      type: 'dateFile',
      category: 'resLogger',
      filename: path.join(__dirname, '../logs/access_log/'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      maxLogSize: 104800,
      backups: 7,
    },
  },
  categories: {
    error: { appenders: ['error'], level: 'error' },
    response: { appenders: ['response'], level: 'info' },
    default: { appenders: ['response'], level: 'info' },
  },
  replaceConsole: true,
});

function formatLog(ctx, err) {
  const {
    ip,
    method,
    url,
    request: { body },
    header,
  } = ctx;
  if (err) return { ip, method, url, header, body, err };
  return { ip, method, url, body, userAgent: header['user-agent'] };
}

export default function logger() {
  return async (ctx, next) => {
    try {
      await next();
      log4js.getLogger('response').info(formatLog(ctx));
    } catch (err) {
      console.log(err);
      log4js.getLogger('error').error(formatLog(ctx, err));
    }
  };
}
