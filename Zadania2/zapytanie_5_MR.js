db.people.mapReduce( 
    function() {
        this.credit.forEach(credit => {
            emit(credit.currency, credit.balance)
          });
    }, 
    function(key, values) {
        return {
            "Srednia srodkow" : Array.sum(values) / values.length,
            "Ilosc srodkow" : Array.sum(values)
          }
    },
    {
        out: "pl_female_balnce",
        query: {
            nationality : "Poland",
            sex : "Female"
        }
    }
 )
 printjson(db.pl_female_balnce.find().toArray())