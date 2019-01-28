const express = require('express');
const router = express.Router();
const Project = require('../models/project.js');

//index route

router.get('/', async (req, res) => {
  try {
    res.render('project/project.ejs');

  } catch (err) {
    console.log(err);
    next(err);
  
  }
})


//new route

router.get('/new', async (req, res) => {
  try {
    res.render('project/new.ejs');
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//new-post route

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    console.log(newProject, ' this is newProject in post route');
    res.render('project/new-content.ejs', {
      project: newProject
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

//put routes -- for creating how-to project

router.put('/:id', async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    foundProject.text.push(req.body.text);
    foundProject.media.push(req.body.media);
    foundProject.save();
    res.render('project/new-content.ejs', {
      project: foundProject
    });
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})

router.put('/:id/publish', async (req, res) => {
  try {
    const foundProject = await Project.findById(req.params.id);
    foundProject.publish = req.body.publish;
    foundProject.save();
    res.redirect('/project');
        
  } catch (err) {
    console.log(err);
    next(err);
  
  }
})











module.exports = router;