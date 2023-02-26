# 'Veg App' - Express JS Backend      

## What is it?    
This is a MongoDB-linked Node.js backend app which uses the Express framework. It has been built to serve a linked React frontend app as part of a dual-app MERN stack project.   

## What does it do?   
It allows front-end app users to sign up / sign in and then track their daily and weekly intake of fruits, vegetables, nuts & seeds and grains by inputting "food items" that they have eaten.    

There is full CRUD functionality for the `Food-item` and `Week` models. Routes are protected through `JWT`-based authorisation which prevents unauthorised operations on other users' documents.

## Why have I built this?   
I have built this as part of my portfolio of side projects. Aims for this project were as follows:   
- build a MERN stack project from the ground up to demonstrate my skills across the stack     
- refresh my knowledge and understanding of the back-end having recently focused solely on front-end work   
- take time to understand what I am writing and why (rather than copying source code from previous projects)    
- gain practice reading various documentation and articles    
- implement improvement around best practices based on my learning since my last Express app   
- apply 'clean code' disciplines in a practical context   
- prevent skills atrophy during the job search by varying up my areas of focus    

## Tech stack:    
- Node.js runtime environment   
- Express JS application framework     
- MongoDB NoSQL database    
- Mongoose ODM library    
- `jsonwebtoken` auth    
_For a full list of dependencies see_ `package.json`    

## Dev tools:   
- Written in VSCode   
- API testing completed in Postman    
- MongoDB Compass database GUI    

