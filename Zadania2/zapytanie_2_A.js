printjson(db.people.aggregate([
    {
        '$unwind': {
            'path': '$credit'
        }
    }, {
        '$group': {
            '_id': '$credit.currency',
            'Ilosc srodkow': {
                '$sum': '$credit.balance'
            }
        }
    }
]))