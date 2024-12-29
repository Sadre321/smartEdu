const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");

exports.getCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        const search = req.query.search || "";
        const filter = {};

        if (categorySlug) {
            const category = await Category.findOne({ slug: categorySlug });
            if (!category) {
                return res.status(404).json({ status: 'error', message: 'Category not found' });
            }
            filter.category = category._id;
        }

        if (search) {
            filter.name = { $regex: new RegExp(search, 'i') };
        }

        const courses = await Course.find(filter).sort("-createdAt");
        const categories = await Category.find();

        res.status(200).render('courses', {
            page_name: 'course',
            courses,
            categories
        });
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching courses' });
    }
};

exports.getCourseDetails =async(req,res)=>{
    try{
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({slug:req.params.slug}).populate("user");
        res.status(200).render("course",{
            page_name:"course",
            course,
            user
        });

        console.log(course);
    }catch(err){
        res.status(400).json({
            status:"error",
            err
        })
    }
}

// Export the model and the function to create a course
exports.createCourses = async (req, res) => {
        try {
            const course = await Course.create({...req.body,user:req.session.userID});
            res.status(201).redirect("/course")
        } catch (err) {
            res.status(400).json({
                status: "error",
                error: err.message // Returning only the error message
            });
        }
    }


// Export the model and the function to create a course
exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.push({_id:req.body.course_id});
        await user.save();

        req.flash("success","Egitim Basari ile eklendi");
        res.status(200).redirect('/auth/dashboard');
    } catch (err) {
        req.flash("success","Egitim eklenirken bi hata ile karsilasildi",err);
        res.status(400).redirect('/auth/dashboard');
    }
}

exports.relaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({_id: req.body.course_id});
        await user.save();

        res.status(200).redirect('/auth/dashboard');
    } catch (err) {
        res.status(400).json({
            status: "error",
            error: err.message // Sadece hata mesajını döndürüyoruz
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ slug: req.params.slug });

        if (!course) {
            req.flash("error", "Course not found");
            return res.status(404).redirect('/auth/dashboard');
        }

        req.flash("success", `${course.name} has been removed successfully`);
        res.status(200).redirect('/auth/dashboard');
    } catch (error) {
        console.error(error); // Hata ayıklama için konsola yazdır
        req.flash("error", "An error occurred while removing the course");
        res.status(500).redirect('/auth/dashboard');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate({ slug: req.params.slug },req.body);

        if (!course) {
            req.flash("error", "Course not found");
            return res.status(404).redirect('/auth/dashboard');
        }

        req.flash("success", `${course.name} has been updated successfully`);
        res.status(200).redirect('/auth/dashboard');
    } catch (error) {
        console.error(error); // Hata ayıklama için konsola yazdır
        req.flash("error", "An error occurred while updating the course");
        res.status(500).redirect('/auth/dashboard');
    }
};
