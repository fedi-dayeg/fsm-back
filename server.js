const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDb = require('./config/db');
const bodyParser = require("body-parser");
// Router File
global.config = require('./config/config');

//Load env vars

// connect to MYSQL

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Body Parser
app.use(express.json());

dotenv.config({path: './config/config.env'});


//Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
/*app.use(xss());*/

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 min
    max: 100
});
app.use(limiter);

// Prevent http param pollution
/*app.use(hpp());*/

// Enable CORS
app.use(cors());

app.use('/public',express.static('public'));

// Mount Routers
require("./routes/Actualite")(app);
require("./routes/Manifestation")(app);
require("./routes/MajRoute")(app);
require("./routes/AlbumRoute")(app);
require("./routes/ImageRoute")(app);
require("./routes/EtudiantsRoute")(app);
//app.use(require('./middleware/TokenValidator'));

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
});
