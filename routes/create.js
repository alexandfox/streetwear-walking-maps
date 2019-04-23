const express = require('express');
const router  = express.Router();
const axios = require('axios')

const placesAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/'
});






// router.get('/create', (req, res, next) => {
//   res.render('create');
// });



module.exports = router;
