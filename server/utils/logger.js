const fs = require('fs');
const path = require('path');

const logEvents = (message, logFileName) => {
  const dateTime = new Date().toISOString();
  const logItem = `${dateTime}\t${message}\n`;
  
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      fs.mkdirSync(path.join(__dirname, '..', 'logs'));
    }
    fs.appendFileSync(path.join(__dirname, '..', 'logs', logFileName), logItem);
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };