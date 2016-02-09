'use strict'

var React = require('react')

// add font to style sheet
var sheet = ( () => {
    var style = document.createElement('style')
    document.head.appendChild(style)
    return style.sheet
})()
sheet.insertRule(
    "@font-face {font-family:'custom';font-style:normal;src:url(font/ColabThi-webfont.woff);}",
    0
)

var Preface = React.createClass({

    render: () => {
        var style = {
            display: 'block',
            width: '100%',
            maxWidth: '400px',
            margin: '5px',
            textAlign: 'center',
            fontFamily: 'custom, serif',
        }
        return <div>
            <h1 style={style}>
                Overweight Prevalence
            </h1>
            <h4 style={style}>
                In Males vs Females aged 25-29
            </h4>
        </div>
    },

})

module.exports = Preface
