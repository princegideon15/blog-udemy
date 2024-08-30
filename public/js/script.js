document.addEventListener('DOMContentLoaded', () => {
    // Get all delete Blog
    const deleteBlog = document.querySelectorAll('.delete-blog');
  
    deleteBlog.forEach(blog => {
      blog.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default href behavior
  
        const itemId = this.getAttribute('data-id'); // Get the item id from the data attribute
  
        // Send a DELETE request using Fetch API
        fetch(`/delete/${itemId}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            alert(`Item ${itemId} deleted successfully.`);
            window.location.href = '/feed'
            // Optionally, remove the item from the DOM
          } else {
            alert('Failed to delete the item.');
          }
        })
        .catch(error => console.error('Error:', error));
      });
    });

    // Get all edit Blog
    const editBlog = document.querySelectorAll('.edit-blog');
  
    editBlog.forEach(blog => {
      blog.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default href behavior
        
        const itemId = this.getAttribute('data-id'); // Get the item id from the data attribute
        const modal = document.querySelector('.modal');
        modal.classList.add('is-active');
        
        fetch(`/get-blog-data/${itemId}`, {
          method: 'GET',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Item not found');
          }
          return response.json();
        })
        .then(data => {
          document.getElementsByName('id')[0].value = data['id'];
          document.getElementsByName('update_title')[0].value = data['title'];
          document.getElementsByName('update_content')[0].value = data['content'];
        })
        .catch(error => console.error('Error:', error));
      });
    });

    // Close modal
    const closeModal = document.querySelectorAll('.close-modal');
    
    closeModal.forEach(blog => {
      blog.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default href behavior
        const modal = document.querySelector('.modal');
        modal.classList.remove('is-active');
      });
    });

  });
  