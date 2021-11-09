const tasksDOM = document.querySelector('.tasks');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// get tasks from /api/v1/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible';
  try {
    // get the data from the api
    const { data } = await axios.get('/api/v1/tasks');
    let tasks = data.tasks;

    // if there is no data
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = 'hidden';
      return;
    }

    // html creation
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">

<!-- edit link -->
<a href="task.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`;
      })
      .join('');
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = 'hidden';
};

showTasks();

// delete task using /api/tasks/id
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible';
    // get the id from the element corresponding to the btn
    const id = el.parentElement.dataset.id;
    try {
      // delete the data drom the api
      await axios.delete(`/api/v1/tasks/${id}`);
      // get the data and display it
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = 'hidden';
});

// post task to /api/v1/tasks using the name from the input
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    // post the data to the api usign the name from the input
    await axios.post('/api/v1/tasks', { name });
    // get the data and display it
    showTasks();
    taskInputDOM.value = '';
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
