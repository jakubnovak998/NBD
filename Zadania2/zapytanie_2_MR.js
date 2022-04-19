db.people.mapReduce( 
    function() {
        this.credit.forEach(credit => {
            emit(credit.currency, credit.balance)
          }); }, 
    function(key, values) {
         return Array.sum(values)
    },
    {
        out: "total_balance",
    }
 )
 printjson(db.total_balance.find().toArray())