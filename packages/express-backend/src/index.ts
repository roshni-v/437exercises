// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect";
import profiles from "./profiles";
import sessions from "./sessions";
import { Profile } from "./models/profile";
import { Session } from "./models/session";
import { UserList } from "models/userlist";
import { BookItem } from "models/bookitem";
import { Books } from "models/books";


import { v4 as uuidv4 } from 'uuid';
import userlist from "./userlist";
import bookitem from "./bookitem";
import books from "./books";


const { auth, requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

require('dotenv').config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(auth(config));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

connect("ReadingClassics"); // use your own db name here

app.get("/", (req: Request, res: Response) => {

    console.log(req.oidc.user);

    const sessionid = uuidv4();
    sessions.clear(sessionid);

    const profile = {
      userid: req.oidc.user.email,
      name: req.oidc.user.nickname,
      email: req.oidc.user.email,
      darkmode: false
    }
    profiles.createIfNotExists(profile);

    const newSession = {
      sessionid: sessionid,
      userid: req.oidc.user.email,
      name: req.oidc.user.nickname,
      email: req.oidc.user.email,
      darkmode: false
    }
  
    sessions.create(newSession);  
    res.redirect(process.env.AUTHENTICATED_REDIRECT_URL);
});


app.get("/callback", (req: Request, res: Response) => {

  const sessionid = uuidv4();

  sessions.clear(sessionid);
  res.redirect(process.env.UNAUTHENTICATED_REDIRECT_URL);
});

app.get("/api/profiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  console.log(userid);
  profiles
    .get(userid)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

app.post("/api/profiles", (req: Request, res: Response) => {
  const newProfile = req.body;
  newProfile.darkmode = newProfile.darkmode ? newProfile.darkmode === 'on' : false; // Convert 'on' to true, anything else to false

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

app.put("/api/profiles/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newProfile = req.body;
  newProfile.darkmode = newProfile.darkmode ? newProfile.darkmode === 'on' : false;

  profiles
    .update(userid, newProfile)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

app.get("/api/sessions", (req: Request, res: Response) => {
  sessions
    .get()
    .then((session: Session) => res.json(session))
    .catch((err) => res.status(404).end());
});

app.get("/api/user/:userid/userlists/", (req: Request, res: Response) => {
  const { userid } = req.params;

  userlist
    .get(userid)
    .then((userlists: UserList[]) => res.json(userlists))
    .catch((err) => res.status(404).end());
});

app.post("/api/user/:userid/userlists/", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newList = req.body;

  userlist
    .create(newList)
    .then((userlist: UserList) => res.status(201).send(userlist));
});

app.delete("/api/userlist/:listid", (req: Request, res: Response) => {
  const { listid } = req.params;

  // First delete all books in this list. Then delete list
  const deletedBooks = bookitem.removeFromList(listid);
  const deletedList = userlist.remove(listid);

  if (!deletedList) {
    return res.status(404).json({ message: 'List not found' });
  }

  res.status(200).json({ message: 'Listed deleted successfully', deletedList });
})

app.get("/api/userlist/:listid", (req: Request, res: Response) => {
  const { listid } = req.params;

  userlist
    .getByListId(listid)
    .then((userlist: UserList) => res.json(userlist))
    .catch((err) => res.status(404).end());
});

app.get("/api/userlist/:listid/bookitems", (req: Request, res: Response) => {
  const { listid } = req.params;

  bookitem
    .get(listid)
    .then((bookitems: BookItem[]) => res.json(bookitems))
    .catch((err) => res.status(404).end());
});

app.post("/api/userlist/:listid/bookitems", (req: Request, res: Response) => {
  const { listid } = req.params;
  const newBook = req.body;

  console.log(newBook);

  bookitem
    .create(newBook)
    .then((bookItem: BookItem) => res.status(201).send(bookItem));
});


app.get("/api/bookitem/:bookid", (req: Request, res: Response) => {
  const { bookid } = req.params;

  bookitem
    .getByBookItemId(bookid)
    .then((bookitem: BookItem) => res.json(bookitem))
    .catch((err) => res.status(404).end());
});

app.get("/api/book/title/:title", (req: Request, res: Response) => {
  const { title } = req.params;

  books
    .getByBookTitle(title)
    .then((book: Books) => res.json(book))
    .catch((err) => res.status(404).end());
});


app.get('/signout', requiresAuth(), (req, res) => {
  res.oidc.logout({ returnTo: 'http://localhost:5173/app/index' });

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});