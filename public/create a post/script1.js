document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('progress_bar').style.display = "none";
    document.getElementById('loading_icon').style.display = "none";
    document.getElementById('uplphoid').value = "";
});

function insert_file(element) {
    var file = element.files[0];
    document.getElementById("upload_photo_title").innerText = file.name;
}

async function post_img() {
    if (document.getElementById('loading_icon').style.display == "block") {
        console.log("I already know that!");
        return;
    }
    var file = document.getElementById('uplphoid').files;
    var username = window.location.search.split('=')[1];

    if (username == null || username.length == 0) {
        console.log("User not logged in.");
        return;
    }

    if (file.length > 0) {
        file = file[0];
        document.getElementById('progress_bar').style.display = "block";
        document.getElementById('post_btn').style.backgroundColor = "rgb(128, 22, 22)";
        document.getElementById('post_btn').value = "";
        document.getElementById('loading_icon').style.display = "block";
        let timeStamp = new Date();
        var storageRef = await firebase.storage().ref('/GlobalPOST_Images/' + username + timeStamp);
        
        storageRef.put(file).on('state-changed', (snapshot) => {
            
            var percent_uploaded = Math.round(100 * (snapshot.bytesTransferred / snapshot.totalBytes));
            document.getElementById('progress_title').innerText = percent_uploaded + "%";
            document.getElementById('progress_bar').style.width = Math.round(percent_uploaded/1.25) + "%";
            
            if (snapshot.bytesTransferred == snapshot.totalBytes) {
                snapshot.ref.getDownloadURL().then((url) => {
                    console.log("Img uploaded!");
                    post_subject(username,url,timeStamp);
                });
            }
        });
    } else {
        console.log("You must have a image");
    }
}

/* May be chnage */
function homepage() {
    window.location.replace('http://localhost:3000/' + window.location.search);
}

async function post_subject(username,url,time) {
    var text = document.getElementById("textfield").value;

    var post_data = {
        Username: username,
        img_url: url,
        timestamp: time,
        text: text,
        likes: 0,
        dislikes: 0,
        likesData: {},
        comments: {}
    };

    await database.collection('GlobalPOST').doc(username + time).set(post_data);
   
    homepage();
}

function post_btn_hover(element) {
    if (document.getElementById('loading_icon').style.display == "block") return;
    if (document.getElementById('uplphoid').files.length == 0) return;
    element.style.boxShadow = "0.1px 0.1px 0.1px 5px rgb(247, 211, 217)";
}

function post_btn_nothover(element) {
    element.style.boxShadow = "";
}

function make_style(code) {
    let field = document.getElementById("textfield");

    var start = field.selectionStart;
    var finish = field.selectionEnd;
    console.log(start + " : " + finish);
    var userSelection = field.value.substring(start, finish);
        
    if (userSelection.length == 0) {
        console.log("Please select some text");
        return;
    }

    if (code.value == "Bold") 
        field.value = field.value.substring(0, start) + "<b>" + field.value.substring(start, finish) + "</b>" + field.value.substring(finish);
    else if (code.value == "Italic")
        field.value = field.value.substring(0, start) + "<i>" + field.value.substring(start, finish) + "</i>" + field.value.substring(finish);
    else if (code.value == "Underline")
        field.value = field.value.substring(0, start) + "<u>" + field.value.substring(start, finish) + "</u>" + field.value.substring(finish);
    else if (code.value == "Superscript")
        field.value = field.value.substring(0, start) + "<sup>" + field.value.substring(start, finish) + "</sup>" + field.value.substring(finish);
    else if (code.value == "Subscript")
        field.value = field.value.substring(0, start) + "<sub>" + field.value.substring(start, finish) + "</sub>" + field.value.substring(finish);
    else
        console.log("Code is wrong!!");
}