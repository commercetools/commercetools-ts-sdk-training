const AWS = require("aws-sdk");
const SES = new AWS.SES({ region: 'eu-central-1' });

exports.handler = function(event, context) {

  console.log('New push from queue.');
  console.log(JSON.stringify(event));

  var records = event.Records;

  for (const record of records){

    // forward to other queue
    // var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    // var params = { }
    // sqs.sendMessage

    // Or, handle it here
    console.log('The following customer has been modified.');
    const body = record.body;
    console.log('Body: ' + JSON.stringify(body));

    // TODO:  fetch now customer data
    // var customerFetched = await getCustomerById(filter out id);

    // his/her name, email
        const email = 'test@commercetools.com'
        const name = 'Tester';
        const plantCheck = 'true';

        AWS.config.update({ region: "eu-central-1" });
        console.log('Handling confirmation email to', event);

        const htmlBody = `
          <!DOCTYPE html>
          <html>
            <head>
            </head>
            <body>
              <p>Hi ${name},</p>
              <h3>Congratulations! </h3>
              <p>You have earned some bonus points from your last order. Thank you for being a loyal customer. </p>
            </body>
          </html>
        `;

        const textBody = `
          Hi ${name},
          Congratulations! You have earned some bonus points from your last order. Thank you for being a loyal customer.
        `;

        // Create sendEmail params
        const params = {
          Destination: {
            ToAddresses: [email]
          },
          Message: {
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: htmlBody
              },
              Text: {
                Charset: "UTF-8",
                Data: textBody
              }
            },
            Subject: {
              Charset: "UTF-8",
              Data: "Information about your Loyalty account."
            }
          },
          Source: "Tester from commercetools <test@commercetools.com>"
        };

        // Create the promise and SES service object
        const sendPromise = SES.sendEmail(params).promise();

        // Handle promise's fulfilled/rejected states
        sendPromise
          .then(data => {
            console.log(data.MessageId);
            context.done(null, "Success");
          })
          .catch(err => {
            console.error(err, err.stack);
            context.done(null, "Failed");
          });
  }



};