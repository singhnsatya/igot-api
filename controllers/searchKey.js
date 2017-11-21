module.exports = searchKey = (req, res) => {

  collection.find(req.query, (err, docs) => {
    if (!err) {
      docs.toArray((err, items) => {
        if (!err) {
          items = items.length > 0 ? items : 'No record found'
          res.send(items)
        } else {
          res.send('Query made is incorrect')
        }
      })
    } else {
      res.send('Query made is incorrect')
    }
  })

}