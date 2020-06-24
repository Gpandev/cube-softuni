const express = require('express')
const { saveUser, verifyUser } = require('../controllers/user')
const jwt = require('jsonwebtoken')

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

    app.post('/login', async (req, res) => {
        const status = await verifyUser(req, res)

        if (status) {
          return res.redirect('/')
        }

        res.redirect('/')
    })
}