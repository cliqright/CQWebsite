// Imports
const express = require('express')
import sgMail from "@sendgrid/mail";
var nodemailer = require('nodemailer');
const app = express()
const port = 3000
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Add API key


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
    const msg = {
        to: 'stadiparti@gmail.com',
        from: 'srini.t2480@gmail.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      
      sgMail
        .send(msg)
        .then(() => {
          // mail sent  
        }, error => {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        });
})



//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))