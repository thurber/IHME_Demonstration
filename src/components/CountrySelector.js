'use strict'

require('react-select/dist/react-select.min.css')

var React = require('react'),
    RCSelect = require('react-select')

// override a style for RCSelect
var sheet = ( () => {
    var style = document.createElement('style')
    document.head.appendChild(style)
    return style.sheet
})()
sheet.insertRule(
    '.is-focused:not(.is-open)>.Select-control {border-color:#96dbfa;}',
    0
)

var CountrySelector = React.createClass({
    
    _change: function(sel) {
        this.props.update(sel.value)
    },

    // TODO should programatically get all possible/interesting countries from data --
    // TODO for this exercise i will just list my chosen few countries
    _countries: [
        {value: 'brazil', label: 'Brazil'},
        {value: 'britain', label: 'Britain'},
        {value: 'china', label: 'China'},
        {value: 'india', label: 'India'},
        {value: 'south africa', label: 'South Africa'},
        {value: 'usa', label: 'USA'},

    ],

    render: function() {

        var divStyle = {
            display: 'block',
            width: '100%',
            maxWidth: '400px',
            margin: '15px 10px 0',
            textAlign: 'center',
        }

        var headerStyle = {
            display: 'inline-block',
            fontVariant: 'small-caps',
            marginBottom: '5px',
        }

        var selectStyle = {
            width: '50%',
            margin: '0 auto',
            position: 'relative',
            zIndex: '99',
        }

        return <div style={divStyle}>
            <span style={headerStyle}>
                Country
            </span>
            <div style={selectStyle}>
                <RCSelect
                    value={this.props.sel}
                    options={this._countries}
                    onChange={this._change}
                    clearable={false}
                />
            </div>
        </div>
    },

})

module.exports = CountrySelector
