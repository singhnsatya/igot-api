module.exports = battleCounts = (req,res)=>{  
     let finalList = [];
     collection.find().toArray(function(err, items) {});

    var stream = collection.find({},(err,docs)=>{

      docs.toArray(function(err, items) {
       
      res.send({battle_count:items.length})
		
      });

    });

}
