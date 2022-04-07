printjson(db.people.aggregate([{$group: {
    _id: '$job',
    count: {
     $sum: 1
    }
   }}, {$project: {
    _id: 0,
    job: '$_id',
    count: 1
   }}, {$match: {
    count: {
     $eq: 1
    }
   }}, {$project: {
    count: 0
   }}]))