const Employee = require('../models/Employee')
const User = require('../models/User')

exports.resolvers = {
    Query: {
        getAllEmployees: async (parent, args) => {
            return await Employee.find({})
        },
        login: async(parent, args) => {
            console.log(`Searching for employee with username : ${args.username}`)
            const user = await User.findOne({username: args.username});
            if (!user) return false;

            return await user.comparePassword(args.password);

        },
        getEmployeeByID: async (parent, args) => {
            console.log(`Searching for employee with id : ${args._id}`)
            const emp = await Employee.findById(args._id);
            console.log(`Matching employee with id : ${JSON.stringify(emp)}`)
            return emp
        },
        getEmployeeByDepOrDes: async (parent, args) => {
            console.log(`Searching for employee with department or designation of ${args.depOrDes}`)
            return await Employee.find({$or: [{department: args.depOrDes}, {designation: args.depOrDes}]})
        }
    },
    Mutation: {
        signUp: async(parent, args) => {

            let user = new User({
                username: args.username,
                email: args.email,
                password: args.password,
            })

            return await user.save()
        },
        addEmployee: async (parent, args) => {
            console.log(`Trying to insert employee with email: ${args.email}`)

                let employee = new Employee({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender.toLowerCase(),
                    designation: args.designation,
                    salary: args.salary,
                    date_of_joining: args.date_of_joining,
                    department: args.department,
                    employee_photo: args.employee_photo,
                    updatedAt: Date.now()
                })
            return await employee.save()
        },
        updateEmployee: async (parent, args) => {
            if (!args._id) {
                console.log(`ID is not provided`)
                return JSON.stringify({status: false, message: "Please provide Employee ID to update"})
            }
            return Employee.findOneAndUpdate(
                { _id: args._id },
                { $set: {
                        firstname: args.firstname,
                        lastname: args.lastname,
                        gender: args.gender.toLowerCase(),
                        designation: args.designation,
                        salary: args.salary,
                        date_of_joining: args.date_of_joining,
                        department: args.department,
                        employee_photo: args.employee_photo,
                        updatedAt: Date.now()
                } }
            ).then( (employee) => {
                if (!employee) {
                    console.log(`Could not update employee`)
                    return JSON.stringify({status: false, message: "Could not update employee"})
                }
                else {
                    console.log(`Employee updated successfully: ${JSON.stringify(employee)}`)
                    return employee;
                }
            })
        },
        deleteEmployee: async (parent, args) => {
            if (!args._id) {
                console.log(`ID is not provided`)
                return JSON.stringify({status: false, message: "Please provide Employee ID to update"})
            }
            return await Employee.findByIdAndDelete(args._id);
        },
    }
}