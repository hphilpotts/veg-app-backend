# Project Build Log Detail

### Initial Setup:   

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

### Basic auth functionality, testing issues:    

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

### Food Item functionality:   

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

### Sign out, re-testing, JWT issue:    

20/02/23:   
- Looking at sign out functionality: [this article](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6) makes for an interesting read with regards to sign out on JWT and invalidating tokens on request. I've made the call to:   
  - Reduce `expiresIn` time in `create-jwt.js` to 1 day.    
  - Handle logout in the frontend through deleting tokens from client-side storage.    
  - Put a 'token blacklist' feature in **Future features to implement** for later implementation.   
My thinking here is that at this stage in the project there is not sufficient requirement for the additional step of invalidating tokens prior to their expiry: in short, my efforts would be better spend elsewhere!    

- Competed general formatting and cleanup across all source code.   
- Now re-testing all routes implemented so far in Postman.

- Issue seen where `jwt.sign` abstracted out from auth controller: token not being sent as response, I have not (after a fair bit of playing around) been able to get a token to return either. I've reversed the abstraction of JWT `payload` creation / `jwt.sign` and implemented them back into `controllers/auth.js`. _Feels like a compromise but I'm trying to strike a balance between making progress and setting realistic goals in relation to my time and ability._   

### Week functionality:    

- I'm now looking at implementing "Week" functionality: this model will hold a user's data for a given week. _I've had to lend this a fair amount of thought:_    
  - Given I wish to track both daily and weekly totals, I have decided to store a `document` for each week, and store days within that.   
  - I have decided to use a new document for each user.   
  - Daily totals are stored within an object, using keys `0...6`: Sunday-Saturday respectively as per `Date.prototype.getDay()`.   
  - Week commencing is tracked to establish if a record already exists for that week (ensuring duplicated are not created in error!).   
  - Weekly totals are extrapolated from daily entries (total unique items).   

- `Week` model added, `services/handle-current-day.js` added. CREATE Week functionality added, tested working ok in Postman.    

21/02/23:   
- Starting work on Week READ routes. _I've initially realised that testing these routes through Postman with the Week model in its current state is going to be a problem:_ the `existingWeek` check in CREATE currently limits my testing pool of 1 document per user (until Sunday that is!).   
- As such I am going to create a new branch where I will implement `TestWeek` models to mock the functionality of `Week` models, without the 1/week restriction. From this I will implement and test the remaining READ, UPDATE, DELETE routes for `Week`.    

- READ Week routes implemented and tested working ok in Postman using `TestWeek` model in place of `Week`.    

22/02/23:   
- UPDATE & DELETE Week routes implemented and tested working ok in Postman using `TestWeek` model.    
- `TestWeek` and associated imports, changes removed from `main` branch.    

### Linking to frontend React app:    
- `auth.js` controller updated: sign up response adjusted to ensure all three of `token`, `"message"` and `status` are sent in the response data, additional status code added to sign in response.     

### Authorisation / Authentication:   

24/02/23:   
- I'm now working on authorization to prevent users from accessing other users' documents. Firstly, `middleware/auth.js` renamed to `authentication.js` in order to differentiate from newly created `authorisation.js` middleware.   

25/02/23:   
- Authorisation checks tested in Postman and working ok. Added to other `Week` routes as required. Authentication check added to remaining `Week` routes.   
- Auth middleware also applied to `Food-item` routes - this required some updates to controller.      

### Rewriting GET reqeusts requiring a `request.body`:   

20/03/23:   
Had a big learn with regards to GET requests - it's been a while since I covered these - as I was running into all sorts of problems in my frontend where GET requests for a specific document required a request body (typically carrying a `userOwner` key:val pair).   
- It seemed that significantly adjusting my approach in the frontend would a) be avoiding approaching a fundamental flaw in the backend and b) not neccessarily be workable.    
- I therefore have a choice to make: either rewrite the affected GET requests in order to make them PUT requests instead, or rewrite them to take a query parameter instead of a request body.    

_I've made the call to use PUTs as this should require less work as compared with using query parameters, for example with regards to authorisation, where the PUT approach does not need any changes (but query param approach would). I would, however, like to revisit this and consider the possible advantages of switching to the query param approach further down the line._       

- All GET Week requests and associated routes now updated to PUTs where required.   
- Ditto all GET FoodItem requests. All updates tested, readme API documentation updated.    

_First succesful PUT made in frontend also._    

### Update to FoodItem route protection:   

- I spotted that I had a duplicate import in FoodItem routes: specifically, my authentication middleware had been imported twice under different variable names, both of which saw use as middleware route protection.    
- Further digging showed that I had been applying authentication checks in error, when I should have been using authorisation checks: as long as users provided any valid token, they would be able to access request routes which I had intended to limit only to a specified `userOwner`. This might mean, for example, that a user could favourite or unfavourite an item on another user's behalf.    
- Middleware imports and subsequent route protection therefore updated in `routes/food-item.js`.    