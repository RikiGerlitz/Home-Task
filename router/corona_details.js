const express=require('express');
const router=express.Router();
const contollerCorona=require('../controller/corona_details')
router.get("/",contollerCorona.Get);
router.get("/:idNumber",contollerCorona.GetCoronaDetailsById);
router.post("/:idNumber",contollerCorona.AddCoronaDetailsById);



module.exports=router;





