const nodemailer = require("nodemailer");

exports.getHomePage = (req,res)=>{
    console.log(req.session.userID);
    res.status(200).render("index",{page_name:"home"});
}

exports.getAboutPage = (req,res)=>{
    res.status(200).render("about",{page_name:"about"});
}

exports.getRegisterPage = (req,res)=>{
    res.status(201).render("register",{page_name:"register"});
}

exports.getLoginPage = (req,res)=>{
    res.status(201).render("login",{page_name:"login"});
}

exports.getContactPage = (req,res)=>{
    res.status(201).render("contact",{page_name:"contact"});
}

exports.postContact = async(req,res)=>{
    // try{
    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.ethereal.email",
    //         port: 587,
    //         secure: false, // true for port 465, false for other ports
    //         auth: {
    //           user: "haydaremre31@gmail.com",
    //           pass:"Sad_re.321"
    //         },
    //       });
    
    //       // send mail with defined transport object
    //     const info = await transporter.sendMail({
    //         from: '"Smart Edu Contact Form " <haydaremre31@gmail.com>', // sender address
    //         to: "zhs25995@dcobe.com", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         html: req.body.comments, // html body
    //     });
    
    //     res.redirect("/contact")
    //     console.log("Message sent: %s", info.messageId);
    // }catch(err){
    //     console.log(err);
    // }
}