document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("field").value = "";
    document.getElementById("pass_field").value = "";
    document.getElementById("name_field").value = "";
    document.getElementById("username_field").value = "";
    document.getElementById("show_hide").style.display = "none";
    document.getElementById("check_icon2").style.display = "none";
    document.getElementById("check_icon1").style.display = "none";
    document.getElementById("check_icon3").style.display = "none";
    document.getElementById("check_icon4").style.display = "none";
    document.getElementById("load_icon").style.display = "none";
    document.getElementById("error").innerText = "";
});

async function add_account() {
    if (document.getElementById("signup_btn").style.backgroundColor === "rgb(64, 93, 230)") {
        if (document.getElementById("load_icon").style.display === "block") {
            console.log("ok");
            return;
        }

        var data = await await database.collection('UserData').where("Profile.Email", "==", document.getElementById("field").value);
        data = await data.get();
        let isalreadyexist = 0;
        await data.forEach(doc => {
            isalreadyexist = 1;
        });

        if (isalreadyexist == 0) {
            document.getElementById("load_icon").style.display = "block";
            document.getElementById("signup_btn").value = "";

            var ProfilePic = "http://localhost:3000/image/icons/user.png";
            var Profileimge_url = sessionStorage.getItem("ProfilePic");
            if (Profileimge_url != null && Profileimge_url.length > 0) {
                ProfilePic = Profileimge_url;
            }

            var user_Data = {
                Profile: {
                    Full_Name: document.getElementById("name_field").value,
                    Username: document.getElementById("username_field").value,
                    Email: document.getElementById("field").value,
                    Password: document.getElementById("pass_field").value,
                    ProfilePicUrl:ProfilePic
                }
            };
            console.log(user_Data);
            await database.collection('UserData').doc(document.getElementById("username_field").value).set(user_Data).catch((err) => {
                console.error("Error adding document: ", error);
            });
            window.location.replace("http://localhost:3000/?username=" + document.getElementById("username_field").value);
        } else {
            document.getElementById("error").innerText = "account already exists!";
        }
    }
}

function typing() {
    document.getElementById("error").innerText = "";
    if (document.getElementById("check_icon1").style.display === "block") {
        if (document.getElementById("check_icon3").style.display === "none") {
            reset_signup_btn();
            return;
        }
        if (document.getElementById("username_field").value.length <= 0) {
            reset_signup_btn();
            return;
        }
        if (document.getElementById("pass_field").value.length > 0) {
            if (document.getElementById("name_field").value.length > 0) {
                // Typed Data is correct
                // we can proceed to database
                document.getElementById("signup_btn").style.backgroundColor = "#405de6";
            } else {
                reset_signup_btn();
            }
        } else {
            reset_signup_btn();
        }
    } else {
        reset_signup_btn();
    }
}

function reset_signup_btn(){
    document.getElementById("signup_btn").style.backgroundColor = "rgb(122, 141, 228)";
    document.getElementById("signup_btn").value = "Sign up";
    document.getElementById("load_icon").style.display = "none";
}

function pass_show_hide() {
    let pass = document.getElementById("pass_field").value;
    if (pass.length > 0) {
        document.getElementById("show_hide").style.display = "block";
    } else {
        document.getElementById("show_hide").style.display = "none";
    }
}

function show_hide_func() {
    if (document.getElementById("pass_field").type === "password") {
        document.getElementById("pass_field").type = "text";
        document.getElementById("show_hide").innerText = "Hide";
    } else {
        document.getElementById("pass_field").type = "password";
        document.getElementById("show_hide").innerText = "Show";
    }
}

function check_email() {
    let email = document.getElementById("field").value;
    if (email.length > 0) {
        const output = validateEmail(email);
        //console.log("email : " + email + " : " + output);
        if (output != 0) {
            document.getElementById("check_icon1").style.display = "block";
            document.getElementById("check_icon2").style.display = "none";
        } else {
            document.getElementById("check_icon2").style.display = "block";
            document.getElementById("check_icon1").style.display = "none";
        }
    } else {
        document.getElementById("check_icon2").style.display = "none";
        document.getElementById("check_icon1").style.display = "none";
    }
}

/* Must be replace while uploading */
function goto_login() {
    window.location.replace("http://localhost:3000/login");
}

/*Check email is valid or not */
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}