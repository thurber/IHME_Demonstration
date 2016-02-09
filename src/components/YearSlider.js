'use strict'

require('rc-slider/assets/index.css')

var React = require('react'),
    RCSlider = require('rc-slider'),
    D3 = require('d3')

// override a couple styles in RCSlider
var sheet = ( () => {
    var style = document.createElement('style')
    document.head.appendChild(style)
    return style.sheet
})()
sheet.insertRule(
    '.rc-slider-mark-text {transform:rotate(70deg);margin-top:4px;}',
    0
)

var YearSlider = React.createClass({
    
    _onSliderChange: function(value) {
        this.props.update(value)
    },

    render: function() {

        var divStyle = {
            display: 'block',
            width: '100%',
            maxWidth: '400px',
            margin: '20px 0 50px',
            textAlign: 'center',
        }

        var headerStyle = {
            display: 'inline-block',
            fontVariant: 'small-caps',
            marginBottom: '10px',
        }

        var years = this.props.data.keys().sort()
        var marks = {}
        years.forEach( (element) => {
            marks[element] = element
        })

        return <div style={divStyle}>
            <span style={headerStyle}>
                Year
            </span>
            <RCSlider
                min={Math.min(...years)}
                max={Math.max(...years)}
                marks={marks}
                onChange={this._onSliderChange}
            />
        </div>
    },

})

module.exports = YearSlider
