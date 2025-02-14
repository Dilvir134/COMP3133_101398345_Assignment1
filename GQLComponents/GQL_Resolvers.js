const emailRegex = /^\S+@\S+\.\S+$/
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
            if (user) {
                user.comparePassword(args.password, function(err, isMatch) {
                    if (err) throw err;
                    return isMatch;
                });
            } else {
                return JSON.stringify({message: `User with username: ${args.username} does not exist`});
            }

        },
        getEmployeeByID: async (parent, args) => {
            console.log(`Searching for employee with id : ${args.id}`)
            const emp = await Employee.findById(args.id);
            console.log(`Matching employee with id : ${JSON.stringify(emp)}`)
            return emp
        },
        getEmployeeByDepOrDes: async (parent, args) => {
            console.log(`Searching for employee with department or designation of ${args.depOrDes}`)
            return await Employee.find({$or: [{department: args.depOrDes}, {designation: args.depOrDes}]})
        }
    },
    Mutation: {
        addEmployee: async (parent, args) => {
            console.log(`Trying to insert employee with email: ${args.email}`)

            // const isValidEmail = emailRegex.test(args.email)
            // if (isValidEmail) {
                let employee = new Employee({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender.toLowerCase(),
                    city: args.city,
                    designation: args.designation,
                    salary: args.salary
                })
            // } else {
            //     console.log(`Email not in valid format`)
            //     throw new Error(`Email not in valid format`)
            // }
            return await employee.save()
        },
        updateEmployee: async (parent, args) => {
            if (!args.id) {
                console.log(`ID is not provided`)
                return JSON.stringify({status: false, message: "Please provide Employee ID to update"})
            }
            return Employee.findOneAndUpdate(
                { _id: args.id },
                { $set: {
                        firstname: args.firstname,
                        lastname: args.lastname,
                        gender: args.gender.toLowerCase(),
                        city: args.city,
                        designation: args.designation,
                        salary: args.salary
                } },
                {new : false},
                (err, employee) => {
                    if (err) {
                        console.log(`Could not update employee: ${JSON.stringify(err)}`)
                        return JSON.stringify({status: false, message: "Could not update employee"})
                    }
                    else {
                        console.log(`Employee updated successfully: ${JSON.stringify(employee)}`)
                        return employee;
                    }
                }
            )
        },
        deleteEmployee: async (parent, args) => {
            
        },
    }
}