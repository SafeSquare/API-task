

let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')

let postBox = [];

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            postBox = data;
            console.log(postBox)
            let postHolder = '';
            postBox.forEach(post => {
                postHolder += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <p class="text-end text-danger">post ${post.id}</p>
                                <h6 id="post-title">${post.title}</h6>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary">Update</button>
                                    <button class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            postWrapper.innerHTML = postHolder;
        })        
}
getPosts();

postForm.addEventListener('submit', createPost);

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data)=> {
        console.log(data)
        postBox.push(data);
        console.log(postBox)
        let postHolder = '';
        postBox.forEach(post => {
            postHolder += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <p class="text-end text-danger">post ${post.id}</p>
                            <h6 id="post-title">${post.title}</h6>
                            <p id="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-primary">Update</button>
                                <button class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        });
        postWrapper.innerHTML = postHolder;
    })
}
createPost();

function deletePost(e) {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
  })
  }
  deletePost();
  
  function updatePost(e) {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({
      id: 2,
      title: title.value,
      body: body.value,
      userId: 2,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
    // alert('Post Updated!')
  }
  updatePost();
// let formTitle = document.querySelector('#form-title');
// let formPost = document.querySelector('#form-post');
// let formSection = document.querySelector('#form-section');


// formSection.addEventListener('submit', createPost);

// let postEdit = [];

// function getPosts() {
//   fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((data) => {
//           console.log(data)
//           let postWrapper = document.querySelector('#post-edits');
//           postBox = data
//           let postHolder = '';
//           postBox.forEach(post => {
//               postHolder += `
//                   <div class="col-md-4 mb-3">
//                       <div class="card h-100">
//                           <div class="card-body">
//                               <h6 id="post-title">${post.title}</h6>
//                               <p id="post-body">${post.body}</p>
//                               <div class="d-flex justify-content-between">
//                                   <button class="btn btn-primary">Update</button>
//                                   <button class="btn btn-danger">Delete</button>
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//               `
//           });
//           postWrapper.innerHTML = postHolder;
//       })     
// }
// getPosts();



