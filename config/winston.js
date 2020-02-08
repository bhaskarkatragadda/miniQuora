const appRoot = require('app-root-path');
const winston = require('winston');
const dateformat = require("dateformat");
const chalk = require("chalk");
// define the custom settings for each transport (file, console)
let options = {
    file: {
        level: 'debug',
        filename: `${appRoot}/log/app.log`,
        handleExceptions: true,
        // json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 25,
        timestamp: function () {
            return dateformat(Date.now(), "yyyy-mm-dd HH:MM:ss.l");
        },
        formatter: function (options) {
            let message = "";

            if (options.message !== undefined) {
                message = options.message;
            }

            let meta = "";

            if (options.meta && Object.keys(options.meta).length) {
                meta = "\n\t" + JSON.stringify(options.meta);
            }

            let level = options.level.toUpperCase();

            switch (level) {
                case "INFO":
                    level = chalk.cyan(level);
                    break;

                case "WARN":
                    level = chalk.yellow(level);
                    break;

                case "ERROR":
                    level = chalk.red(level);
                    break;

                default:
                    break;
            }

            let output = [
                "[" + options.timestamp() + "][" + level + "]",
                message,
                meta
            ];

            return output.join(" ");
        }
    },
    console: {
        timestamp: function () {
            return dateformat(Date.now(), "yyyy-mm-dd HH:MM:ss.l");
        },
        formatter: function (options) {
            let message = "";

            if (options.message !== undefined) {
                message = options.message;
            }

            let meta = "";

            if (options.meta && Object.keys(options.meta).length) {
                meta = "\n\t" + JSON.stringify(options.meta);
            }

            let level = options.level.toUpperCase();

            switch (level) {
                case "INFO":
                    level = chalk.cyan(level);
                    break;

                case "WARN":
                    level = chalk.yellow(level);
                    break;

                case "ERROR":
                    level = chalk.red(level);
                    break;

                default:
                    break;
            }

            let output = [
                "[" + options.timestamp() + "][" + level + "]",
                message,
                meta
            ];

            return output.join(" ");
        }
    },
};

// instantiate a new Winston Logger with the settings defined above
let logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;
