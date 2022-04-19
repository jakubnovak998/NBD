db.people.mapReduce( 
    function() {
        var bmi = this.weight/Math.pow(this.height / 100, 2);
        emit(this.nationality, {bmi, minBMI : bmi, maxBMI : bmi, count : 1}); 
    }, 
    function(key, values) {
        reducedValues = { count : 0, bmi : 0, minBMI : values[0].minBMI, maxBMI : values[0].maxBMI };
        for (var i = 0; i < values.length; i++) {
            reducedValues.count += values[i].count;
            reducedValues.bmi += values[i].bmi;
            reducedValues.minBMI = Math.min(reducedValues.minBMI, values[i].minBMI);
            reducedValues.maxBMI = Math.max(reducedValues.maxBMI, values[i].maxBMI);
        }
        return reducedValues;
    },
    {
        out: "bmi_stats",
        finalize: function (key, reducedValues) {
            return {
              avg_bmi : reducedValues.bmi / reducedValues.count,
              min_bmi : reducedValues.minBMI,
              max_bmi : reducedValues.maxBMI
            };
          }
    }
 )
 printjson(db.bmi_stats.find().toArray())