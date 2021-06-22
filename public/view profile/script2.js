document.addEventListener('DOMContentLoaded', async () => {
    await update_posts();
});

async function update_posts() {
    const post_ele = document.getElementById("postTAB");
    post_ele.innerHTML = "<CENTER><img style=\"margin-top:15px;\" src=\"/image/icons/loadingBLACK.jpg\" width=25px height=25px id=\"loading_icon\"></CENTER>";

    var post = await database.collection("GlobalPOST").where("Username","==",getUsername());
    post = await post.get();
    
    let postHTML = "<u><div style=\"border-radius:5px;padding:2px;border:dashed 1px rgb(200,200,200);background-color:rgb(240,240,240);position:absolute;top:-2rem;left:50%;transform:translateX(-50%);font-family: 'Indie Flower', cursive;text-shadow:1.5px 1.2px gray;font-weight:800;font-size:35px\">Posts</div></u>";
    let isNull = 0;
    post.forEach(element => {
        let post_data = element.data();
        isNull = 1;
        postHTML += "<div id=\"post_object\">";
        postHTML += "<div align=\"CENTER\" id=\"post_object_img\"><img src=\"" + post_data.img_url;
        postHTML += "\" width=\"200px\" height=\"200px\"></div>";
        postHTML += "<span style=\"font-size:12px;user-select:text;margin:2px 0px 0px 5px;\">" + post_data.text + "</span>";
        postHTML += "</div>";
    });

    if (isNull == 0) {
        postHTML = "<CENTER>No post created by the user.</CENTER>";
    }

    post_ele.innerHTML = postHTML;
}