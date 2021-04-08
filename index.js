
let express = require('express')
let app = express()

const cors = require('cors')


const db = require("./app/models");
db.sequelize.sync();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: '*'
}))

app.get('/',(req,res)=> res.send('yay'))

app.listen(process.env.PORT || 3001, () => {
    console.log('started on port : ', process.env.PORT || 3001)
})

module.exports = app