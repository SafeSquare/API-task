let postWrapper = document.querySelector("#post-holder");
let postForm = document.querySelector("#post-form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");

let postBox = [];

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log(postBox);
      postBox = data;
      renderUI(postBox);
    });
}
getPosts();

postForm.addEventListener("submit", createPost);

function createPost(e) {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      userId: 2,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      postBox.unshift(data);
      console.log(postBox);
      let postHolder = "";
      postBox.forEach((post) => {
        postHolder += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 class="post-title">${post.title}</h6>
                            <p class="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between">
                            <button class="btn btn-warning" id="view-btn" onclick="openSingle(${post.id})">view</button>
                                <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                                <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      });
      postWrapper.innerHTML = postHolder;
    });
}
createPost();

function updatePost(id) {
  console.log(id);

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: title.value,
      body: body.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let postTitles = document.querySelectorAll(".post-title");
      let postBodies = document.querySelectorAll(".post-body");
      console.log(postTitles);
      postTitles.forEach((postTitle, index) => {
        if (index + 1 === id) {
          if (data.title !== "") {
            postTitle.innerHTML = data.title;
          }
        }
      });

      postBodies.forEach((postBody, index) => {
        if (index + 1 === id) {
          if (data.body !== "") {
            postBody.innerHTML = data.body;
          }
        }
      });
    });
}
updatePost();

function openSingle(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("viewedPost", JSON.stringify(data));
      window.location.href = "post.html";
    });
}
openSingle(id);

function deletePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      postBox = postBox.filter((post) => post.id !== id);
      console.log(postBox);
      renderUI(postBox);
    });
}
deletePost(id);

function renderUI(arr) {
  let postHolder = "";
  arr.forEach((post) => {
    postHolder += `
                    <div class="col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                              <h6 class="post-title">${post.title}</h6>
                              <p class="post-body">${post.body}</p>
                            </div>
                            <div class="d-flex justify-content-around mb-5">
                            <button class="btn btn-warning" id="view-btn" onclick="openSingle(${post.id})">Update</button>
                            <button class="btn btn-primary"><a href="#" class="text-light" style="text-decoration: none">View</a></</button>
                            <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                          </div>
                        </div>
                    </div>
                `;
  });
  postWrapper.innerHTML = postHolder;
}
renderUI(arr);
