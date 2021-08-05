function generateBlog(){

    // acquiring the dom elements from the form that will be used to generate the blogs
    // i.e. title, article, image url
    let title = document.getElementById("title").value;
    let article = document.getElementById("article").value;
    let imgurl = document.getElementById("image").value;
    
    // all of our blogs will be under this div element "blogs"
    const blogs = document.getElementById("blogs");

    // each individual blog will have its seperate div tag and will be child elements of "blogs"
    const blog = document.createElement('div');
    // adding bootstrap css styling to make it look nice
    blog.classList.add('card');
    blog.style.width = "18rem";

    // js code to generate our image for the blogs
    const img = document.createElement('img');
    img.src = imgurl;
    img.classList.add('card-img-top');

    // the "blogbody" div element will contain the title and text of the blogs
    // and it will be a child of "blog", not "blogs"
    const blogbody = document.createElement('div');
    blogbody.classList.add('card-body');

    // creating the title element for 'blogbody'
    const blogTitle = document.createElement('h5');
    blogTitle.classList.add('card-title');
    blogTitle.innerHTML = title;

    // creating the text element for 'blogbody'
    const blogText = document.createElement('p');
    blogText.classList.add('card-text');
    blogText.innerHTML = article;

    // the blogbody is generated. i.e. the title and text of the blog
    blogbody.appendChild(blogTitle);
    blogbody.appendChild(blogText);

    // now the blog is generated with the image and the blog body
    blog.appendChild(img);
    blog.appendChild(blogbody);

    // after the entire blog has been created, we append it to "blogs", the main div container for all of our blog posts
    blogs.appendChild(blog);


    // clearing the form so that the user can input new blog information without having to mannually erase the old blog's info
    document.getElementById("title").value = '';
    document.getElementById("article").value = '';
    document.getElementById("image").value = '';
}




