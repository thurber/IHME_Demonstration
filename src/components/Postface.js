'use strict'

var React = require('react')

var Postface = React.createClass({

    render: () => {
        var style = {
            display: 'block',
            width: '100%',
            maxWidth: '400px',
            margin: '10px 0',
            fontSize: '0.75em',
            color: 'rgb(50,50,50)',
            lineHeight: '1.5em',
            textAlign: 'justify',
        }
        return <div>
            <p style={style}>
               A visualization of the ratio of overweight prevalence among males vs females
               for the selected country and year. For instance, if the percentage of overweight 
               males and females is the same, the country will be half blue and half pink. If 
               a larger percentage of males are overweight, the country will be shaded more blue 
               than pink. The overall overweight prevalence within the given population can be 
               learned by hovering the mouse over the displayed country or tapping and holding on 
               a mobile device.
            </p>
        </div>
    },

})

module.exports = Postface
