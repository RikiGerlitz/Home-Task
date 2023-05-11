const db = require('../model');
const person = db.people;
const details = db.corona_details;

async function Get(req, res) {
    try {
        var all = await person.find({})
        res.send(all);
    }
    catch (ex) {
        console.log("faild get all");
        console.log(ex);
        res.status(501).send(
            "internal error "
        );
    }
}



async function GetPersonById(req,res)
{
    let id=req.params.idNumber ;
    try
    {
        let data =await person.find({"idNumber":id})
        res.send(data);
    }
    catch(err)
    {
        res.status(500).send(err);
    }

}

async function GetPersonAndCoronaById(req,res)
{
    let id=req.params.idNumber ;
    try
    {
        const personal_details =await person.findOne({"idNumber":id})
        const corona_details = await details.findOne({ idPerson:personal_details.id });
        res.status(200).json({ personal_details,corona_details });
        
    }
    catch(err)
    {
        res.status(500).send(err);
    }

}


async function AddPerson(req, res) {
    let addPerson=req.body;
    let personExist=await person.find({"idNumber":addPerson.idNumber});
    if(personExist.length==0)
    {
        try

        {
            let response=await person.create(addPerson);
            res.status(200).json(response);
        }
        catch(ex)
        {
            res.status(500).send(ex);
        }
    }
    else
    {
        res.status(400).send("The person exists in the system")
       
    }

}


    module.exports = { Get, GetPersonById,AddPerson,GetPersonAndCoronaById};