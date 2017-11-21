module.exports = fetchAllLists = (req, res) => {
  let placeList = {};
  let finalList = [];
  collection.find().toArray(function(err, items) {});

  var stream = collection.find({
    "location": {
      $exists: true
    }
  }, {
    'location': 1
  }, (err, docs) => {

    docs.toArray(function(err, items) {

      items.reduce((obj, arr, index) => {

        let _val = arr['location'];
        obj[_val] = true;
        return obj

      }, placeList)

      if (placeList) {
        Object.keys(placeList).forEach((item, index) => {
          if (item) {
            finalList.push(item);
          }
        })
      }
      res.send(finalList)

    });

  });

}