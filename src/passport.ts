import passport from 'passport'
import passportJWT, {JwtFromRequestFunction} from 'passport-jwt'
import {getUser} from "./db";


const ExtractJWT  = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const CookieExtractor: JwtFromRequestFunction = (req => {
    let token = null;
    if (req && req.cookies && req.cookies['auth-token']) token = req.cookies['auth-token'];
    return token;
})

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromExtractors([CookieExtractor]),
    secretOrKey: `Ho5tIaFZRQEULisJZjlywA==`
}


let strategy = new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([CookieExtractor]),
    ignoreExpiration: false,
    secretOrKey: `Ho5tIaFZRQEULisJZjlywA==`
}, function(jwt_payload, next) {
    let user = getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

export {passport, jwtOptions}