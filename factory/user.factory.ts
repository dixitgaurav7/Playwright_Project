import{faker} from '@faker-js/faker';
export const createUser =() => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        day:faker.number.int({ min: 1, max: 31 }),
        month:faker.number.int({ min: 1, max: 12 }),
        year:faker.number.int({ min: 1900, max: 2026 }).toString(),
        fullName: faker.person.fullName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        mobile: '9' + faker.phone.number(),
    }
}