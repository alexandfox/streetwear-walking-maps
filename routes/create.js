const express = require('express');
const router  = express.Router();
const axios = require('axios')

const placesAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/'
});

var placeSearch = {
  key: "AIzaSyBAFajUxQ7Ltv5t9nfiaYTXvhnWbTV80bk",
  input: "opera-house",
  inputetype: "textquery"
}

function getPlaceInfo( placeSearch ) {
  restCountriesApi.get( 'json', placeSearch)
    .then( responseFromAPI => {
        console.log('Response from API is: ', responseFromAPI.data);           
})		.catch(err => {
    console.log('Error is: ', err);
})};


// router.get('/create', (req, res, next) => {
//   res.render('create');
// });



module.exports = router;
