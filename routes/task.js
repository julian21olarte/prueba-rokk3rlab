var express = require('express');
var router = express.Router();
var taskSchema = require('../models/task');





//GET all tasks.
router.get('/', (req, res, next) => {
  taskSchema.find({})
  .then( tasks => {
    res.status(200).send( {tasks} );
  });
});







/* POST create new task. */
router.post('/create', (req, res, next) => {
  let name = req.body.name;
  let dueDate = req.body.dueDate;
  let priority = req.body.priority;

  let task = {
    name: name,
    dueDate: dueDate,
    priority: priority
  }

  let newTask = new taskSchema( task );
  newTask.save( (err, taskStored) => {
    if(err) {
      res.status(500).send({ errors: err.errors});
    }
    else {
      if( taskStored ) {
        res.status(200).send({task: taskStored});
      }
    }
  });
});










//GET delete a task.
router.get('/destroy/:id', (req, res, next) => {
  let taskId = req.params.id;
  if( !taskId ) {
    res.status(400).send({
        validationErrors: "No id provided."
    });
  }
  else {
    taskSchema.findById( taskId )
    .then( task => {
      if( task.length ) {
        taskSchema.findByIdAndRemove(taskId)
        .then(taskDeleted => {
          if(taskDeleted) {
            res.status(200).send({taskDeleted});
          }
        });
      }
    })
    .catch( err => {
        res.status(404).send({
          validationErrors: "Id is invalid."
      });
    });
  }
});








/* POST update a exist task. */
router.post('/update', (req, res, next) => {
  let task = req.body.task;

  taskSchema.findOneAndUpdate(task._id, {'$set': task}, {new: true}, (err, taskUpdated) => {
    if(err) {
      res.status(500).send({errors: err.errors});
    }
    else {
      if(taskUpdated) {
        res.status(200).send({taskUpdated});
      }
    }
  });
});

module.exports = router;
