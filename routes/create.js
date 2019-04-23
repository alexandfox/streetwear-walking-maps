const express = require('express');
const router  = express.Router();
const axios = require('axios')

const placesAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/'
});

router.post("/addPlace", (req, res) => {
  let name    = req.body.name;
  let place_id = req.body.place_id;
  console.log(`loc name: ${name}, id: ${place_id}`)
  res.send(`loc name: ${name}, id: ${place_id}`);
})



// router.get('/create', (req, res, next) => {
//   res.render('create');
// });



module.exports = router;
