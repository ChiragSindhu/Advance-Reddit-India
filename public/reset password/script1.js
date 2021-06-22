document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("code").value = "";
    var code = window.location.search.split('=');
    console.log(code);
    code = code[2].split('&')[0];
    console.log(code);

    if (code == "XNXX") {
        document.getElementById("label1").innerText = "Re-Type Password";
        document.getElementById("code").value = "";
        document.getElementById("check_code").value = "Set Password";
        document.getElementById("title2").innerHTML = "<span id=\"cap\">N</span>ew <span id=\"cap\">P</span>assword";
    }
});

function typing() {
    if (document.getElementById("label1").innerText != "Re-Type Password") {
        var string = document.getElementById("code").value;
        if (string.length > 5) {
            document.getElementById("check_code").style.backgroundColor = "#405de6";
        } else {
            document.getElementById("check_code").style.backgroundColor = "rgb(122, 141, 228)";
        }
    } else {
        var string = document.getElementById("code").value;
        if (string.length > 0) {
            document.getElementById("check_code").style.backgroundColor = "#405de6";
        } else {
            document.getElementById("check_code").style.backgroundColor = "rgb(122, 141, 228)";
        }
    }
}

function checkcode() {
    if (document.getElementById("label1").innerText != "Re-Type Password") {
        if (document.getElementById("check_code").style.backgroundColor === "rgb(64, 93, 230)") {
            var code = window.location.search.split('=');
            code = code[2].split('&')[0];
            //console.log(mail + " : " + code);

            if (document.getElementById("code").value == code) {
                document.getElementById("label1").innerText = "Re-Type Password";
                document.getElementById("code").value = "";
                document.getElementById("check_code").value = "Set Password";
                document.getElementById("title2").innerHTML = "<span id=\"cap\">N</span>ew <span id=\"cap\">P</span>assword";
            }
        }
    } else {
        change_ondatabase();
    }
}

async function change_ondatabase() {
    var mail = window.location.search.split('=');
    mail = mail[1].split('&')[0];

    console.log(mail);

    var data = database.collection('UserData').where("Profile.Email", "==", mail);
    data = await data.get();

    var found = 0;

    await data.forEach(async (doc) => {
        console.log(doc.data());
        found = 1;
        await database.collection('UserData').doc(doc.data().Profile.Username).update({
            "Profile.Password":document.getElementById("code").value
        }, { merge: true }).then(() => {
            var code = window.location.search.split('=');
            code = code[2].split('&')[0];
            if (code == "XNXX") {
                var username = window.location.search.split('=');
                username = username[3];
                window.location.replace('http://localhost:3000/profile?username=' +  username);
            }
            else
                window.location.replace('http://localhost:3000/login');
            
            return;
        });
    });

    if(found == 0)
        window.location.replace('http://localhost:3000/signup');
}
