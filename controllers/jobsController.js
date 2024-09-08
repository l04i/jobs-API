const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/');
const Job = require('../models/Job');


const getAllJobs = async (req, res) => {
    const userId = req.user.userId;

    const jobs = await Job.find({ createdBy: userId });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOne({ createdBy: userId, _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job found with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    await validateJobValues(req.body);

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {

    await validateJobValues(req.body);


    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOneAndUpdate({ createdBy: userId, _id: jobId }, req.body, { new: true });

    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Job.findOneAndDelete({ createdBy: userId, _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job });
}




module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };


const validateJobValues = async (reqbody) => {
    const { company, position } = reqbody
    if (!company) throw new BadRequestError('Please provide a company name')
    if (!position) throw new BadRequestError('Please provide a position')
}