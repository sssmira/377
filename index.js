/* User Login Page */

const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://gocprlrznkxsdtxyhksm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY3BybHJ6bmt4c2R0eHloa3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTEzOTksImV4cCI6MjAzMDQyNzM5OX0.VXq0ndDW9Y91IoQQeJqRC5-xhsqptP6hW50qvxZfX-g'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/UserLogin', async (req, res) => {
    console.log('Attempting to get all users')
    const { data, error } = await supabase
        .from('UserLogin')
        .select()

    if (error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }

    console.log('Date: ', data)
    console.log('Error: ', error)
})

app.post('/UserLogin', async (req, res) => {
    console.log('Adding Customer')
    var userName = req.body.userName;
    var userPass = req.body.userPass;

    const {data, error } = await supabase
        .from('UserLogin')
        .insert({ 'userName': userName, 'userPass': userPass })
        .select()

    if (error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }

})

app.listen(port, () => {
    console.log('APP IS LIVE')
})