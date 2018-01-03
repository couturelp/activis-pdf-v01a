import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';

import '../imports/startup/simple-schema-conf';
import { userInfo } from 'os';

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


        /*
            var doc = new PDFDocument({size: [10691, 7090], margin: 0});
            doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
            doc.image(process.env.PWD + '/images/remax-plate.jpg', 0, 0);
            doc.fontSize(650);
            doc.font(process.env.PWD + '/images/gnb.ttf').fillColor('#3c3c3b').text('THIERRY', 3100,1800, {align: 'left', width: 6000});
            doc.fontSize(650);
            doc.text('TANGUAY', 3100,2400, {align: 'left', width: 6000});
            doc.fontSize(400);
            doc.text('(438)821-5477', 3100,3650, {align: 'left', width: 6000});
            doc.fontSize(200);
            doc.text('ttanguay@activis.ca', 3150,4300, {align: 'left', width: 6000})
            doc.fontSize(375);
            doc.fillColor('white').text('RE/MAX BUREAU', 3300,5125, {align: 'center', width: 7397})
            doc.fontSize(150);
            doc.fillColor('white').text('Agence Immobilière', 3300,5545, {align: 'center', width: 7397})
            doc.fontSize(375);
            doc.fillColor('white').text('438.821.5477', 3300,5800, {align: 'center', width: 7397})
            doc.image(process.env.PWD + '/images/thierrypic.jpg', 7432, 1869);
            doc.write(process.env.PWD + '/activis-pdf-example.pdf');
            */

    } 
});

Meteor.methods({
    'pdf.create'(userInfos) {
        if(Meteor.isServer) {
            var doc = new PDFDocument({size: [10691, 7090], margin: 0});
            doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
            doc.image(process.env.PWD + '/images/remax-plate.jpg', 0, 0);
            doc.fontSize(650);
            doc.font(process.env.PWD + '/images/gnb.ttf').fillColor('#3c3c3b').text(userInfos.firstname, 3100,1800, {align: 'left', width: 6000});
            doc.fontSize(650);
            doc.text(userInfos.lastname, 3100,2400, {align: 'left', width: 6000});
            doc.fontSize(400);
            doc.text(userInfos.phone, 3100,3650, {align: 'left', width: 6000});
            doc.fontSize(200);
            doc.text(userInfos.email, 3150,4300, {align: 'left', width: 6000});
            doc.fontSize(375);
            doc.fillColor('white').text(userInfos.bottomOne, 3300,5125, {align: 'center', width: 7397});
            doc.fontSize(150);
            doc.fillColor('white').text(userInfos.bottomTwo, 3300,5545, {align: 'center', width: 7397});
            doc.fontSize(375);
            doc.fillColor('white').text(userInfos.bottomThree, 3300,5800, {align: 'center', width: 7397});
            doc.image(process.env.PWD + '/images/thierrypic.jpg', 7432, 1869);
            doc.write(process.env.PWD + '/public/activis-pdf-' + userInfos.lastname + '.pdf');
            console.log("Generated for " + userInfos.firstname + " " + userInfos.lastname + " on server.");
        }
    }
});
