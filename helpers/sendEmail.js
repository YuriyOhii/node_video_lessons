// import ElasticEmail from "@elasticemail/elasticemail-client";
import nodemailer from "nodemailer";
import "dotenv/config";

const { VALID_EMAIL, EMAIL_API_KEY } = process.env;

const sendEmail = (data) => {
  const mailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: VALID_EMAIL,
      pass: EMAIL_API_KEY,
    },
  };

  const mailTransport = nodemailer.createTransport(mailerConfig);

  const email = {
    from: VALID_EMAIL,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  mailTransport.sendMail(email);

  //   const defaultClient = ElasticEmail.ApiClient.instance;
  //   const { apikey } = defaultClient.authentications;
  //   apikey.apiKey = EMAIL_API_KEY;

  // const api = new ElasticEmail.EmailsApi()

  // const email = ElasticEmail.EmailMessageData.constructFromObject({
  //   Recipients: [
  //     new ElasticEmail.EmailRecipient("xaxixil342@trackden.com ")
  //   ],
  //   Content: {
  //     Body: [
  //       ElasticEmail.BodyPart.constructFromObject({
  //         ContentType: "HTML",
  //         Content: "<strong>It is my first Email</strong>"
  //       })
  //     ],
  //     Subject: "Testing email",
  //     From: VALID_EMAIL
  //   }
  // });

  // var callback = function(error, data, response) {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('Letter is sent.');
  //   }
  // };
  // api.emailsPost(email, callback);
};

export default sendEmail;
