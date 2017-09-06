# InstantCVMaker
http://www.cvmaker.co.in

A tool to create resumes online with easy to use forms, and pre defined templates

## How to use

- Create tools/config.sh file with the following

`export COOKIE_NAME = <Generate your own>`
`export COOKIE_SECRET = <Generate your own>`
`export FACEBOOK_ID = <Generate your own>`
`export FACEBOOK_SECRET = <Generate your own>`
`export MAIL_PASS = <Generate your own>`
`export MAIL_USER = <Generate your own>`
`export MONGODB_URI = <Generate your own>`
`export NEW_RELIC_LICENSE_KEY = <Generate your own>`
`export NEW_RELIC_Lexport OG = <Generate your own>`
`export TILL_URL = <Generate your own>`
`export GOOGLE_ID = <Generate your own>`
`export GOOGLE_SECRET = <Generate your own>`
`export LINKEDIN_ID = <Generate your own>`
`export LINKEDIN_SECRET = <Generate your own>`


- Start mongodb in the project foler as `mongod --dbpath=data`
- Install dependencies ` npm install`
- To run in **production** mode ` npm start`
- To run on client side with hot relaod  `npm run web-dev`
- To work on server side with hot reload  `npm run app-dev`

### Technology used
- ReactJS
- Redux
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
