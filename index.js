const
    express = require('express'),
    body_parser = require('body-parser'),
    app = express()
app.use(express.static('public'))  
app.set('view engine', 'pug')
app.use(body_parser.urlencoded({extended: false}))  
app.use(body_parser.json())

app.get('/', (req, res) => res.render('index'))

app.post('/ajax', (req, res) =>
    res.json({
        message: `the param is ${req.body.param}`
    }))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
