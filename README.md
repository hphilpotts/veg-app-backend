# Veg App Backend       

11/02/23:       
- Repos set up, Node.js initialised. ExpressJS, Mongoose, Axios and Dotenv installed. Basic repository structure templated with placeholders.          
- `server.js` basic setup completed, manually tested as working ok. _Lots of references to notes [here](https://github.com/hphilpotts/SEI-66-Notes/blob/main/week4/w4d2-Express.md) - needed a refresher around URL Parameters / Query Parameters in particular._       
- Attempting to set up testing based on [this tutorial](https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/): installed Jest, Supertest, cross-env; updated `"scripts"` in `package.json`;      
- Also tried implementing tests [similar to these](https://dev.to/eetukudo_/server-side-testing-with-jest-1pj).

12/02/23:       
- I kept on running into issues around open handles, using `--detectOpenHandles` showed that this issue stems from `app.listen`. Various test configurations would not resolve this, neither did separating app and server logic as per [this article](https://dev.to/nermineslimane/always-separate-app-and-server-files--1nc7) (_I have decided to continue with this practice of separate app.js and server.js_).      
- The `server.spec.js` test for DB connection would pass (but caused open handle issue), however I found myself making further and further changes to my (working) `app.js` file in order to get  `app.spec.js` to pass. Given my lack of familiarity with any given testing framework I've made the call to pause, possibly try using a different testing library (possibly **Mocha**) instead once I have a bit more functionality added (_I'll continue with my plan to use **Jest** in my frontend app_).      
- I'm basing my structure on the three-layer app structure detailed [here](https://blog.treblle.com/egergr/) - again, the server/app split is proposed by the author (albeit with `app.js` renamed to `index.js` and placed in an `app/` folder).       

- App loosely structured as above using placeholders. I'm going to start putting in auth functionality first, working from [this tutorial](https://medium.com/swlh/user-authentication-using-mern-stack-part-1-backend-cd4d193f15b1). Moved DB connection from `server.js` to `index.js`. Installed additional dependencies: body-parser, bcrypt, cors, jsonwebtoken.       

13/02/23:       
User model added, signup / signin functionality started but not tested. Passport requires implementing before testing can begin!        

14/02/23:       
`auth/signup` and `auth/signin` tested working on in **Postman**. More sophisticated error handling required in `controllers/auth.js`: signup route only provides a single generic error message, signin only provides 'user not found', 'password not matched' and 'you are not logged in'.        

15/02/23:       
- _Had one of those moments where a sudden realisation from a problem days before comes out of the blue while off doing something else - the issues seen with **Jest** and_ `app.listen` _causing open handles can potentially avoided through avoiding calling_ `app.listen` _when running tests_.     
- After a lot of playing about with `package.json "scripts"`, I have eventually come up with a solution like so:        

```
// server.js:
const setPortAndListenEnabled = process.env.PORT_LISTEN;
if (setPortAndListenEnabled) {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Hello-Express Application is running on port ${PORT}`));
}
```

```
// package.json:
[...]
  "scripts": {
    "start": "PORT_LISTEN=enabled nodemon server.js",
[...]
```

- _Potentially a hideous bodge - will see how it goes when I get to the next step: trying to set up **Jest** testing again_...       

17/02/23:       
- After reading **lots** more guides, tutorials (often conflicting or of varying quality) and documentation, I have come to realise that the line of testing I was pursuing was largely pointless: effectively testing Mongoose rather than any of my source code. I have instead decided to handle the very core `server.js` and `index.js` hosting and database connection errors through the console.        

- Updated `controllers/auth.js` to better handle errors and provide a `jwt` upon signup as well as on login. [This tutorial](https://dev.to/jeffreythecoder/setup-jwt-authentication-in-mern-from-scratch-ib4) was clear and helpful! Tested in **Postman**. Authorisation middleware added ready for use.    

- Implementing 'add food item' functionality: model created, create food item controller added, route implemented. Tested working ok in **Postman**. Now moving on to Read, Update, Delete.   
- Hit an issue with `foodItem_updateFavourites_post` where route only works on alternate `send`s through Postman, each second request crashes the app:   
```
TypeError: foundItem.usersFavouritedBy.pull(...).then is not a function
  [...]
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  [...]
```
19/02/23:   
- Updated `foodItem_updateFavourites_post` with simpler syntax and error handling, now working ok - tested in Postman. Delete route implemented and tested ok.    

20/02/23:   
Looking at sign out functionality: [this article](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6) makes for an interesting read with regards to sign out on JWT and invalidating tokens on request. I've made the call to:   
- Reduce `expiresIn` time in `create-jwt.js` to 1 day.    
- Handle logout in the fronend through deleting tokens from client-side storage.    
- Put a 'token blacklist' feature in **Future features to implement** for later implementation.   
My thinking here is that at this stage in the project there is not sufficent requirement for the addional step of invalidating tokesn prior to their expiry: in short, my efforts would be better spend elsewhere!    

- Issue seen where `jwt.sign` abstracted out from auth controller: token not being sent as response, I have not (after a fair bit of playing around) been able to get a token to return either. I've reversed the abstraction of JWT `payload` creation / `jwt.sign` and implemented them back into `controllers/auth.js`. _Feels like a compromise but I'm trying to strike a balance between making progress and setting realistic goals in relation to my time and ability._   

## Current issues to resolve:   

## Future features to implement:
- 'Blacklisting' of tokens which required invalidation prior to their expiration time.    

## Known unknowns:
- Issues seen when `createJWT` (specifically `jwt.sign`) abstracted out into `utils/` from `controllers/auth.js`:
  - `res.json({ token })` is not sending from within `utils/create-jwt.js` when imported into auth controller for obvious reasons.    
  - I am unable to instead return `token` from within this and save into / send from `controllers/auth.js`: issue seems to lie as per [this stackoverflow](https://stackoverflow.com/questions/55748325/trying-to-sign-a-jwt-returns-undefined) with "trying to return from a callback" - possibly relating to [this other stackoverflow](https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function#:~:text=There's%20no%20place%20for%20returned,attention%20to%20the%20return%20value.&text=Yes%2C%20it%20makes%20fun%20sense,Unfortunately%2C%20it%20is%20not%20possible.) wherein "you cannot return from an asynchronous call inside a synchronous method".   
  - _Clearly a gap in my understanding here!_ One to pick up and go over in detail until I can understand what was going wrong.   

