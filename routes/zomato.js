const JSON = require('circular-json');
var zomato = require('zomato-api');
var client = zomato({
    userKey: '**************************'
})
const Zomato = require('zomato.js');
const zomat = new Zomato('************************');


module.exports = (zomatos, knex) => {
    zomatos.post('/zomatosearch', (req, res) => {
        function restaurants(long, lati) {
            zomat
                .geocode({
                    lat: lati,
                    lon: long
                })
                .then(function (data) {
                    // console.log(data);
                    var nearbyRest = (data.nearby_restaurants);
                    console.log()
                    var Mainlist = []
                    var simplelist = {}
                    for (var i of nearbyRest) {
                        simplelist.name = (i.restaurant.name)
                        simplelist.average_cost_for_two = (i.restaurant.average_cost_for_two)
                        simplelist.price_range = (i.restaurant.price_range)
                        simplelist.has_online_delivery = (i.restaurant.has_online_delivery)
                        simplelist.cuisines = (i.restaurant.cuisines)
                        simplelist.featured_image = i.restaurant.featured_image
                        Mainlist.push(simplelist)
                        simplelist = {}
                    }
                    console.log(Mainlist)
                    return res.render('../views/Restaurants', {data:Mainlist})
                })
                .catch(function (err) {
                    console.error(err);
                    return res.json(err)
                })
        }

        function location(city) {
            client.getLocations({ query: city })
                .then((data) => { long = data.location_suggestions[0].longitude; lati = data.location_suggestions[0].latitude; restaurants(long, lati) })
                .catch(err => { return res.json(err) });
        }
        location(req.body.search)
    })
}