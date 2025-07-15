function getComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    return comments;
}


function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}


function renderComments() {
    const comments = getComments();
    const commentSection = document.getElementById('commentSection');
    commentSection.innerHTML = '<h3>FeedBack Yang Diterima</h3>'; 

    comments.forEach((comment, index) => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.setAttribute('data-id', index); 

        newComment.innerHTML = `
            <div class="author">${comment.nama} (${comment.email})</div>
            <div class="text">${comment.komentar}</div>
            <div class="action-buttons">
                <button onclick="editComment(${index})">Edit</button>
                <button onclick="deleteComment(${index})">Hapus</button>
            </div>
        `;
        
        commentSection.appendChild(newComment);
    });
}


document.getElementById('formKomentar').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const komentar = document.getElementById('komentar').value;

    const newComment = { nama, email, komentar };

    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);

    renderComments(); 

    
    document.getElementById('nama').value = '';
    document.getElementById('email').value = '';
    document.getElementById('komentar').value = '';
});


function deleteComment(index) {
    const comments = getComments();
    comments.splice(index, 1);
    saveComments(comments);
    renderComments();
}

function editComment(index) {
    const comments = getComments();
    const comment = comments[index];

    document.getElementById('nama').value = comment.nama;
    document.getElementById('email').value = comment.email;
    document.getElementById('komentar').value = comment.komentar;

    comments.splice(index, 1);
    saveComments(comments);

    renderComments(); 
}

renderComments();