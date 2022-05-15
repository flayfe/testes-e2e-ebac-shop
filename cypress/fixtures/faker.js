
const { faker } = require('@faker-js/faker');

const dadosCadastro = {
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    company : faker.company.companyName(),
    country : "Brasil"/*faker.address.country()*/,
    address : faker.address.streetAddress(),
    number : faker.random.numeric(),
    city : faker.address.city(),
    state : "Distrito Federal"/*faker.address.state()*/,
    postcode : "72145819"/*faker.address.postcode("#######")*/,
    phonenumber : "(61) 981756644"/*faker.phone.phoneNumber("(61) #### ####")*/,
    email : faker.internet.email(),
    comments : faker.lorem.words()
}

export default dadosCadastro
