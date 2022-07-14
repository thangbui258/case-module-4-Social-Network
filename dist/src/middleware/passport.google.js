"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_1 = __importDefault(require("passport"));
const user_model_1 = require("../schema/user.model");
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(function (id, done) {
    user_model_1.User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    });
});
passport_1.default.use(new passport_google_oauth20_1.default({
    clientID: '262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
}, async function (request, accessToken, refreshToken, profile, done) {
    try {
        let user = await user_model_1.User.findOne({
            google_id: profile.id
        });
        if (!user) {
            let data = {
                username: profile.displayName,
                google_id: profile.id
            };
            let user = new user_model_1.User(data);
            await user.save();
        }
        request.session.accessToken = accessToken;
        return done(null, user);
    }
    catch (e) {
        return done(null, false);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.google.js.map