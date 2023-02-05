const express=require('express');
const router=express.Router();
const projectController=require('../controllers/project');
const authMiddleware=require('../middleware/auth')



router.post('/addproject',authMiddleware.authentication,projectController.postProjectDetails);

router.get('/getProjects',authMiddleware.authentication,projectController.getProjectList);

router.get('/sortA_Z',authMiddleware.authentication,projectController.sortingA_Z);

router.get('/search',authMiddleware.authentication,projectController.searching);

router.post('/editProject',authMiddleware.authentication,projectController.editProjectStatus);

router.get('/sortState',authMiddleware.authentication,projectController.statusSort);


module.exports=router;