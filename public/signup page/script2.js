function check_username_availibilty() {
    reset1();
    typing();
    const username = document.getElementById("username_field").value;
    if (username.length > 0) {
        setTimeout(() => {
            //console.log(username + " : " + document.getElementById("username_field").value);
            if (username == document.getElementById("username_field").value) {
                retrive_data(username);
            }
        }, 500);
    } 
}

async function retrive_data(username) {
    //console.log("making call..");
    let is_avail = true;
    let data = await database.collection('UserData').where("Profile.Username", "==", username);
    data = await data.get();
    await data.forEach(doc => {
        document.getElementById("check_icon3").style.display = "none";
        document.getElementById("check_icon4").style.display = "block";

        is_avail = false;
    });

    if (is_avail) {
        document.getElementById("check_icon3").style.display = "block";
        document.getElementById("check_icon4").style.display = "none";
    }
    typing();
}

function reset1() {
    document.getElementById("check_icon3").style.display = "none";
    document.getElementById("check_icon4").style.display = "none";
}

/*Check username is valid or not */
function validateUsername(key)
{
    if ((/\W/).test(key.data)) {
        console.log("Only alphbets and numbers with '_' are allowed");
    } else {
        return;
    }
    var string = document.getElementById("username_field").value;
    var string = string.replace(/\W/, "");
    document.getElementById("username_field").value = string;
}
