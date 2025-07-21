import jwt from 'jsonwebtoken';

const user = {
    id: 123,
    username: 'john'
};
const secret = '';
const token = jwt.sign(user, secret, {expiresIn: '1h'});

res.json({token});
