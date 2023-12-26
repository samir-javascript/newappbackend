import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'Admin user',
        email: 'soufiane123@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'samira lbyad',
        email: 'samira123@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'mouad hmamou',
        email: 'mouad123@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default user;