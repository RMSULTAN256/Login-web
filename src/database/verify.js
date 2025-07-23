import jwt from 'jsonwebtoken';

const secret = 'mystrong256';

export function verifyToken(req, res, next) {
    const verifyHeader = req.headers['authorization']
    if (!verifyHeader) {
        return res.status(401).json({ message: 'access denied'});
    };

    const token = verifyHeader.split(' ')[1];

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'token invalid or expired'});
        }

        req.user = user
        next();
    })
}