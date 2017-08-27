# InstantCVMaker
http://www.cvmaker.co.in

A tool to create resumes online with easy to use forms, and pre defined templates

## How to use

- Create tools/config.sh file with the following
`export FACEBOOK_ID=<FB app ID>`
`export FACEBOOK_SECRET=<FB app Secret>`
`export COOKIE_SECRET=<Cookie secret>`
`export COOKIE_NAME=<Cookie name>`
`export MONGODB_URI=mongodb://127.0.0.1:27017/cvmaker`

- Start mongodb in the project foler as `mongod --dbpath=data`
- Install dependencies ` npm install`
- To run in **production** mode ` npm start`
- To run on client side with hot relaod  `npm run web-dev`
- To work on server side with hot reload  `npm run app-dev`

### Technology used
- ReactJS
- MaterialUI
- LESS
- Marko
- NodeJS
- MongoDB
- GraphQL

### Third partys Integration
- **Google** Analytics
- **Facebook** API for login and analytics
- **Heroku** for deployment

### Upcoming features
- Multiple resume options
- Email resume
- Responsive resumes that can be shared online
- Templates based on professions - designers/engineers/freshers
- Sample resumes
- Suggestion based on skill entered
- More resume templates to be added
- Paypal integration for paying for premium templates
- Inline editing in templates for advanced users
