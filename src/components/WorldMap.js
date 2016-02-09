'use strict'

var React = require('react'),
    D3 = require('d3')

var svg = require('../../svg/world.svg')

// set hover styles
var sheet = ( () => {
    var style = document.createElement('style')
    document.head.appendChild(style)
    return style.sheet
})()
sheet.insertRule(
    '.activeHover:hover {stroke:#ffebcd;stroke-width:1px;}',
    0
)
sheet.insertRule(
    'div.tooltip {' +
        'position:absolute;' +
        'text-align:center;' +
        'font-size:0.75em;' +
        'padding:2px 5px;' +
        'background:white;' +
        'border:solid 1px rgba(150,150,150,1);' +
        'border-radius:8px;' +
        'pointer-events:none;' +
    '}',
    0
)

var WorldMap = React.createClass({
    
    // Set some constant values
    // TODO could be moved into a config file
    _margin: 20, // margin for framing a specific country in the viewport
    _gray: 'rgba(150,150,150,0.5)', // color for non-selected countries
    _blue: 'rgba(176,220,233,1.0)', // color for male data
    _pink: 'rgba(254,209,216,1.0)', // color for female data

    // Hold a reference to the map svg, tooltip, and the gradient
    _world: {},
    _gradient: {},
    _tip: {},

    // Hold a reference to the previously selected element
    // so its fill can be erased before transitioning
    _prevElement: D3.select(),

    // Helper function for transitioning to selected data
    _updateMap: function() {
        
        // select the element from the current state
        var element = D3.select("[id='" + this.props.country + "']")
        
        // remove any existing fill and events if the country is changing
        if (element[0][0] != this._prevElement[0][0]) {
            this._prevElement
                .classed('activeHover', false)
                .on('mouseover', null)
                .on('mouseout', null)
                .transition()
                .duration(100)
                .attr('fill', this._gray)
        }
        this._prevElement = element

        // grab its bounding box
        var bbox = element.node().getBBox()
        
        // initialize map size
        this._world
            .attr('width', '100%')
            .attr('height', '100%')
        
        // transition viewbox to selected country
        this._world
            .transition()
            .duration(1000)
            .delay(100)
            .attr(
                'viewBox',
                (bbox.x - this._margin)
                + ' ' +
                (bbox.y - this._margin)
                + ' ' +
                (bbox.width + 2*this._margin)
                + ' ' +
                (bbox.height + 2*this._margin)
            )
        
        // set gradient ratio based on data
        var male = this.props.data.get(this.props.year)[this.props.country + '_male']
        var female = this.props.data.get(this.props.year)[this.props.country + '_female']
        var both = this.props.data.get(this.props.year)[this.props.country + '_both']
        var ratio = male / (male + female)

        // transition gradient
        this._gradient.select('#obGradMaleStart')
            .attr('stop-color', this._blue)
        this._gradient.select('#obGradMaleEnd')
            .transition()
            .duration(500)
            .attr('offset', ratio)
            .attr('stop-color', this._blue)
        this._gradient.select('#obGradFemaleStart')
            .transition()
            .duration(500)
            .attr('offset', ratio)
            .attr('stop-color', this._pink)
        this._gradient.select('#obGradFemaleEnd')
            .attr('stop-color', this._pink)
        
        element
            .attr('fill', 'url(#obGrad)')
            .classed('activeHover', true)
            .on('mouseover', ( (d) => {
                this._tip
                    .transition()
                    .duration(200)
                    .style('opacity', 0.9)
                this._tip
                    .html(
                        '<div>' +
                            '<span>' +
                                '&nbsp;&nbsp; Male: ' + Math.round(male*100*10)/10 + '%' +
                            '</span><br/>' +
                            '<span>' +
                                'Female: ' + Math.round(female*100*10)/10 + '%' +
                            '</span><br/>' +
                            '<span>' +
                                'Overall: ' + Math.round(both*100*10)/10 + '%' +
                            '</span>' +
                        '</div>'
                    )
                    .style('left', D3.event.pageX + 'px')
                    .style('top', D3.event.pageY + 'px')
            }).bind(this))
            .on('mouseout', ( (d) => {
                this._tip
                    .transition()
                    .duration(200)
                    .style('opacity', 0)
            }).bind(this))

    },

    // Initialize a d3 reference to the svg map, tooltip, & gradient, and call a transition to initial data
    componentDidMount: function() {

        this._world = D3.select('#map-svg > svg')
        
        this._tip = D3.select('body')
                      .append('div')
                      .classed('tooltip', true)
                      .style('opacity', 0)

        this._gradient = this._world
            .append('linearGradient')
            .attr('id','obGrad')
        this._gradient
            .append('stop')
            .attr('id', 'obGradMaleStart')
            .attr('offset', '0')
            .attr('stop-color', this._blue)
        this._gradient.append('stop')
            .attr('id', 'obGradMaleEnd')
            .attr('offset', '0.5')
            .attr('stop-color', this._blue)
        this._gradient
            .append('stop')
            .attr('id', 'obGradFemaleStart')
            .attr('offset', 0.5)
            .attr('stop-color', this._pink)
        this._gradient
            .append('stop')
            .attr('id', 'obGradFemaleEnd')
            .attr('offset', 1)
            .attr('stop-color', this._pink)
        
        this._updateMap()
    },

    // After each render, call a transition to selected data
    componentDidUpdate: function() {
        this._updateMap()
    },

    // Inflate the world map svg
    render: function() {

        var style = {
            display: 'block',
            fill: this._gray,
            width: '100%',
            maxWidth: '400px',
            height: '300px',
            maxHeight: '50%',
            borderRadius: '50%',
            overflow: 'hidden',

        }
        
        return <div id='map-svg' style={style} dangerouslySetInnerHTML={{__html: svg}}></div>

    },

})

module.exports = WorldMap
