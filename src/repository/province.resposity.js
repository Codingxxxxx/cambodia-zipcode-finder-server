const {pool} = require('./mongodb.repository');

function getAllProvinces() {
   return new Promise((resolve, reject) => {
      pool.connect().then((client) => {
         try {
            const sql = 'SELECT province_id, province_name_kh, province_name_en FROM provinces';
            client.query(sql).then((result) => {
               const rows = result.rows.map((row) => {
                  return {
                     provinceId: row.province_id,
                     provinceNameEN: row.province_name_en,
                     provinceNameKH: row.province_name_kh
                  };
               });
               resolve(rows);
            });
         } finally {
            client.release();
         }
      });
   });
}

function getDistrictsOfProvince(provinceId) {
   return new Promise((resolve, reject) => {
      pool.connect().then((client) => {
         try {
            const sql = 'SELECT distinct districts.district_id, districts.district_name_kh, districts.district_name_en FROM districts INNER JOIN province_details on districts.district_id = province_details.district_id WHERE province_id = $1 ORDER BY districts.district_id';
            client.query(sql, [provinceId]).then((result) => {
               const rows = result.rows.map((row) => {
                  return {
                     districtId: row.district_id,
                     districtNameEN: row.district_name_en,
                     districtNameKH: row.district_name_kh
                  };
               });
               resolve(rows);
            });
         } finally {
            client.release();
         }
      });
   });
}

function findCommunes(communeName) {
   return new Promise((resolve, reject) => {
      pool.connect().then((client) => {
         try {
            const sql = `SELECT provinces.province_name_en, provinces.province_name_kh, districts.district_name_en, districts.district_name_kh, communes.commune_name_en, communes.commune_name_kh, communes.zip_code FROM province_details INNER JOIN communes ON province_details.commune_id = communes.commune_id INNER JOIN districts ON province_details.district_id = districts.district_id INNER JOIN provinces ON province_details.province_id = provinces.province_id WHERE communes.commune_name_kh ILIKE $1`;
            client.query(sql, [`%${communeName}%`]).then((result) => {
               const rows = result.rows.map((row) => {
                  return {
                     provinceNameKH: row.province_name_kh,
                     provinceNameEN: row.province_name_en,
                     districtNameEN: row.district_name_en,
                     districtNameKH: row.district_name_kh,
                     communeNameKH: row.commune_name_kh,
                     communeNameEN: row.commune_name_en,
                     zipCode: row.zip_code
                  };
               });
               resolve(rows);
            });
         } finally {
            client.release();
         }
      });
   });
}

module.exports.getAllProvinces = getAllProvinces;
module.exports.getDistrictsOfProvince = getDistrictsOfProvince;
module.exports.findCommunes = findCommunes;