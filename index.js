const express = require('express');
const app = express();

//port at which server is to be connected...
const PORT = process.env.PORT || 3000;

//console.log(__dirname); //Directory name

//Sending public files(e.g javascript files and css files)
// with html file to client
app.use('/',express.static(__dirname + '/public'));


/****************************************************/
app.get('/', (request, response) => {
    response.sendFile(__dirname + "/html/index.html");
});

app.get('/login', (request, response) => {
    response.sendFile(__dirname + "/html/login.html");
});

app.get('/signup', (request, response) => {
    response.sendFile(__dirname + "/html/signup.html");
});

app.get('/passforget', (request, response) => {
    if (request.query.mail != null) {
        var mailOptions = {
            from: 'chiragsindhu21@gmail.com',
            to: request.query.mail,
            subject: 'Reset Password for Reddit India Account',
            html: makeMailHTML(request.query.mail,request.query.code)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        response.redirect('http://localhost:3000/passforget/confirmsent?mail=' + request.query.mail);
    } else {
        response.sendFile(__dirname + "/html/forgetPass.html");
    }
});

app.get('/createpost', (request, response) => {
    response.sendFile(__dirname + "/html/createpost.html");
});

app.get('/passforget/confirmsent', (request, response) => {
    response.sendFile(__dirname + "/html/confirmfgtpass.html");
});

app.get('/resetpassword', (request, response) => {
    response.sendFile(__dirname + "/html/reset_password.html");
});

app.get('/profile', (request, response) => {
    response.sendFile(__dirname + "/html/profile.html");
});

app.get('/viewprofile', (request, response) => {
    response.sendFile(__dirname + "/html/viewprofile.html");
});
/***************************************************/


app.listen(PORT, () => {
    console.log("We are Live on " + PORT);
});


/**************************/
//nodemailer is used for sending mail
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chiragsindhu21@gmail.com',
    pass: 'chirag123'
  }
});

function makeMailHTML(mail,code) {
    var mailHTML = "<p style=\"font-weight:500;margin-left:35%;color:rgb(20,20,20);font-size:35px;font-family:Verdana;\">";
    mailHTML += "Reddit India</p>";
    mailHTML += "<p>Hi " + mail + ",<br>";
    mailHTML += "We hope that this mail finds you in great health.This is system gernated mail So, Don't reply.We have sent you ";
    mailHTML += "this email because you have requested for Reset password of your Reddit India Account.See below there is ";
    mailHTML += "6 - digit Code, Copy that code and open link.<strong>[Don't Share this code to anyone]</strong></p>";
    mailHTML += "<p style=\"box-shadow:1px 1px 1px 10px rgb(200,200,200);width:10.3rem;padding:10px 20px 10px 1.5rem;margin-left:35%;background-color:rgb(235,235,235);"
    mailHTML += "border-radius:3px;font-size:28px;font-weight:100;font-family:Impact;\">Code : " + code + "</p>";
    mailHTML += "<p>Steps to follow:<br>1. Copy the above 6-digit Code.<br>2. Open the below given link.<br>";
    mailHTML += "3. Paste the code in Code Field in the page.<br> 4. Enter your new Password.</p>";
    mailHTML += "<br><p style=\"border:gray 1px dashed;background-color:rgb(220,220,220);border-radius:3px;padding:10px 0px 10px 25%;\">"
    mailHTML += "Reset link : http://localhost:3000/resetpassword?mail=";
    mailHTML += mail + "&code=" + code + "</p>";

    return mailHTML;
}