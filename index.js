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

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))
