const express=require('express');
const router=express.Router();
const controllerDetails=require('../controller/personal_details')
router.get("/",controllerDetails.Get);
router.get("/:idNumber",controllerDetails.GetPersonById);
router.get("/personFullDetails/:idNumber",controllerDetails.GetPersonAndCoronaById);
router.post("/",controllerDetails.AddPerson);


module.exports=router;