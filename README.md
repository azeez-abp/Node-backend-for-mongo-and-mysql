# NODE BACKEND FOR MONGO AND MYSQL
## The folder list
 - ## Controllers
    is the folder that contains the backend components of your application if you you don't adapt microservices technique. the pattern of the controller is the file structure contains
    - Route folder which contains the files for individual route list, each route is exported and required in the Route.js file
    - Route file  contains the list of the Route from the route files in each component
- ## db folder contains the config for the mysql and mongo db database. in this folder is the file for each Schema
  the structure is 
  - db
    - Mysql
        - Tables
        - AllTables.js contains the list of all required Schema files form the Tables forlder
    - Mongo
        - Tables
        - MysqlDB.js note use for now in this version
        - SequenlizeDB.js the Mysql file use for the database
- ## Lib folder for files that contains some special function and config 
   - Lib
        - Config folder
            - keys
            - dev  contains files for development env variable 
            - prod contains files for production env variable
            - Key.js is the file the require the file for both dev and prod and decide which to load depend on the Node env
        - Cookie.js file contails config for cookie
        - Session.js file contains config for session and require Cookie.js file for cookie config
        - Password.js file is for password generator and checking password equallity
- ## Middleware folder  conatins files for auths middleware
- ## Model folder is still experimental
- ## Public folder for the files that can be access from front end
- ## view contains front end files for the M-V-C 
