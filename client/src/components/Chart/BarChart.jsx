import React, { useEffect, useRef } from 'react';
import Moment from 'moment';
import * as d3 from 'd3';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const BarChart = ({ data, keys, select, width, height }) => {
  const ref = useRef(null);
  const barWidth = 6;
  const colorList = {
    income: 'rgba(255, 255, 255, 0.3)',
    expense: '#fff'
  };
  const dayList = moment.weekdays();
  const monthList = moment.months();
  const weekList = [];

  const firstDay = moment().startOf('month');
  const lastDay = moment().endOf('month');
  const monthRange = moment.range(firstDay, lastDay,1);
  for (let mday of monthRange.by('days')) {
    if (weekList.indexOf(mday.week()) === -1) {
      weekList.push('Week ' + mday.week());
    }
  }
  data.forEach((data) => (data['expense'] = Math.abs(data['expense'])));
  const labels = select === 0 ? dayList : select === 1 ? weekList : monthList;
  const stackGenerator = d3.stack().keys(keys).order(d3.stackOrderReverse);
  const layers = stackGenerator(data);
  const maxAmount = d3.max(layers, (layer) =>
    d3.max(layer, (seq) => Math.abs(seq[1]))
  );

  useEffect(() => {
    const svg = d3.select(ref.current);
    const extent = [0, maxAmount];
    const yScale = d3.scaleLinear().domain(extent).range([height - 15, 0]);
    const xScale = d3.scaleBand().domain(labels).range([0, width]);
    const paddingLeft = (xScale.bandwidth() - barWidth) / 2;
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => (select === 1 ? d : d.slice(0, 3)))
      .tickSize(0);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${height - 15}px)`)
      .style('color', 'white')
      .call(xAxis)
      .call((g) => g.select('.domain').remove())
      .selectAll('.x-axis .tick text')
      .attr('dy', '1.5em');

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colorList[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (seq) => paddingLeft + xScale(seq.data.text))
      .attr('width', barWidth)
      .attr('y', height - 15)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('y', (seq) => yScale(seq[1]))
      .attr('height', (seq) => yScale(seq[0]) - yScale(seq[1]));
  }, [data]);

  useEffect(() => {
    d3.select('.x-axis')
      .append('line')
      .attr('x1', 0)
      .attr('x2', '100%')
      .attr('y1', 30)
      .attr('y2', 30)
      .attr('stroke-width', 0.3)
      .attr('stroke', 'white');

    const legend = d3
      .select('.legend')
      .style('transform', `translate(140px, 205px)`);

    legend.selectAll('rect')
      .data(layers)
      .join('rect')
      .attr('x', (d, i) => i * 130)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (layer) => colorList[layer.key]);

    legend.selectAll('text')
      .data(layers)
      .join('text')
      .text((layer) => layer.key.toUpperCase())
      .attr('fill', (d, i) => ['rgba(255, 255, 255, 0.6)', '#fff'][i])
      .attr('x', (d, i) => 18 + i * 130)
      .attr('y', 10)
      .style('font-size', '12px');
  }, []);

  return (
    <svg width={width} height={height} ref={ref} className='center-align'>
      <g className='x-axis' />
      <g className='legend' />
    </svg>
  );
};

export default BarChart;
