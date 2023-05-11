const db = require('../model');
const details = db.corona_details;
const people=db.people;

async function Get(req, res) { 
    try {
        var all = await details.find({})
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

async function GetCoronaDetailsById(req,res)
{
     const idNumber=req.params.idNumber 
    try
    {
        const person = await people.findOne({ idNumber });
        if (!person) {
            return res.status(404).send('Person not found');
          }
          const coronaDetails = await details.findOne({ idPerson: person.id });
          if (!coronaDetails) {
            return res.status(404).send('Corona details not found');
          }
          return res.send(coronaDetails);
   
        }

    catch(err)
    {
        res.status(500).send(err);
    }

}

async function AddCoronaDetailsById(req, res) {
    let addVaccine = req.body;
    const idNumber = req.params.idNumber;
    try {
      const person = await people.findOne({ idNumber });
  
      if (!person) {
        return res.status(404).send('Person not found');
      } else {
        let coronaDetails = await details.findOne({ idPerson: person.id });
  
        if (!coronaDetails) {
          coronaDetails = await details.create({ idPerson: person.id, ...addVaccine });
          res.status(200).send(coronaDetails);
        } else {
          if (coronaDetails.vaccines.length >= 4) {
            return res.status(400).send('Cannot add more than 4 vaccines');
          }
          if (coronaDetails.vaccines.length + addVaccine.vaccines.length > 4) {
            return res.status(400).send('Cannot add more than 4 vaccines');
          }
          if (addVaccine.positiveResult && coronaDetails.positiveResult) {
            return res.status(400).send('Cannot add positive result again');
          }
          if (addVaccine.recovery && coronaDetails.recovery) {
            return res.status(400).send('Cannot add recovered date again');
          }
          coronaDetails.vaccines.push(
            ...addVaccine.vaccines.map((vaccine) => ({
              ...vaccine,
            }))
          );
          if (addVaccine.positiveResult)  {
            coronaDetails.positiveResult = addVaccine.positiveResult;
          }
          if (addVaccine.recovery) {
            coronaDetails.recovery = addVaccine.recovery;
          }
          coronaDetails.herk = addVaccine.herk;
          await coronaDetails.save();
          res.status(200).json(coronaDetails);
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }



    module.exports = { Get, GetCoronaDetailsById,AddCoronaDetailsById};








