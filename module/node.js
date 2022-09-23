const User = require("../model/user")
const Admin = require("../model/admin")
const Product = require("../model/product")
const Createproduct = require("../model/createproduct")
const Adminproduct = require("../model/adminproduct")
const Contact = require("../model/contact")
const Cartupdate = require("../model/cartupdate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Mongoose = require('mongoose')
require('dotenv').config()

// to get user product datas

module.exports.getproductdetails = async (req, res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        try {
            userBlogs = await Product.findById(userId).populate("blogs");
        } catch (err) {
            return console.log(err);
        }
        if (!userBlogs) {
            return res.status(404).json({ message: "No Blog Found" });
        }
        return res.status(200).json({ user: userBlogs });
    }
    catch (err) {
        console.log(err)
    }

}

// to get admin product data

module.exports.getadmindata = async (req, res) => {
    try {

        const userBlogs = await Adminproduct.find()

        return res.status(200).json({ user: userBlogs })
    }
    catch (err) {
        console.log(err)
    }
}

// to update admin product data

module.exports.updateadmindata = async (req, res) => {
    const id = req.params.id
    const { Productcompany, Productprice, Quantity, TotalAMount, FromDate, ToDate } = req.body
    try {

        const userBlogs = await Adminproduct.findByIdAndUpdate(id,  { Productcompany, Productprice, Quantity,
             TotalAMount, FromDate, ToDate })

        return res.status(200).json({ user: userBlogs })
    }
    catch (err) {
        console.log(err)
    }
}

// to delete admin product data

module.exports.deleteadmindata = async (req, res) => {
    try {
        const name = await Adminproduct.findByIdAndDelete(req.params.id)
        if (name) {
            res.send(name)
            return res.send("deleted successfully")
        }
    }
    catch (err) {
        console.log(err)
    }
}

// to get total product count

module.exports.gettotalproductcount = async (req, res) => {
    const userId = req.params.id
    try {

        const userBlogs = await User.findById(userId)

        return res.status(200).json({ user: userBlogs.blogs })
    }
    catch (err) {
        console.log(err)
    }
}


// to get contact us details

module.exports.getcontactusdetails = async (req, res) => {
    try {
        const response = await Contact.find()
        res.send(response)
    }
    catch (err) {
        console.log(err)
    }
}

// to post product data

module.exports.postproductdata = async (req, res) => {

    try {

        const { name, user, ProductName, Productcompany, Productprice, Quantity, Hours, TotalAMount, FromDate, ToDate } = req.body

        if (name == "user") {
            try {
                let existingUser;
                try {
                    existingUser = await User.findById(user);
                } catch (err) {
                    return console.log(err);
                }
                if (!existingUser) {
                    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
                }

                const blog = new Product({
                    user,
                    ProductName,
                    Productcompany,
                    Productprice,
                    Quantity,
                    Hours,
                    TotalAMount, FromDate, ToDate
                });
                try {
                    const session = await Mongoose.startSession();
                    session.startTransaction();
                    await blog.save({ session });
                    existingUser.blogs.push(blog);
                    await existingUser.save({ session });
                    await session.commitTransaction();
                } catch (err) {
                    console.log(err);
                    return res.status(500).json({ message: err });
                }

                return res.status(200).json({ blog })
            }
            catch (err) {
                console.log(err)
            }
        }

        else if (name == "admin") {
            try {
                let existingUser;
                try {
                    existingUser = await Admin.findById(user);
                } catch (err) {
                    return console.log(err);
                }
                if (!existingUser) {
                    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
                }

                const admin = Adminproduct.create({
                    ProductName,
                    Productcompany,
                    Productprice,
                    Quantity,
                    Hours,
                    TotalAMount, FromDate, ToDate
                });
                return res.status(200).json(admin)
            }
            catch (err) {
                console.log(err)
            }
        }


    }
    catch (err) {
        console.log(err)
    }
}


// to post contact us data

module.exports.postcontactusdata = async (req, res) => {

    const { customername, customercontactno, productname } = req.body

    try {
        const response = await Contact.create({
            customername, customercontactno, productname
        })
        res.send(response)
    }
    catch (err) {
        console.log(err)
    }
}

// to update product data

module.exports.Updateproductdata = async (req, res) => {

    const { Productcompany, Productprice, Quantity, TotalAMount, FromDate, ToDate } = req.body

    const id = req.params.id

    try {

        const response = await Product.findByIdAndUpdate(id, {
            Productcompany, Productprice, Quantity, TotalAMount, FromDate, ToDate
        })
        res.send(response)
    }
    catch (err) {
        console.log(err)
    }
}

// to get cart details

module.exports.getcartdetails = async (req, res) => {

    const id = req.params.id

    try {
        const response = await Cartupdate.findById(id)
        res.send(response)
    }
    catch (err) {
        console.log(err)
    }
}

// to delete product data

