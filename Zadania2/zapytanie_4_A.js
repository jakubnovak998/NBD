printjson(db.people.aggregate([{$group: {
    _id: '$nationality',
    avg_bmi: {
     $avg: {
      $divide: [
       '$weight',
       {
        $pow: [
         {
          $divide: [
           '$height',
           100
          ]
         },
         2
        ]
       }
      ]
     }
    },
    min_bmi: {
     $min: {
      $divide: [
       '$weight',
       {
        $pow: [
         {
          $divide: [
           '$height',
           100
          ]
         },
         2
        ]
       }
      ]
     }
    },
    max_bmi: {
     $max: {
      $divide: [
       '$weight',
       {
        $pow: [
         {
          $divide: [
           '$height',
           100
          ]
         },
         2
        ]
       }
      ]
     }
    }
   }}]))