// Imports
const express = require('express')

const app = express()
const port = process.env.PORT || 3000;



// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './public')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('', (req, res) => {
    res.render('index', { text: 'This is EJS'})
})

app.get('/about', (req, res) => {
  res.render('index', { text: 'This is EJS'})
})

app.get('/verification', (req, res) => {
  res.render('verification', { text: 'This is EJS'})
})
app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'xxx@xx.com',
          pass: 'xxxx'
      }
  });
  let mailOptions = {
      from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body, // plain text body
      html: '<b>NodeJS Email Tutorial</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          res.render('index');
      });
  });

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))
