document.addEventListener('DOMContentLoaded', async () => {
    var userFIELD = document.getElementById("profileTABtitle");
    var userPROFILE = document.getElementById("userProfilePicIMG");

    var username = getUsername();
    var data = await database.collection('UserData').where('Profile.Username', '==', username);
    data = await data.get();

    await data.forEach((doc) => {
        userFIELD.innerText = username;
        userPROFILE.src = doc.data().Profile.ProfilePicUrl;
    });
});

function getUsername() {
    var username = window.location.search.split('=')[1];

    if (username == null || username.length == 0) {
        console.log("User not logged in.");
    }

    return username;
}