const express = require('express')
const { saveUser } = require('../controllers/user')

module.exports = (app) => {

    app.get('/login', (req, res) => {
        res.render('loginPage')
    })

    app.get('/signup', (req, res) => {
        res.render('registerPage')
    })

    app.post('/singup', async (req, res) => {
        const status = await saveUser(req, res)

        if (status) {
          return res.redirect('/')
        }

        res.redirect('/')
    })
}