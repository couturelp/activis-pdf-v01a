import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';

import '../imports/startup/simple-schema-conf';

Meteor.startup(() => {
    Accounts.emailTemplates.resetPassword.text = function (user, url) {
        url = url.replace('#/', '')
        return " To reset your password, simply click the link below:\n\n"
          + url;
     };

    if(Meteor.isServer) {
        process.env.MAIL_URL="smtp://account@quantik.ca:***API****@smtp.mandrillapp.com:587/";

        Accounts.emailTemplates.siteName = "Meteor-BoilerPlate";
        Accounts.emailTemplates.from = "Meteor-BoilerPlate <meteor-boiler@gmaq.ca>";
    }
});
