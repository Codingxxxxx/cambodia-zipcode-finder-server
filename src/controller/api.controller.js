const {Router} = require('express');
const {getAllProvinces, getDistrictsOfProvince, findCommunes} = require('./../repository/province.resposity');

const router = Router();

router.post('/province/all', (req, res) => {
   getAllProvinces().then((data) => {
      res.statusCode = 200;
      res.send(data);
   }).catch((error) => {
      res.statusCode = 500;
      res.send('Server Error.');
      console.log(`Error -> ${req.url} -> `, error);
   });
});

router.post('/province/district', (req, res) => {
   const provinceId = req.body.provinceId;
   getDistrictsOfProvince(provinceId).then((data) => {
      res.statusCode = 200;
      res.send(data);
   }).catch((error) => {
      res.statusCode = 500;
      res.send('Server Error.');
      console.log(`Error -> ${req.url} ->`, error);
   })
});

router.post('/province/district/commune/search', (req, res) => {
   const communeName = req.body.communeName;
   findCommunes(communeName).then((data) => {
      res.statusCode = 200;
      res.send(data);
   }).catch((error) => {
      res.statusCode = 500;
      res.send('Server Error.');
      console.log(`Error -> ${req.url} ->`, error);
   })
});

module.exports.apiController = router;