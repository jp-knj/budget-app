import React, { useEffect, useRef } from 'react'
import { select, arc, pie, interpolate } from 'd3'

const PieChart = ({ data, width, height, outerRadius, innerRadius }) => {
  const ref = useRef(null)
  const colorList = ['#fff', 'rgba(255, 255, 255, 0.3)']

  useEffect(() => {
    const svg = select(ref.current);
    const createArc = arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    const createPie = pie()
      .value((d) => d)
      .sort(null);

    const instructions = createPie(data);

    function arcTween(next, index) {
      const initial = createPie([0, 1])[index];
      const interpolator = interpolate(this.last || initial, next);
      this.last = interpolator(1);
      return (t) => createArc(interpolator(t));
    }

    svg
      .selectAll('.slice')
      .data(instructions)
      .join('path')
      .attr('class', 'slice')
      .attr('fill', (d, i) => colorList[i])
      .transition()
      .duration(1000)
      .attrTween('d', arcTween);
  }, [data]);
  return (
   <svg width={width} height={height}>
    <g ref={ref} transform={`translate(60 60)`} />
  </svg>
  )
}

export default PieChart
