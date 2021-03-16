import { UsersRepository } from '../repositories/users.repository';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import { DeserializationError } from '../types/errors';
import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express';

const usersRepository = new UsersRepository();

const strategy = (app: any) => {
  passport.use(
    new passportGoogle.OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${process.env.BE_BASE_PATH}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        const user = await usersRepository.authenticateUser({
          googleId: profile.id,
          username: profile.displayName,
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          email: profile.emails ? profile.emails[0].value : '',
          avatarReference: profile.photos ? profile.photos[0].value : '',
        });
        done(null, user);
      },
    ),
  );

  passport.serializeUser(function (user: any, done) {
    done(null, user.sessionToken);
  });

  passport.deserializeUser(async function (token: string, done) {
    try {
      const user = await usersRepository.findAuthenticated(token);
      done(null, user);
    } catch (e) {
      done(new DeserializationError("Couldn't deserialize user"), null);
    }
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: `${process.env.FE_BASE_PATH}/login`,
    }),
    function (req: any, res: any) {
      req.session.user = req.user;
      res.redirect(`${process.env.FE_BASE_PATH}/users/${req.user.username}`);
    },
  );

  app.get('/auth/logout', (req: any, res: any) => {
    req.logout();
    delete req.session.user;
    res.redirect(`${process.env.FE_BASE_PATH}/login`);
  });

  app.use((req: ExRequest, res: ExResponse, next: NextFunction) => {
    if (req.session && req.user) {
      req.session.user = req.user;
    }
    next();
  });

  return app;
};

export { strategy };
