import Employee from "../Models/employeeModel.js";

const getEmployeesSortedByName = async(req,res)=>{
    try {
        const records = await Employee.aggregate([
            { $sort: { name: -1 } },
            {$limit:3},
            {
                $project:
                {
                    _id:0,
                    EmployeeName:"$name",
                    rank:1

                }
            }
        ])
        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })

    }
}

const addEmployees = async (req,res)=>{

    try {
        await Employee.create([
            { name: 'Jean-Luc Picard', age: 59, rank: 'Captain' },
            { name: 'William Riker', age: 29, rank: 'Commander' },
            { name: 'Deanna Troi', age: 28, rank: 'Lieutenant Commander' },
            { name: 'Geordi La Forge', age: 29, rank: 'Lieutenant' },
            { name: 'Worf', age: 24, rank: 'Lieutenant' }
          ]);
        res.status(201).send("Employees added");
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })

    }
      
}


const filterByAge = async (req,res) =>{
    try {
        const age = Number(req.params.age);
        const records = await Employee.find({ age: { $gte: age } })
        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })

    }

}

const countEmployeesByAge = async(req,res)=>{
    try {
        const records = await Employee.aggregate([
            {$group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            // _id: null ,
            _id: '$age',
            count: { $sum: 1 }
          }
        }
     ])
        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


const countEmployeesByAgeGreaterThan = async(req,res)=>{
    try {
        const age = Number(req.params.age);
        console.log(age)
        const records = await Employee.aggregate([
            
            { 
                $match: { age: { $gte: age } }
            },
            {
                $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            // _id: null ,
            _id: '$age',
            count: { $sum: 1 }
          }
        }
     ])
        res.status(200).json(records)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const countByCategory = async(req,res)=>{
    try {
        const sum =await Employee.aggregate([
            { $group:
                 { _id: "$rank",
                    count: { $sum: 1 }
                 } }
        ])
        res.status(200).send(sum)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getFullDetails = async(req,res)=>{
    try {
        const records= await Employee.aggregate([
            {
              $lookup: {
                from: "users",
                localField: "name",
                foreignField: "name",
                as: "personDetails"
              }
            }
          ]); 
        res.status(200).json(records)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
export {addEmployees,filterByAge,countEmployeesByAge,
        countEmployeesByAgeGreaterThan,countByCategory,
        getEmployeesSortedByName,getFullDetails}