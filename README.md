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

## Install / contribute:    
To run this API locally and/or contribute to this project, please fork and then clone this repository.    

Run `npm i` in order to install required dependencies.     

Install MongoDB Compass on your local machine, establish a connection and create a new database.    

Create a `.env` file in the project root directory with the following key-values:   
  ```
  PORT = *PORT NUMBER*
  MONGODB_LOCAL_URL = *'<MongoDB Compass connection string>/<database name>'*
  SECRET = *'your secret key'*
  ```

Create a `.gitignore` file in the project root directory as below:    
```
/node_modules
/.env
```   

Run `npm start` and await success messages in the terminal for Application port, Mongoose connection and local MongoDB connection.    

Submit a pull request for any proposed changes.   

--- 
## Jump to:   
- [Issues, future features, questions](https://github.com/hphilpotts/veg-app-backend#current-issues-to-resolve)    
- [Auth API overview](https://github.com/hphilpotts/veg-app-backend#auth-api-requests)    
- [Food-item API overview](https://github.com/hphilpotts/veg-app-backend#food-item-api-requests)    
- [Week API overview](https://github.com/hphilpotts/veg-app-backend#week-api-requests)    
- [Project Build Log](https://github.com/hphilpotts/veg-app-backend#project-log-detail)    

---
## Project ERD:   


![Image of Project ERD - three entities: Food-item, User, Week](/readme_img/ERD.png)

_ERD from early version of project - daily entries into Week model (fields 0-6) are not typed as `ObjectId` at this stage._
 
---
## API request overview:    

### **AUTH API requests**:    

_All request bodies to be sent in JSON format._   

#### POST - User Sign Up    
`/auth/signup`   
- Create user, respond with signed JWT `token` if successful.   
- Request body: `userName, emailAddress, password` from form submission.    

#### POST - User Sign In    
`auth/signin`   
- Retrieve signed JWT `token` if successful.  
- Also returns `user` object within response body. 
- Request body: `emailAddress, password` from form submission.    

### **FOOD-ITEM API requests**:    

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

#### PUT Retrieve Food-item Detail    
`foodItem/detail`   
- Get Food-item by document ID.   
- Request body: `id`    

#### PUT Retrieve Food-item By User   
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
- Request body: `id, userOwner`, document fields to be updated, e.g.:   
```
{
    "id": "63efc4d3e21b7235dd0f5ec7", // required
    "userOwner": "640f0e85a8168b456aa1b589", // required
    "foodItemName": "Romaine lettuce", // field to be updated
    [...] // any subsequent fields to be updated
}
```

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

### **WEEK API requests**    

_All request bodies to be sent in JSON format._   

_All Week routes protected by JWT checks:_    
- Request headers on all routes must include `x-auth-token` containing a valid JWT.     

#### POST Week Add New Week       
`week/newWeek`   
- Add new Week document to collection.      
- Request body: `userOwner`     

#### PUT Retrieve Week Index by User     
`week/index`   
- Get all Week documents in reverse chronological order by User.     
- User's Week documents restricted to user making request only: token in header checked against request body's `userOwner`.    
- Request body: `userOwner`     

#### PUT Retrieve Current Week Detail by User       
`week/current`   
- Get current Week document for User.     
- User's current Week document restricted to user making request only: token in header checked against request body's `userOwner`.    
- Request body: `userOwner`     

#### PUT Retrieve Current Day Detail from Week by User.   
`week/today`   
- Get today's entries from Week document for User.    
- User's Week document accessed restricted to user making request only: token in header checked against request body's `userOwner`.    
- Request body: `userOwner`  

#### PUT Retrieve Week Detail by ID   
`week/detail`   
- Get specific Week document by ID.     
- Week documents accessible restricted to those owned by user making request: token in header checked against request body's `userOwner`.    
- Request body: `id, userOwner`     

#### PUT Retrieve Week Daily Detail by ID   
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

## Current issues to resolve:   
- `Week` and `Food-item` controllers require refactoring: particularly abstraction of logic, possibly combining routes that perform similar functions.    
- Daily entries into Week model are not typed as `ObjectId`.    

## Future features to implement:
- 'Blacklisting' of tokens which required invalidation prior to their expiration time.      
- GET requests rewritten as PUT requests (in order to pass a `request.body`) could be rewritted as GET requests which take a query parameter: _'pros' and 'cons' of both approaches need to be weighed up and a decision made_.

## Unanswered questions (known unknowns):   
- Issues seen when `createJWT` (specifically `jwt.sign`) abstracted out into `utils/` from `controllers/auth.js`:
  - `res.json({ token })` is not sending from within `utils/create-jwt.js` when imported into auth controller for obvious reasons.    
  - I am unable to instead return `token` from within this and save into / send from `controllers/auth.js`: issue seems to lie as per [this stackoverflow](https://stackoverflow.com/questions/55748325/trying-to-sign-a-jwt-returns-undefined) with "trying to return from a callback" - possibly relating to [this other stackoverflow](https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function#:~:text=There's%20no%20place%20for%20returned,attention%20to%20the%20return%20value.&text=Yes%2C%20it%20makes%20fun%20sense,Unfortunately%2C%20it%20is%20not%20possible.) wherein "you cannot return from an asynchronous call inside a synchronous method".   
  - _Clearly a gap in my understanding here!_ One to pick up and go over in detail until I can understand what was going wrong.     

  ## Project log (detail):      
- [Link to detailed project build log here](https://github.com/hphilpotts/veg-app-backend/blob/main/buildLog.md)    