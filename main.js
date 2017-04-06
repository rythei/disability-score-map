Plotly.d3.csv('https://raw.githubusercontent.com/rythei/user-locations-map/master/landing-page-users-03-31-city-state-zip-v2.csv', function(err, rows){
		if(err) throw err;
function unpack(rows, key) {
	    return rows.map(function(row) { return row[key]; });
}
var bubble_map = new Datamap({
  element: document.getElementById("myDiv"),
	scope: 'usa',
	geographyConfig: {
        //dataUrl: 'https://raw.githubusercontent.com/rythei/user-locations-map/master/arizona-state.json',
				popupOnHover: false,
		    highlightOnHover: false
      },
//  geographyConfig: {
  ///  popupOnHover: false,
    //highlightOnHover: false
  //},
  fills: {
    defaultFill: 'rgb(211,211,211)',
		red: "rgb(255,69,0)"
  },
	done: function(datamap) {
			datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));

			function redraw() {
					datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}

	}
});

var city = unpack(rows, 'City'),
    lat = unpack(rows, 'lat'),
    lon = unpack(rows, 'lon'),
    count = unpack(rows, 'Count');

bubs = []

for(i = 0; i<city.length; i++){
	bubs.push({
		name: 'City: ' + city[i] + ', Count: ' + count[i],
		radius: Math.max(2,.12*count[i]),
		latitude: lat[i],
		longitude: lon[i],
		fillKey: 'red'
	})
	//console.log(.12*count[i])
	//console.log(Math.max(5,6))
}


bubble_map.bubbles(bubs);

});
