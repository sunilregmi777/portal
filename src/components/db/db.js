const Users = [
    {
        'email': 'pudo@nepal.com',
        'password': 'password'
    },
    {
        'email': 'pudo@nepal.com',
        'password': 'password'
    }
]

const getUsers = () => {
    return Users;
}

const saveUser = (user) => {
    return [Users];
}

export default {
    getUsers: getUsers
};