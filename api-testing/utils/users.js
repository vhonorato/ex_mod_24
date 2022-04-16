const { faker } = require('@faker-js/faker');

 class Users{
    static username = "admin";
    static password = "admin";
    static firstName = faker.name.firstName();
    static lastName = faker.name.lastName();
    static email = faker.internet.email();
    static phone = faker.phone.phoneNumber("+#############");
}



module.exports = Users;

