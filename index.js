// Imports
const express = require('express')
const path = require("path");
  

const app = express()
const port = process.env.PORT || 3000;
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

  

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(express.urlencoded({ extended: true }));


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

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', { text: 'This is EJS'})
})

app.get('/terms-conditionsy', (req, res) => {
  res.render('terms-conditions', { text: 'This is EJS'})
})

// POST method route
app.post('/sentemail', (req, res) => {
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.name);
  SendTestEmail(req.body.name,req.body.email,req.body.message,req.body.subject);
  res.send('success')
})
function SendTestEmail(username, address, message, subject) {
  console.log("API called successfully. Returned data: ");
  
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail = {
    sender: { email: address, name:username},
    to: [
      {
        email: "contact@cliqright.com" ,
        name: "CliqRight support team" ,
      },
    ],
    subject: subject,
    textContent: "cusomer name:".bold()+ username +"\r\n Query:".bold()+ message,
  };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error(error);
    }
  );
}
//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))
