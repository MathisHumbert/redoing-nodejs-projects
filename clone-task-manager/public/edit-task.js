const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
// get everything except the base url
const params = window.location.search;
// get only the text from id
const id = new URLSearchParams(params).get('id');
let tempName;

// get the data from a single task using the api /api/v1/tasks/*{id} and display it
const showTask = async () => {
  try {
    // get the data from the id in the url that we extracted
    const { data } = await axios.get(`/api/v1/tasks/${id}`);
    const task = data.tasks;

    const { _id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

// patch the data using the /api/v1/tasks/${id} and the changes from the input
editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading';
  e.preventDefault();

  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    // change the data using the name and the completed from the input
    const {
      data: { tasks },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });

    const { _id: taskID, completed, name } = tasks;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = 'Edit';
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
