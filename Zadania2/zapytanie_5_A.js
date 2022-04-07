printjson(db.people.aggregate([{$unwind: {
    path: '$credit'
   }}, {$match: {
    sex: 'Female',
    nationality: 'Poland'
   }}, {$group: {
    _id: '$credit.currency',
    'Ilosc srodkow': {
     $sum: '$credit.balance'
    },
    'Srednia srodkow': {
     $avg: '$credit.balance'
    }
   }}]));