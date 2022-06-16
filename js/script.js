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
                    <div class="col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h6 id="post-title">${post.title}</h6>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-warning">Update</button>
                                    <button class="btn btn-primary"><a href="post.html" class="text-light" style="text-decoration: none">View</a></</button>
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

postForm.addEventListener('submit', createPost)

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
            'Content-type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((data)=> {
        console.log(data)
        postBox.unshift(data);
        console.log(postBox)
        let postHolder = '';
        postBox.forEach(post => {
            postHolder += `
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h6 id="post-title">${post.title}</h6>
                            <p id="post-body">${post.body}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-warning">Update</button>
                                <button class="btn btn-primary"><a href="post.html" class="text-light" style="text-decoration: none">View</a></</button>
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

function updatePost() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}


// function deletePost(postId) {
//     console.log(postId)
//     fetch(`https://jsonplaceholder.typicode.com/posts/${ postId }`, {
//         method: 'DELETE',
//   })
//   .then((response) => response.json())
//   .then((data)=> {
//     console.log(data)
//     console.log(postBox)
//     postBox.splice((postId - 1), 1)
    //    console.log(postBox) 
    //    console.log('post', data) 
    //    let postHolder = '';
    //    postBox.forEach(post => {
    //        postHolder += `
    //            <div class="col-md-6 mb-3">
    //                <div class="card h-100">
    //                    <div class="card-body">
    //                        <h6 id="post-title">${post.title}</h6>
    //                        <p id="post-body">${post.body}</p>
    //                        <div class="d-flex justify-content-between">
    //                            <button class="btn btn-warning">Update</button>
    //                            <button class="btn btn-primary"><a href="post.html" class="text-light" style="text-decoration: none">View</a></</button>
    //                            <button class="btn btn-danger">Delete</button>
    //                        </div>
    //                    </div>
    //                </div>
    //            </div>
    //        `
    //    });
    //    postWrapper.innerHTML = postHolder;

//   }
//   deletePost();
// }


