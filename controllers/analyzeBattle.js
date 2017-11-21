	module.exports = analyzeBattle = (req, res) => {
		let obj = {};
		Promise.promisifyAll(collection);
		let finalList = ["attacker_king", "defender_king", "region", "name"];
		let attackerOutcome = ["attacker_outcome"];
		let battleType = [];
		let count = 0;
		let name_obj = {};
		p1 = new Promise((resolve, reject) => {

			finalList.forEach((item, index) => {

				collection.aggregateAsync([{
						$group: {
							"_id": '$' + item,
							"count": {
								$sum: 1
							}
						}
					}])
					.then((docs) => {
						let arr = [];

						docs.map((item) => {
							arr.push(item.count)
						});

						arr.sort(function(a, b) {
							return a > b;
						})

						docs = docs.filter((doc) => {
							return doc.count === arr[arr.length - 1]
						})

						obj[item] = docs[0]._id;

						if (Object.keys(obj).length == finalList.length) {

							return resolve(obj)
						}
					})

			})

		})

		p2 = new Promise((resolve, reject) => {
			attackerOutcome.forEach((item) => {

				collection.aggregateAsync([{
					$group: {
						"_id": '$' + item,
						"count": {
							$sum: 1
						}
					}
				}]).then((docs) => {
					let obj = {};
					docs.forEach((item, index) => {
						if (item._id) {
							obj[item['_id']] = item['count'];
						}
					})
					return resolve(obj)
				})

			})
		})

		p3 = new Promise((resolve, reject) => {
			let obj = {};
			collection.find({
				"battle_type": {
					"$exists": true
				}
			}, (err, docs) => {
				if (!err) {
					docs.toArray((err, items) => {
						if (!err) {
							items.reduce((obj, item, index) => {
								_value = item['battle_type'];
								if (_value) {
									obj[_value] = true;
								}
								return obj
							}, obj)
							return resolve(Object.keys(obj));
						}
					})
				}
			})

		})

		p4 = new Promise((resolve, reject) => {
			let obj = {};
			collection.find({
					"defender_size": {
						$type: "number"
					}
				}).sort({
					"defender_size": -1
				}).limit(1)
				.toArray((err, docs) => {
					obj['max'] = docs[0].defender_size;
					collection.find({
							"defender_size": {
								$type: "number"
							}
						}).sort({
							"defender_size": 1
						}).limit(1)
						.toArray((err, docs) => {
							obj['min'] = docs[0].defender_size;
							collection.aggregateAsync([{
								$group: {
									"_id": null,
									"avg": {
										$avg: "$defender_size"
									}
								}
							}]).then((docs) => {
								obj['avg'] = docs[0].avg;
								return resolve(obj);
							})

						})

				})

		})


		Promise.all([p1, p2, p3, p4]).then((data) => {

			res.send({
				"most_active": data[0],
				"attacker_outcome": data[1],
				"battle_type": data[2],
				"defender_size": data[3]
			});
		})

	}