module.exports.deleteproductdata = async (req, res) => {

    const id = req.params.id;

    let blog;
    try {
        blog = await Product.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
}

// to delete enquiry data

module.exports.deleteenquirydata = async (req, res) => {

    const id = req.params.id

    try {
        const response = await Contact.deleteOne({ id })
        res.send(response)
    }
    catch (err) {
        console.log(err)
    }
}

// Register

module.exports.userregister = async (req, res) => {

    // Our register logic starts here

    try {
        // Get user input
        const { Role, firstName, lastName, email, password } = req.body;

        if (Role == "User") {

            try {
                const oldUser = await User.findOne({ email });
                if (oldUser) {
                    return res.send("User Already Exist. Please Login");
                }

                //Encrypt user password
                encryptedUserPassword = await bcrypt.hash(password, 10);

                // Create user in our database
                const user = await User.create({
                    Role: Role,
                    first_name: firstName,
                    last_name: lastName,
                    email: email.toLowerCase(), // sanitize
                    password: encryptedUserPassword,
                    blogs: [],

                });

                // Create token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "5h",
                    }
                );
                // save user token
                user.token = token;

                // return new user
                res.status(201).json({ user, message: "Created" });
            }

            catch (err) {
                console.log(err);
            }
            // Our register logic ends here
        }

        else if (Role == "Admin") {

            try {
                const oldAdmin = await Admin.findOne({ email });
                if (oldAdmin) {
                    return res.send("Admin Already Exist. Please Login");
                }

                //Encrypt user password
                encryptedUserPassword = await bcrypt.hash(password, 10);

                // Create user in our database
                const admin = await Admin.create({
                    Role: Role,
                    first_name: firstName,
                    last_name: lastName,
                    email: email.toLowerCase(), // sanitize
                    password: encryptedUserPassword,

                });

                // Create token
                const token = jwt.sign(
                    { user_id: admin._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "5h",
                    }
                );
                // save user token
                admin.token = token;

                // return new user
                res.status(201).json({ admin, message: "Created" });
            }

            catch (err) {
                console.log(err);
            }
            // Our register logic ends here
        }

    }
    catch (err) {
        console.log(err);
    }

}

// Login

module.exports.userlogin = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { Role, email, password } = req.body;

        // if role is user

        if (Role == "user") {
            try {

                // Validate if user exist in our database
                const user = await User.findOne({ email });

                if (user && (await bcrypt.compare(password, user.password))) {
                    // Create token
                    const token = jwt.sign(
                        { user_id: user._id, email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "5h",
                        }
                    );

                    // save user token
                    user.token = token;

                    // user
                    return res.status(200).json({ user, message: "UserLoggedin" });
                }
                return res.send('Invalid');

                // Our login logic ends here
            }
            catch (err) {
                console.log(err)

            }
        }

        // if user is admin

        else if (Role == "admin") {
            try {

                // Validate if user exist in our database

                const admin = await Admin.findOne({ email });

                if (admin && (await bcrypt.compare(password, admin.password))) {
                    // Create token
                    const token = jwt.sign(
                        { user_id: admin._id, email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "5h",
                        }
                    );

                    // save user token
                    admin.token = token;

                    // user
                    return res.status(200).json({ admin, message: "AdminLoggedin" });
                }
                return res.send('Invalid');

                // Our login logic ends here
            }
            catch (err) {
                console.log(err)

            }
        }

    }
    catch (err) {
        console.log(err)
    }
}


// to get username

module.exports.username = async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email } = req.body;

        // Validate if user exist in our database

        const oldUser = await User.findOne({ email });

        return res.send(oldUser);

        // Our login logic ends here
    }

    catch (err) {
        console.log(err)
    }
};

// to get user by id

module.exports.userbyid = async (req, res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user: userBlogs });
};


// set new password 

module.exports.setnewpassword = async function (req, res) {

    try {

        // get user input

        const { Role, email, password } = req.body;

        // if role is user

        if (Role == "User") {

            try {

                // find user in db

                const NoUser = await User.findOne({ email });

                if (!NoUser) {
                    return res.send({ message: 'Not-user' });
                }

                // get id

                var _id = NoUser._id

                // hashing password

                encryptedUserPassword = await bcrypt.hash(password, 10);

                // update password

                const user1 = await User.findByIdAndUpdate({ _id }, { $set: { password: encryptedUserPassword } }, { returnNewDocument: true, new: true })

                return res
                    .status(200)
                    .json({ message: "User - Password changed", user1 });
            }
            catch (err) {
                console.log(err)

            }
        }

        // if role is admin

        if (Role == "Admin") {

            try {

                // find admin in db

                const NoAdmin = await Admin.findOne({ email });

                if (!NoAdmin) {
                    return res.send({ message: 'Not-admin' });
                }

                // get id

                var _id = NoAdmin._id

                // hashing password

                encryptedUserPassword = await bcrypt.hash(password, 10);

                // update password

                const admin = await Admin.findByIdAndUpdate({ _id }, { $set: { password: encryptedUserPassword } }, { returnNewDocument: true, new: true })

                return res
                    .status(200)
                    .json({ message: "Admin - Password changed", admin });
            }
            catch (err) {
                console.log(err)

            }
        }

    }
    catch (err) {
        console.log(err)
    }
}

// to get Quiz Question

module.exports.getproducts = async function (req, res) {
    try {
        const name = await Createproduct.find({})
        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)
    }
}

// to post new product

module.exports.createproducts = async function (req, res) {
    try {
        const { ProductName, Productcompany, Productprice, minHours,
            minPrice,
            image,
            Quantity,
            Hours,
            TotalAMount, } = req.body;

        const name = await Createproduct.create({
            ProductName,
            Productcompany, Productprice, minHours,
            minPrice,
            image,
            Quantity,
            Hours,
            TotalAMount,
        })

        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)

    }
}

// to update product

module.exports.updateproducts = async function (req, res) {
    try {
        const name = await Createproduct.findByIdAndUpdate(req.params.id, req.body)
        if (name) {
            res.send(name)
        }
    }
    catch (err) {
        console.log(err)
    }
}

// to delete product

module.exports.deleteproducts = async function (req, res) {
    try {
        const name = await Createproduct.findByIdAndDelete(req.params.id)
        if (name) {
            res.send(name)
            return res.send("deleted successfully")
        }
    }
    catch (err) {
        console.log(err)
    }
}