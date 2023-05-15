const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const orgRoutes = require("./routes/orgs_routes.js");
const projectRoutes = require("./routes/projects_routes.js")
const scriptRoutes = require("./routes/script_routes.js")
const functionRoutes = require("./routes/function_routes.js")
const runfunctionRoutes = require("./routes/Scrpit_runner.js")
const userOrgRoutes = require("./routes/userOrg_routes")
const openAIRoutes = require("./routes/openAI_routes")
const user = require("./routes/users_routes");
const invite_routes = require("./routes/invite_routes");
const airtableRoutes = require("./routes/airtable_routes.js")
const bodyParser = require('body-parser');
const multer = require('multer');
require('newrelic');
dotenv.config()

// SERVICES
const app = express();
const PORT = process.env.PORT || 7070
// MIDDLEWARE
app.use(cors({
    origin: "*",
    maxAge: 86400,
    preflightContinue: true,
  }))
app.use(bodyParser.urlencoded({ limit: '2mb',extended: true }));
app.use(bodyParser.json({limit: '2mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());
app.use(bodyParser.text({ type: 'application/xml' }));  
app.use(express.text());
app.use(bodyParser.text({ type: 'application/javascript' }));
app.use(bodyParser.text({ type: 'text/html' }));


// USER ROUTES
app.use('/users', user);

// PROJECT ROUTES
app.use('/orgs', projectRoutes);

//ORGANISATION ROUTES
app.use('/orgs', orgRoutes);

// SCRIPT ROUTES
app.use('/projects', scriptRoutes);

// FUNCTION ROUTES
app.use('/scripts', functionRoutes);

// FUNCTION RUN ROUTES
app.use('/func', runfunctionRoutes);

// User_org_mapping Routes
app.use('/userorg', userOrgRoutes);
app.use(invite_routes);

// open-AI Routes
app.use('/openai', openAIRoutes);

app.use('/airtable', airtableRoutes);

// health-check-api
app.get("/healthcheck", async (req, res) => {
    res.sendStatus(200).statusMessage;
});

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.end();
    } else {
      next();
    }
  });

app.listen(PORT, console.log("listening on port " + PORT))
