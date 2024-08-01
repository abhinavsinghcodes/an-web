const addComment = () => {
    const commentText = document.getElementById('comment').value.trim();
    const username = JSON.parse(localStorage.getItem('currentUser'));

    if (commentText && username) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({
            username,
            comment: commentText,
            timestamp: new Date().toISOString(),
            id: (comments.length + 1).toString()
        });
        localStorage.setItem('comments', JSON.stringify(comments));
        document.getElementById('comment').value = '';
        loadComments();
    } else {
        alert('Comment and username are required.');
    }
};

const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    document.getElementById('comment-list').innerHTML = comments.map(c => `
        <div class="comment-item">
            <div class="comment-username">${c.username}</div>
            <div>${c.comment}</div>
            <div class="comment-time">${new Date(c.timestamp).toLocaleString()}</div>
        </div>
    `).join('');
};
