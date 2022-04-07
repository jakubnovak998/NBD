 printjson(db.people.aggregate([
    {
      '$group': {
        '_id': '$sex', 
        'height': {
          '$avg': '$height'
        }
      }
    }
  ]))