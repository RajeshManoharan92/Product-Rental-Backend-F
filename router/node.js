const express = require('express');
const router = express.Router();
const nodemodule = require('../module/node')

// to get product details

router.get('/get', nodemodule.getproductdetails);

//to get total product count

router.get('/gettotalproductcount', nodemodule.gettotalproductcount);

// to get contact us details

router.get('/getcontactusdetails', nodemodule.getcontactusdetails);

// to get cart details

router.get('/getcartdetails/:id', nodemodule.getcartdetails);

// to get contact us details

router.post('/login', nodemodule.userlogin);

// to post product datas

router.post('/post', nodemodule.postproductdata);

// to post contactus datas

router.post('/contactus', nodemodule.postcontactusdata);

// to post User register datas

router.post('/register', nodemodule.userregister);

// to get User name

router.post('/getusername', nodemodule.username);

// to change password

router.post('/newpassword', nodemodule.setnewpassword);

// to update product data

router.put('/update/:id', nodemodule.Updateproductdata);

// to delete product data

router.delete('/delete/:id', nodemodule.deleteproductdata);

// to delete Enquiry data

router.delete('/deleteenquiry/:id', nodemodule.deleteenquirydata);


module.exports = router
