function downloadVideo() {
    const urlInput = document.getElementById('url-input').value;
    if (!urlInput) {
        showToast('Please enter a TikTok URL');
        return;
    }

    const loadingModal = document.getElementById('loading-modal');
    loadingModal.style.display = 'flex';

    fetch(`/api/download?url=${encodeURIComponent(urlInput)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                const videoUrl = data.result.video;
                const musicUrl = data.result.music;
                const avatarUrl = data.result.author.avatar; 
                const nickname = data.result.author.nickname; 
                const caption = data.result.desc; 
                const likeCount = data.result.statistics.likeCount; 
                const commentCount = data.result.statistics.commentCount; 
                const shareCount = data.result.statistics.shareCount; 

                const resultContainer = document.getElementById('result-container');
                resultContainer.innerHTML = `
                    <div class="card">
                        <img class="avatar" src="${avatarUrl}" alt="Avatar">
                        <p><strong>${nickname}</strong></p>
                        <p>${caption}</p>
                        <p>Likes: ${likeCount}, Comments: ${commentCount}, Shares: ${shareCount}</p>
                    </div>
                `;

                const downloadVideoLink = document.getElementById('download-video');
                const downloadMusicLink = document.getElementById('download-music');
                downloadVideoLink.href = videoUrl;
                downloadMusicLink.href = musicUrl; 

                document.getElementById('download-links').style.display = 'block';
                downloadVideoLink.style.display = 'inline-block';
                downloadMusicLink.style.display = 'inline-block';
            } else {
                showToast('Failed to retrieve video. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to retrieve data');
        })
        .finally(() => {
            loadingModal.style.display = 'none';
        });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
