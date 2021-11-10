const createJob = (req, res) => {
  res.send('create job');
};

const getAllJobs = (req, res) => {
  console.log(req.user);
  res.send('get all jobs');
};

const getSingleJob = (req, res) => {
  res.send('get single job');
};

const updateJob = (req, res) => {
  res.send('update job');
};

const deleteJob = (req, res) => {
  res.send('delete job');
};

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
