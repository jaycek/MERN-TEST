import express from 'express'
import { addEmployees,filterByAge,countEmployeesByAge,
    countEmployeesByAgeGreaterThan,countByCategory,
    getEmployeesSortedByName,
    getFullDetails} from '../Controllers/employeeController.js'

const employeeRouter = express.Router()

 
employeeRouter.post('/addEmployees', addEmployees)

employeeRouter.get('/filterbyAge/:age',filterByAge)

employeeRouter.get('/countByAge',countEmployeesByAge)

employeeRouter.get('/countByAgeGreaterThan/:age',countEmployeesByAgeGreaterThan)

employeeRouter.get('/countByCategory',countByCategory)
employeeRouter.get('/getEmployeesSortedByName',getEmployeesSortedByName)
employeeRouter.get('/getFullDetails',getFullDetails)

// employeeRouter.patch('/:id',updateUserbyID)
  
// employeeRouter.put('/:userId', updateUser,sendMail)
  
// employeeRouter.delete('/:id',deleteUser )

export default employeeRouter;