'use strict'

// load dependencies
var D3 = require('d3'),
    React = require('react'),
    ReactDOM = require('react-dom')

// load components
var Preface = require('./components/Preface'),
    CountrySelector = require('./components/CountrySelector'),
    YearSlider = require('./components/YearSlider'),
    WorldMap = require('./components/WorldMap')

// parse data
//     key the data map by year, and include male and female
//     obesity prevalence for a few select countries for each year
//     for the desired age group, represented by age_group_id,
//     i.e. this will produce a map with entries such as:
//         1990: {
//             usa_both: 0.039,
//             usa_female: 0.043,
//             usa_male: 0.023,
//             china_both: 0.013,
//             ...
//         }
var data = D3.map()
D3.csv('data/obesity_data.csv')
    .row( d => {
        if (
            d.age_group_id == '10'
            &&
            d.metric == 'overweight'
        ) {
            var update = {}
            // TODO ideally the svg map would use the same country string for path ids
            // TODO as the data, but for this exercise it is sufficient to translate
            var locString = ''
            switch (d.location.toLowerCase()) {
                case 'usa':
                    locString = 'usa'
                    break
                case 'chn':
                    locString = 'china'
                    break
                case 'zaf':
                    locString = 'south africa'
                    break
                case 'bra':
                    locString = 'brazil'
                    break
                case 'ind':
                    locString = 'india'
                    break
                case 'gbr':
                    locString = 'britain'
                    break
                default:
                    break
            }
            update[(locString + '_' + d.sex).toLowerCase()] = +d.mean
            data.set(+d.year, Object.assign(update, data.get(+d.year)))
        }
    })
    .get( () => {

        // build controller as a callback when data is ready
        // TODO this could be slow with big data sets, but in this demonstration case it is sufficient
        var Obesity = React.createClass({

            getInitialState: () => {
                return {
                    country: 'china',
                    year: 1990,
                }
            },
    
            _changeCountry: function(country) {
                this.setState({
                    country: country
                })
            },

            _changeYear: function(year) {
                this.setState({
                    year: year
                })
            },   

            render: function() {
                return <div>
                    <Preface/>
                    <CountrySelector
                        data={data}
                        sel={this.state.country}
                        update={this._changeCountry}
                    />
                    <YearSlider
                        data={data}
                        sel={this.state.year}
                        update={this._changeYear}
                    />
                    <WorldMap
                        data={data}
                        country={this.state.country}
                        year={this.state.year}
                    />
                </div>
            },

        })

        // attach DOM
        ReactDOM.render(
            <Obesity/>,
            document.getElementById('react')
        )

})
