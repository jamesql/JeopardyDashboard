const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const settings = require('./settings.json');

const app = express();
const http = require('http');
const server = http.createServer(app);

// view engine setup
app.set('trust proxy', true)
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.set('view options', {pretty: true})
.locals.pretty = app.get('env') === 'development';

app.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))
.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})
.use(cookieSession({
  secret: settings.secret,
  maxAge: 1000 * 60 * 60 * 24 * 7
}))
.use(cookieParser(settings.secret))
.use(passport.initialize())
.use(passport.session());

app.use('/', require('./routes/index'))
.use('/profile', require('./routes/profile'))
.use('/auth', require('./routes/auth'))
.use('/lb', require('./routes/lb'))
.use('/players', require('./routes/players'))


server.listen(process.env.PORT || 80);


