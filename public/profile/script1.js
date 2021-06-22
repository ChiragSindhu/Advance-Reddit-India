document.addEventListener('DOMContentLoaded', async () => {
    hide_floater();
    var userFIELD = document.getElementById("profileTABtitle");
    var userPROFILE = document.getElementById("userProfilePicIMG");
    var emailFIELD = document.getElementById("email_field");
    var passwordFIELD = document.getElementById("password_field");

    var username = getUsername();
    var data = await database.collection('UserData').where('Profile.Username', '==', username);
    data = await data.get();

    await data.forEach((doc) => {
        userFIELD.innerText = username;
        emailFIELD.value = doc.data().Profile.Email;
        passwordFIELD.value = doc.data().Profile.Password;
        userPROFILE.src = doc.data().Profile.ProfilePicUrl;
    });
});

function viewPP() {
    var pic = document.getElementById("userProfilePicIMG").src;
    window.open(pic); 
}

function hide_floater(Emouse) {
    if (Emouse == null) {
        document.getElementById("change_PPfloaters").style.display = "none";
        return;
    }

    if (Emouse.target.id != "headerfloater" && Emouse.target.id != "change_PPfloaterstitle") {
        setTimeout(() => {
            document.getElementById("change_PPfloaters").style.display = "none";
        },300)
    }
}

function show_floater() {
    document.getElementById("change_PPfloaters").style.display = "block";
    document.getElementById("change_PPfloaters").style.animationName = "transFloater";
    document.getElementById("change_PPfloaters").style.animationDuration = "0.3s";
    document.getElementById("change_PPfloaters").style.animationIterationCount = "1";
    document.getElementById("change_PPfloaters").style.animationFillMode = "Forwards";
}

async function updatePP() {
    var file = document.getElementById("pp_file").files[0];

    var storageRef = firebase.storage().ref('/UserDataProfilePic/' + getUsername());
    
    await storageRef.put(file).on('state-changed', (snapshot) => {
        //console.log(Math.round(100 * (snapshot.bytesTransferred / snapshot.totalBytes)));
            
        if (snapshot.bytesTransferred == snapshot.totalBytes) {
            snapshot.ref.getDownloadURL().then((url) => {
                //console.log(url);
                updateProfilePic2(url);
            });
        }
    });
}

async function updateProfilePic2(PPlink) {
    await database.collection('UserData').doc(getUsername()).update({
        "Profile.ProfilePicUrl": PPlink
    }).then(() => {
        window.location.reload();
    });
}

function changePass() {
    window.location.replace("http://localhost:3000/resetpassword?mail=" + document.getElementById("email_field").value + "&code=XNXX&auth=" + getUsername());
}