db.people.mapReduce( 
    function() {
        var value = {weight: this.weight, height: this.height, count: 1};
        emit(this.sex, value); }, 
    function(key, values) {
        var reducedValue = { weight: 0, height: 0, count: 0};

        for (var idx = 0; idx < values.length; idx++) {
            reducedValue.count += values[idx].count;
            reducedValue.weight += values[idx].weight;
            reducedValue.height += values[idx].height;
        }
        return reducedValue;
    },
    {
        out: "mapReduce",
        finalize: function(key, reduced_values) {
            var avg_height = reduced_values.height/reduced_values.count;
            var avg_weight = reduced_values.weight/reduced_values.count;

            return {
              "sredni wzrost": avg_height,
              "srednia waga": avg_weight
            }
          }
    }
 )
 printjson(db.mapReduce.find().toArray())