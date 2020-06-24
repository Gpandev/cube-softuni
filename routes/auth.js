const express = require('express')

const router = new express.Router()

module.exports = (app) => {

    app.get('/login', (req, res) => {
        res.render('loginPage')
    })

    app.get('/signup', (req, res) => {
        res.render('registerPage')
    })
}