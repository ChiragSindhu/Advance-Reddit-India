document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("search_field").value = "";
    getUserProfilePic(getUsername());
});

async function getUserProfilePic(username) {
    var user = await database.collection('UserData').where('Profile.Username', '==', username);
    user = await user.get();

    var picUrl = "";

    await user.forEach((doc) => {
        picUrl = doc.data().Profile.ProfilePicUrl;
    });

    document.getElementById("username_id").innerHTML = "<img  ALIGN=\"left\" id=\"userPP\" src=\"" + picUrl + "\" width=18px height=18px> @" + username;
}

function myprofile() {
    window.location.replace("http://localhost:3000/profile?username=" + getUsername());
}

function createpost(){
    window.location.replace("http://localhost:3000/createpost?username=" + getUsername());
}

function logout() {
    window.location.replace("http://localhost:3000/login");
}

function getUsername() {
    var username = window.location.search.split('=')[1];

    if (username == null || username.length == 0) {
        console.log("User not logged in.");
    }

    return username;
}

/* May be chnage */
function homepage() {
    window.location.replace("http://localhost:3000?username=" + getUsername());
}
