document.addEventListener('DOMContentLoaded', async () => {
    await update_posts();
});

function pstdlt_btn(post) {
    post.parentNode.innerHTML += "<CENTER><img style=\"margin-top:15px;\" src=\"/image/icons/loadingBLACK.jpg\" width=25px height=25px id=\"loading_icon\"></CENTER>";

    database.collection("GlobalPOST").doc(getUsername() + post.name).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    // Create a reference to the file to delete
    var desertRef = firebase.storage().ref('GlobalPOST_Images/' + getUsername() + post.name);
    // Delete the file
    desertRef.delete().then(() => {
        console.log("Done");
    }).catch((error) => {
        console.log(error);
    });

    update_posts();
}

async function update_posts() {
    const post_ele = document.getElementById("postTAB");
    post_ele.innerHTML = "<CENTER><img style=\"margin-top:15px;\" src=\"/image/icons/loadingBLACK.jpg\" width=25px height=25px id=\"loading_icon\"></CENTER>";

    var post = await database.collection("GlobalPOST").where("Username","==",getUsername());
    post = await post.get();
    
    let postHTML = "<u><div style=\"font-family: 'Indie Flower', cursive;text-shadow:1.5px 1.2px gray;font-weight:800;font-size:35px\">Your Posts</div></u>";
    let isNull = 0;
    post.forEach(element => {
        let post_data = element.data();
        isNull = 1;
        postHTML += "<div id=\"post_object\">";
        postHTML += "<div align=\"CENTER\" id=\"post_object_img\"><img src=\"" + post_data.img_url;
        postHTML += "\" width=\"250px\" height=\"250px\"></div>";
        postHTML += "<span style=\"font-size:12px;user-select:text;margin:2px 0px 0px 5px;\">" + post_data.text + "</span>";
        postHTML += "<div><input type=\"button\" id=\"pstdlt_btn\" name=\"" + new Date(post_data.timestamp.seconds * 1000) + "\" value=\"Delete post\" onclick=\"pstdlt_btn(this)\"></div>";
        postHTML += "</div>";
    });

    if (isNull == 0) {
        postHTML = "No post here! Navigate to Create a post.";
    }

    post_ele.innerHTML = postHTML;
}