import React from 'react'

const PieChart = () => {
  return (
    <section className='chart'>
      <div className='chart_pie'>
        <div className='chart_box'>
          <p className='chart_percent'>48</p>
          <span>%</span>
        </div>
        <div className='chart_box'>
          <svg width='120' height='120'>
            <g transform={`translate(60 60)`}>
              <path class="slice" fill="#fff" d="M3.67394039744206e-15,-60A60,60,0,0,1,14.921393229891285,58.114989667717865L13.429253906902156,52.30349070094608A54,54,0,0,0,3.3065463576978537e-15,-54Z"></path>
              <path class="slice" fill="rgba(255, 255, 255, 0.3)" d="M14.921393229891285,58.114989667717865A60,60,0,1,1,-1.1021821192326178e-14,-60L-9.91963907309356e-15,-54A54,54,0,1,0,13.429253906902156,52.30349070094608Z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className='chart_info'>
        <div className='chart_contents'>
          <p className='chart_title'>Income</p>
          <p className='chart_value'>12000 円</p>
        </div>
        <div className='chart_contents'>
          <p className='chart_title'>Expense</p>
          <p className='chart_value'>6000 円</p>
        </div>
      </div>
    </section>
  )
}

export default PieChart
