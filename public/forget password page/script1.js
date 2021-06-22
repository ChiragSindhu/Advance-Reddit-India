document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("check_icon1").style.display = "none";
    document.getElementById("check_icon2").style.display = "none";
    document.getElementById("field").value = "";
});

function typing() {
    const mail = document.getElementById("field").value;
    if (mail.length > 0) {
        if (validateEmail(mail) != 0) {
            console.log("correct!");
            document.getElementById("check_icon1").style.display = "block";
            document.getElementById("check_icon2").style.display = "none";
            document.getElementById("send_code").style.backgroundColor = "rgb(64, 93, 230)";
        } else {
            console.log("incorrect!");
            document.getElementById("check_icon1").style.display = "none";
            document.getElementById("check_icon2").style.display = "block";
            document.getElementById("send_code").style.backgroundColor = "rgb(122, 141, 228)";
        }
    } else {
        document.getElementById("check_icon1").style.display = "none";
        document.getElementById("check_icon2").style.display = "none";
        document.getElementById("send_code").style.backgroundColor = "rgb(122, 141, 228)";
    }
}

function readytosendmail() {
    if (document.getElementById("send_code").style.backgroundColor == "rgb(64, 93, 230)") {
        sendEmail(document.getElementById("field").value);
    }
}

function sendEmail(mail_add) {
    console.log("Sending mail to backend..");
    var code = gernateCode();
    console.log("Code : " + code);
    window.location.replace("http://localhost:3000/passforget?mail=" + mail_add + "&code=" + code);
}

function gernateCode() {
  var text = "";
  var possible = "AB8CD0E9FG1HI2JK3LM4NO5PQ6RS7TUVWXY8Z9";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


/*Check email is valid or not */
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}