--- 
## Jump to:   
[Latest progress update](https://github.com/hphilpotts/veg-app-backend#authorisation--authentication)    
[Issues, features to add, unanswered questions](https://github.com/hphilpotts/veg-app-backend#current-issues-to-resolve)    
[Auth API overview](https://github.com/hphilpotts/veg-app-backend#auth-apis)
[Food-item API overview](https://github.com/hphilpotts/veg-app-backend#food-item-apis)
[Week API overview](https://github.com/hphilpotts/veg-app-backend#week-apis)
[Project log detail](https://github.com/hphilpotts/veg-app-backend#project-log-detail)

---

## API request overview:    

### **AUTH APIs**:    

_All request bodies to be sent in JSON format._   

#### POST - User Sign Up    
`/auth/signup`   
- Create user, respond with signed JWT `token` if successful.   
- Request body: `userName, emailAddress, password` from form submission.    

#### POST - User Sign In    
`auth/signin`   
- Retrieve signed JWT `token` if successful.   
- Request body: `emailAddress, password` from form submission.    

### **FOOD-ITEM APIs**:    

_All request bodies to be sent in JSON format._   

_All Food-item routes protected by JWT checks:_    
- Request headers on all routes must include `x-auth-token` containing a valid JWT.    

#### POST Food-item Add   
`foodItem/add`    
- Add new Food-item document to collection.    
- Request body: `foodItemName, foodItemCategory, userOwner`.    

#### GET Food-item Index    
`foodItem/index`    
- Get all Food-items from collection.   

#### GET Food-item Detail    
`foodItem/detail`   
- Get Food-item by document ID.   
- Request body: `id`    

#### GET Food-item By User   
`foodItem/userAddedBy`    
- Get all Food-items added by a specified User.    
- Request body: `userOwner`    

#### GET Food-item Favourites    
`foodItem/favourites`   
- Get all Food-items favourited by a specified User.    
- Request body: `userFavouritedBy`    

#### POST Food-item Edit    
`foodItem/edit`   
- Update Food-item based on document ID.    
- Restricted to user who created selected item only: token in header checked against Food-item document's `userOwner`.    
- Request body: `id, userOwner`, document fields to be updated, e.g.: . 
       <!-- todo add example! -->

#### POST Food-item Add/Remove from Favourites   
`foodItem/favourite`    
- Toggle Food-item as specified by ID in user's favourites.    
- Can only be favourited/unfavourited by user making request: token in header checked against `userOwner` in request body.        
- Request body: `id, userOwner`       

#### DELETE Food-item By Id   
`foodItem/delete`   
- Delete Food-item document by ID.    
- Restricted to user who created selected item only: token in header checked against Food-item document's `userOwner`.    
- Request body: `id, userOwner`       

### **WEEK APIs**    

_All request bodies to be sent in JSON format._   

_All Week routes protected by JWT checks:_    
- Request headers on all routes must include `x-auth-token` containing a valid JWT.     

#### POST Week Add New Week       
`week/newWeek`   
- Add new Week document to collection.      
- Request body: `userOwner`     

#### GET Week Index by User     
`week/index`   
- Get all Week documents in reverse chronological order by User.     
- User's Week documents restricted to user making request only: token in header checked against request body's `userOwner`.    
- Request body: `userOwner`     

#### GET Current Week Detail by User       
`week/current`   
- Get current Week document for User.     
- User's current Week document restricted to user making request only: token in header checked against request body's `userOwner`.    
- Request body: `userOwner`     

#### GET Current Day Detail from Week by User.   
`week/today`   
- Get today's entries from Week document for User.    
- User's Week document accessed restricted to user making request only: token in header checked against request body's `userOwner`.    
- Request body: `userOwner`  

#### GET Week Detail by ID   
`week/detail`   
- Get specific Week document by ID.     
- Week documents accessible restricted to those owned by user making request: token in header checked against request body's `userOwner`.    
- Request body: `id, userOwner`     

#### GET Week Daily Detail by ID   
`week/dailyDetail`   
- Get specific day entry detail from Week document.     
- Day data from Week documents restricted to those owned by user making request: token in header checked against request body's `userOwner`.    
- Request body: `id, day, userOwner`    
- Day specified by digit as string: `0-6` representing 'Sunday-Saturday'.   

#### POST Update Week Food-item Entries by ID   
`week/update`   
- Add a new food item to a specified day within the selected week.        
- Restricted to user who owns specified week only: token in header checked against request body's `userOwner`.    
- Request body: `id, dayOfWeek, foodItem, userOwner`      
- Day specified by digit as string: `0-6` representing 'Sunday-Saturday'.   
- Food-item specified by Food-item `id`.    

#### DELETE Week by ID   
`week/deleteAll`   
- Delete Week document.     
- Restricted to user who owns specified week only: token in header checked against request body's `userOwner`.    
- Request body: `id, userOwner`     

#### DELETE Day from Week by ID    
`week/deleteDay`   
- Delete specified day from selected Week.  
- Restricted to user who owns specified week only: token in header checked against request body's `userOwner`.    
- Request body: `id, dayOfWeek, userOwner`  
- Day specified by digit as string: `0-6` representing 'Sunday-Saturday'.   

#### DELETE Entry from Week by ID and Day   
`week/deleteEntry`   
- Delete specified entry from specified day within selected Week.  
- Restricted to user who owns specified week only: token in header checked against request body's `userOwner`.    
- Request body: `id, dayOfWeek, foodItem, userOwner`
- Day specified by digit as string: `0-6` representing 'Sunday-Saturday'.   
- Food-item specified by Food-item `id`.   


## Project log (detail):   

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

### Authorisation / Authentication:   

24/02/23:   
- I'm now working on authorization to prevent users from accessing other users' documents. Firstly, `middleware/auth.js` renamed to `authentication.js` in order to differentiate from newly created `authorisation.js` middleware.   

25/02/23:   
- Authorisation checks tested in Postman and working ok. Added to other `Week` routes as required. Authentication check added to remaining `Week` routes.   
- Auth middleware also applied to `Food-item` routes - this required some updates to controller.    

## Current issues to resolve:   
- `Week` and `Food-item` controllers require refactoring: particularly abstraction of logic, possibly combining routes that perform similar functions.    
- Daily entries into Week model are not typed as `ObjectId`.    

## Future features to implement:
- 'Blacklisting' of tokens which required invalidation prior to their expiration time.    

## Unanswered questions (known unknowns):   
- Issues seen when `createJWT` (specifically `jwt.sign`) abstracted out into `utils/` from `controllers/auth.js`:
  - `res.json({ token })` is not sending from within `utils/create-jwt.js` when imported into auth controller for obvious reasons.    
  - I am unable to instead return `token` from within this and save into / send from `controllers/auth.js`: issue seems to lie as per [this stackoverflow](https://stackoverflow.com/questions/55748325/trying-to-sign-a-jwt-returns-undefined) with "trying to return from a callback" - possibly relating to [this other stackoverflow](https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function#:~:text=There's%20no%20place%20for%20returned,attention%20to%20the%20return%20value.&text=Yes%2C%20it%20makes%20fun%20sense,Unfortunately%2C%20it%20is%20not%20possible.) wherein "you cannot return from an asynchronous call inside a synchronous method".   
  - _Clearly a gap in my understanding here!_ One to pick up and go over in detail until I can understand what was going wrong.   