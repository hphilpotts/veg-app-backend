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

- _Potentially a hideous bodge - will see how it goes when I get to the next step: trying to set up **Jest** testing again...       
