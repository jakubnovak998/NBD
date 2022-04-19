 printjson(db.people.aggregate([
    {
      '$group': {
        '_id': '$sex', 
        'height': {
          '$avg': '$height'
        },
        'weight': {
          '$avg': '$weight'
        },
      }
    }
  ]))