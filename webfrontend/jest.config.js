// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/webfrontend/src/tests/**/*.(test|spec).ts'], // Adjust the path pattern as needed
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
