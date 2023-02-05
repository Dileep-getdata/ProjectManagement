const express=require('express');
const router=express.Router();
const taskController=require('../controllers/tasks');
const authMiddleware=require('../middleware/auth');



router.post('/addtask',authMiddleware.authentication,taskController.postTaskDetails);

router.get('/getTask',authMiddleware.authentication,taskController.getTaskList);

router.get('/sortA_Z',authMiddleware.authentication,taskController.sortingA_Z);

router.get('/search',authMiddleware.authentication,taskController.searching);

router.post('/editTask',authMiddleware.authentication,taskController.editTaskStatus);


module.exports=router;