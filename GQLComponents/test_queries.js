/*
// query to get employees with city, firstname, id

query {
    getEmployee {
      city
      firstname
      id
    }
  }

//query to fetch employees using city

query($city: String!) {
  getEmployeeByCity(city: $city) {
    firstname
    email
    city
  }
}

{
  "city": "toronto"
}

//running multiple queries

query($city: String!, $id: ID!) {
  getEmployeeByCity(city: $city) {
    firstname
    email
    city
  }

  getEmployeeByID(id: $id){
    id
    email
  }
}


{
  "city": "toronto",
  "id": "679bcf97f80e99c605c31d19"
}

//mutating to addEmployee()

mutation(
    $firstname: String!, 
    $lastname: String!, 
    $email: String!, 
    $gender: String!, 
    $city: String!, 
    $designation: String!, 
    $salary: Float!) {
  addEmployee(
    firstname: $firstname, 
    lastname: $lastname, 
    email: $email, 
    gender: $gender, 
    city: $city,
    designation: $designation, 
    salary: $salary) {
      id
      firstname
      lastname
      email
      gender
      city
      designation
      salary
    }
  }

{
  "firstname": "Alex", 
  "lastname": "Smith", 
  "email": "alex.smith@gmail.com", 
  "gender": "Male", 
  "city": "Hurontorio",
  "designation": "System Analyst", 
  "salary": 1234.90
}

//mutation for update employee

mutation(
    $idToUpdate: String!,
    $firstname: String!, 
    $lastname: String!,
    $gender: String!, 
    $city: String!, 
    $designation: String!, 
    $salary: Float!) {
  updateEmployee(
    id: $idToUpdate,
    firstname: $firstname, 
    lastname: $lastname, 
    gender: $gender, 
    city: $city,
    designation: $designation, 
    salary: $salary) {
      firstname
      lastname
      gender
      city
      designation
      salary
    }
  }


{
  "idToUpdate": "67ad622843ccd6c7248a3761",
  "firstname": "John", 
  "lastname": "Smith", 
  "gender": "Male", 
  "city": "Brampton",
  "designation": "System Analyst", 
  "salary": 4500.00
}

//mutating to delete employee

mutation ($deleteEmployeeId: ID!) {
  deleteEmployee(id: $deleteEmployeeId) {
    id
    firstname
    lastname
    email
    gender
    city
    designation
    salary
  }
}

{
  "deleteEmployeeId": "679bcf97f80e99c605c31d19"
}


*/