const express = require('express');
const router = express.Router();
const nodemodule = require('../module/node')

// to get user product details

router.get('/get/:id', nodemodule.getproductdetails);

// to get admin product details

router.get('/get', nodemodule.getadmindata);

//to get total product count

router.get('/gettotalproductcount/:id', nodemodule.gettotalproductcount);

// to get contact us details

router.get('/getcontactusdetails', nodemodule.getcontactusdetails);

// to get cart details

router.get('/getcartdetails/:id', nodemodule.getcartdetails);

// to get product details

router.get('/getproducts', nodemodule.getproducts);

// to get product details

router.get('/getuserbyid/:id', nodemodule.userbyid);

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

// to create product

router.post('/createproducts', nodemodule.createproducts);

// to update cart product data

router.put('/update/:id', nodemodule.Updateproductdata);

// to update product data

router.put('/updateproduct/:id', nodemodule.updateproducts);

// to update admin product data

router.put('/updateadminproduct/:id', nodemodule.updateadmindata);

// to delete product data

router.delete('/delete/:id', nodemodule.deleteproductdata);

// to delete Enquiry data

router.delete('/deleteenquiry/:id', nodemodule.deleteenquirydata);

// to delete new product created

router.delete('/deleteproduct/:id', nodemodule.deleteproducts);

// to deletea admin product data

router.delete('/deleteadmindata/:id', nodemodule.deleteadmindata);





module.exports = router
