#Example setup

* `CHANGED.txt` has the list of changed files
* Paths in CHANGED.txt are relative to the root of the project.
* Paths in `.module` files are relative to the root of the project.

##Expected results:

Given the files listed in `CHANGED.txt`, these are the modules containing the changed files:
 * deployment (module containing `deployment/Dockerfile`)
 * app-backend (module containing `app-backend/src/test/java/ServiceImplTest.java`)

These are the modules with all their dependencies, including transitive dependencies:
 * deployment
 * app-backend
 * cache-integration (dependency of app-backend)
 * db-integration (dependency of app-backend)
 * utilities (dependency of db-integration)

So the expected result should look like this (order doesn't matter):
`deployment, app-backend, cache-integration, db-integration, utilities`

##Project structure
```
project
├── CHANGED.txt
├── README.md
├── app-backend
│   ├── .module
│   └── src
│       ├── main
│       │   └── java
│       │       └── ServiceImpl.java
│       └── test
│           └── java
│               └── ServiceImplTest.java
├── app-frontend
│   ├── .module
│   └── src
│       ├── main
│       │   └── java
│       │       └── HelloWorld.java
│       └── test
│           ├── java
│           │   └── HelloWorldTest.java
│           └── resources
│               └── testData.txt
├── assets
│   ├── .module
│   ├── doc  
│   │   └── user-guide
│   │       └── index.html
│   └── images
│       ├── back.png
│       └── home.png
├── cache-integration
│   └── .module
├── db-integration
│   ├── .module
│   └── src
│       ├── main
│       │   ├── java
│       │   │   ├── Team.java
│       │   │   └── User.java
│       │   └── resources
│       │       └── migrations.sql
│       └── test
│           └── java
│               ├── TeamTest.java
│               └── UserTest.java
├── deployment
│   ├── .module
│   └── Dockerfile
├── instrumentation
│   ├── .module
│   └── src
│       └── main
│           └── java
│               └── CutPoints.java
└── utilities
    └── .module

26 directories, 23 files
```
