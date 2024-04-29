import mongoose from 'mongoose'

// async function main() {
//   await mongoose.connect('mongodb+srv://user1:NWdH60okKMkYY5zx@cluster0.fsqnz3x.mongodb.net/FSDCrashCourse');

  
// }

// main().then(console.log("Connected to DB")).catch(err => console.log(err));

const employeeSchema = new mongoose.Schema({
    name: String,
    age:Number,
    rank:String,
});

// Define indexes on the schema
// employeeSchema.index({ name: 1 }); // Create a single-field index on the 'name' field
// employeeSchema.index({ age: 1, rank: 1 }); // Create a compound index on the 'age' and 'city' fields


const Employee = mongoose.model('employees', employeeSchema);
// Access the collection object and create an index
// Employee.collection.createIndex({ name: 1 }, { unique: true });
// Employee.collection.dropIndex('name', function(err, result) {
//     if (err) {
//       console.error('Error dropping index:', err);
//     } else {
//       console.log('Index dropped successfully:', result);
//     }
//   });

export default Employee;