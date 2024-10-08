import mongoose from 'mongoose';
import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentModel.js';

// @desc    Get all courses using pagination
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        const pageSize = Number(req.query.size) || 10;
        const page = Number(req.query.pageNumber) || 1;
        const filters = {
            ...(req.query.title && {
                title: { $regex: req.query.title, $options: 'i' },
            }),
            ...(req.query.category && {
                category: { $regex: req.query.category, $options: 'i' },
            }),
            ...(req.query.difficulty && {
                difficulty: { $regex: req.query.difficulty, $options: 'i' },
            }),
            ...(req.query.instructor && {
                instructor: { $regex: req.query.instructor, $options: 'i' },
            }),
        }
        const sortOption = "-"+(req.query.sortBy || 'createdAt');
        const count = await Course.countDocuments({ ...filters });
        const courses = await Course.find({ ...filters })
                .sort(sortOption)
                .limit(pageSize)
                .skip(pageSize * (page - 1));
                
        res.status(200).json({ courses, totalAmount: count, page, totalPages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private (Instructor)
const createCourse = async (req, res) => {
    try {
        const { title, description, category, difficulty } = req.body;
        if (!title || !description || !category || !difficulty) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        
        const course = new Course({
            title,
            description,
            category,
            difficulty,
            instructor: {
                id: req.user._id,
                name: req.user.name
            },
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Instructor)
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const instructorId = new mongoose.Types.ObjectId(course.instructor.id);

        if (instructorId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this course' });
        }
        Object.assign(course, req.body);
        course.updatedAt = Date.now();
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor)
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const instructorId = new mongoose.Types.ObjectId(course.instructor.id);

        if (instructorId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this course' });
        }

        await course.deleteOne();
        await Enrollment.deleteMany({ courseId: req.params.id });
        res.status(204).json({ message: 'Course removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private (Student)
const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const enrollment = await Enrollment.findOne({ courseId: req.params.id, studentId: req.user._id });
        if (enrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }
        const newEnrollment = await Enrollment.create({ courseId: req.params.id, studentId: req.user._id });
        course.students.push(req.user._id);
        await course.save();
        res.status(201).json(newEnrollment);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Review a course
// @route   POST /api/courses/:id/review
// @access  Public but must be authenticated
const reviewCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const enrollment = await Enrollment.findOne({ courseId: req.params.id, studentId: req.user._id });
        if (!enrollment) {
            return res.status(400).json({ message: 'Not enrolled in this course' });
        }
        const review = course.reviews.find(review => review.user.toString() === req.user._id.toString());
        if (review) {
            return res.status(400).json({ message: 'Already reviewed this course' });
        }
        course.reviews.push({ user: req.user._id, username: req.user.name, ...req.body });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createCourse, deleteCourse,
    enrollCourse, getCourseById, getCourses, reviewCourse, updateCourse
};



// to sort
// const { sort } = req.query;

// const sortBy = {};
// if (sort) sortBy[sort] = 1; // sort by ascending order

// const courses = await Course.find(filter)
//   .sort(sortBy)
//   .skip((page - 1) * limit)
//   .limit(parseInt(limit));
// This would allow you to sort by fields like createdAt, title, etc.



// const reviewCourse = async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }
//         const review = course.reviews.find(r => r.user.toString() === req.user._id.toString());
//         if (review) {
//             return res.status(400).json({ message: 'Already reviewed this course' });
//         }
//         course.reviews.push({ user: req.user._id, ...req.body });
//         await course.save();
//         res.json(course);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
