exports.contact = function(mail, username, password) {
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var from = "yash.bhatt@estatic-infotech.com";
    var smtpTransport = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: "yash.bhatt@estatic-infotech.com",
            pass: "Yash@20012001"
        }
    }));
    var mailOptions = {
        from: from,
        to: mail,
        subject: ' | Welcome to the website ! |',
        text: 'You are successfully registered with Username ' + username + ' and your password is ' + password + '.'
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + response);
        }
    });
}
