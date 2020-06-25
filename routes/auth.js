const express = require('express')
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user')
const jwt = require('jsonwebtoken')


module.exports = (app) => {

    app.get('/login', guestAccess,getUserStatus, (req, res) => {
        res.render('loginPage', {
            isLoggedIn: req.isLoggedIn
        })
    })

    app.get('/signup', guestAccess, getUserStatus, (req, res) => {
        res.render('registerPage', {
            isLoggedIn: req.isLoggedIn
        })
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