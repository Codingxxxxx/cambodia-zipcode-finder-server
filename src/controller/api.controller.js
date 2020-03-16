const {Router} = require('express');
const {sign} = require('jsonwebtoken');
const moment = require('moment');
const {secretKey} = require('./../app.config.json');
const {getAllProvinces, getDistrictsOfProvince, findCommunes, findCommunesByDistrictId} = require('./../repository/province.resposity');

const router = Router();
const clientKey = 'laksdjf9234239jsadflasdfjadfjaf923ijsdlfasdklfasdjfasd$$$$f';

router.post('/login', (req, res) => {
   const key = req.body.clientKey;
   if (key === clientKey) {
      const now = moment().format('MMMM Do YYYY, h:mm:ss a');
      const payload = {createDate: now}
      const token = sign(payload, secretKey);
      const responseBody = {
         code: 200,
         apiCode: 1,
         token: token,
         generatedDate: payload
      };
      res.statusCode = 200;
      res.send(responseBody);
   } else {
      const responseBody = {
         code: 200,
         apiCode: 0
      };
      res.statusCode = 200;
      res.send(responseBody);
   }
});

router.post('/check-connection', (req, res) => {
   res.statusCode = 200;
   res.send(`I'm fine :)`);
});

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
   if (!provinceId || (!Number.isInteger(provinceId))) {
      res.statusCode = 400;
      const responseJson = {
         responseCode: 400,
         message: 'Field not valid.'
      };
      res.send(responseJson);
      return;
   }
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
   if (!communeName || (Number.isInteger(communeName))) {
      res.statusCode = 400;
      const responseJson = {
         responseCode: 400,
         message: 'Field not valid.'
      };
      res.send(responseJson);
      return;
   }
   findCommunes(communeName).then((data) => {
      res.statusCode = 200;
      res.send(data);
   }).catch((error) => {
      res.statusCode = 500;
      res.send('Server Error.');
      console.log(`Error -> ${req.url} ->`, error);
   })
});

router.post('/province/district/commune', (req, res) => {
   const districtId = req.body.districtId;
   if (!districtId || (!Number.isInteger(districtId))) {
      res.statusCode = 400;
      const responseJson = {
         responseCode: 400,
         message: 'Field not valid.'
      };
      res.send(responseJson);
      return;
   }
   findCommunesByDistrictId(districtId).then((data) => {
      res.statusCode = 200;
      res.send(data);
   }).catch((error) => {
      res.statusCode = 500;
      res.send('Server Error.');
      console.log(`Error -> ${req.url} ->`, error);
   })
});



module.exports.apiController = router;