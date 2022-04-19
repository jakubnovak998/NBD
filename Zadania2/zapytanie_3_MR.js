db.people.mapReduce( 
    function() {
        emit(this.job, 1); }, 
    function(key, values) {
        return Array.sum(values);
    },
    {
        out: "zapytanie_3",
    }
 )
 printjson(db.zapytanie_3.find({value: 1}).toArray())