const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }) //filter the surveys for the specific user
      .select({ recipients: false }); // exclude specific fields from the query
    res.send(surveys);
  })

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });

  app.get("/api/surveys/test", (req, res) => {
    res.send("surveys test OK");
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");      
     _.chain(req.body) // lodash feature that lets us chain operations in stream
        .map((event) => {      
        const match = p.test(new URL(event.url).pathname);
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice  }
        }
      })
        .compact() // remove the 'undefined' elements from the collection
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
          Survey.updateOne({ // mongo update statement
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false } // filter from the list of recipients in the relevant survey
            }
          }, {
            $inc: { [choice]: 1 }, // increment the total survey choice (either the 'yes' or the 'no' field by 1)
            $set: { 'recipients.$.responded': true }, // update the specific recipient with responded = true
            lastResponded: new Date()
          }).exec();
        })
        .value();

        res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body; // deconstruction
    console.log("survey api", req.body);

    const survey = new Survey({
      title, // ES6 equivalent for "title: title"
      subject,
      body,
      // need to split the comma separated list of emails to an erray of email objects
      recipients: recipients.split(",").map(email => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save(); // save the survey to the db
      req.user.credits -= 1; // deduct one $ from the user credits
      const user = await req.user.save(); // save the updated user object and get the newest result

      res.send(user);
    } catch (error) {
      res.status(422).send(error); // something with the data provided in request is bad, return error
    }
  });
};
