# DevBallers UDE-WT-Project

## 🚀 Get Started

### general todos
- All commits starts like this: "#\<issue_number> \<commit_message>"
- Use material UI : https://v18.material.angular.io/guide/getting-started

### Step 1: Pre-requisites
Download and install the following software:

- install nvm (do this on your own please)
- run code: ```nvm install lts/iron```
- run code: ```nvm alias default lts/iron```
!!!: On windows, you just need to specify version: ```nvm install 20.18.1```

### Step 2: Setup Development environment
#### Configurate your mongo atlas cloud:
- create cluster
- create user and password for cluster (use only alpha-numeric passwords)
- extract mongo_uri

#### Configurate your render:
- select right branch to deploy on render
- select server as root directory
- build command: ```npm install```
- run command: ```npm run start```
- add environment variables:
  - NODE_ENV: production
  - MONGO_URI: mongodb+srv://\<username>:\<password>@\<uri>

### Step 3: Usage of Development environment
When you made changes to the client:
- start "Build Client" run configuration
- commit and push all changed files to your branch.
- let render re-deploy the service

You can also use a local development environment(configure yourself)
