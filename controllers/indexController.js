const mongoose = require("mongoose");
const Vote = require("../models/vote");
const User = require("../models/user");
const UserVote = require("../models/user_vote");
const validator = require('validator');
var ObjectId = mongoose.Types.ObjectId;

var controller = {}


controller.dashboard = async (req, res) => {
    const votes = await Vote.find({}).populate({path: "createdBy", select: 'login'})
    res.render('./dashboard.ejs', {
      title: "Dashboard",
      votes: votes,
      type: 'all'
    })
}

controller.showmine = async (req, res) => {
    const votes = await Vote.find({createdBy: req.session.user._id}).populate({path: "createdBy", select: 'login'})
    res.render('./dashboard.ejs', {
      title: "Mes sujets",
      votes: votes,
      type: 'showmine'
    })
}

controller.part = async (req, res) => {
    const votes = await Vote.find({}).populate({path: "createdBy", select: 'login'})
    console.log(req.session.user._id)
    const mesvotes = await UserVote.find({user: req.session.user._id}).populate('vote')
    res.render('./dashboard.ejs', {
      title: "Mes participations",
      votes: votes,
      mesvotes: mesvotes,
      type: 'part'
    })
}

controller.showend = async (req, res) => {
    const votes = await Vote.find({status: 'finished'}).populate({path: "createdBy", select: 'login'})
    res.render('./dashboard.ejs', {
      title: "Votes terminés",
      votes: votes,
      type: 'showend'
    })
}

controller.progress = async (req, res) => {
    const votes = await Vote.find({status: 'inprogress'}).populate({path: "createdBy", select: 'login'})
    res.render('./dashboard.ejs', {
      title: "Votes en cours",
      votes: votes,
      type: 'progress'
    })
}

controller.index = async (req, res) => {
    res.render('./index.ejs', {
      title: "Accueil"
    })
}

controller.inscription = async (req, res) => {
    res.render('./inscription.ejs', {
      title: "Inscription"
    })
}

controller.login = async (req, res) => {
    const {
      email,
      password
    } = req.body
    if (!email || !password) {
        console.log('1')
      req.session.msgFlash = {
        type: "danger",
        message: "Donnée manquante"
      }
      res.redirect('/login')
    } else {
      try {
        const user = await User.findOne({
          email: email
        })
        console.log('2')
        if (!user || (user.email !== email || user.password !== password)) {
          req.session.msgFlash = {
            type: "danger",
            message: "Identifiants invalide"
          }
          res.redirect('/')
        } else {
            console.log(password)
            console.log(user.password)
            console.log('3')
          req.session.user = user // use session for user connected
          console.log(req.session)
          req.session.msgFlash = {
            type: "success",
            message: "Bienvenu " + user.login
          }
          res.redirect('/dashboard')
        }
      } catch (error) {
        console.log('4')
        req.session.msgFlash = {
          type: "error",
          message: "Identifiants invalide"
        }
        res.redirect('/', )
      }
    }
  }
  
  
  /**
   * Déconnecte l'utilisateur
   * @name logout
   * @memberof module:controllers/index
   * @function
   * @returns {VIEW}
   */
  controller.logout = async (req, res) => {
    req.session = null
    res.redirect('/')
  }
  
 
  
module.exports = controller;