/* =========================================================
   charts.js — Plotly + Scrollama
   Dos hotels, un agost · PAC3
   ========================================================= */

const COLORS = {
  resort:     '#C04A30',
  resortSoft: '#E8B5A8',
  resortDim:  'rgba(192, 74, 48, 0.25)',
  city:       '#2E5077',
  citySoft:   '#B5C5D6',
  cityDim:    'rgba(46, 80, 119, 0.25)',
  paper:      '#F5EFE4',
  paperDark:  '#EDE5D3',
  ink:        '#1F1A15',
  inkSoft:    '#4A4239',
  inkMute:    '#8A8073',
  rule:       '#D8CFB8',
  gold:       '#C4915C',
  goldFill:   'rgba(196, 145, 92, 0.18)'
};

const FONT_DISPLAY = 'Fraunces, Georgia, serif';
const FONT_BODY    = 'Newsreader, Georgia, serif';
const FONT_MONO    = 'JetBrains Mono, ui-monospace, monospace';

const PLOTLY_CONFIG = {
  displayModeBar: false,
  responsive: true,
  staticPlot: false,
  scrollZoom: false,
  doubleClick: false
};

/* ----------------------------------------------------------
   Layout base — comú a tots els gràfics
   ---------------------------------------------------------- */
function baseLayout(opts = {}) {
  return {
    paper_bgcolor: COLORS.paper,
    plot_bgcolor:  COLORS.paper,
    font: {
      family: FONT_BODY,
      size: 13,
      color: COLORS.ink
    },
    margin: { l: 58, r: 28, t: 48, b: 48 },
    showlegend: opts.showlegend !== false,
    legend: {
      orientation: 'h',
      x: 0, y: 1.14,
      xanchor: 'left', yanchor: 'bottom',
      font: { family: FONT_MONO, size: 11, color: COLORS.inkSoft },
      bgcolor: 'rgba(0,0,0,0)'
    },
    xaxis: {
      showgrid: false,
      showline: true,
      linecolor: COLORS.rule,
      linewidth: 1,
      ticks: 'outside',
      tickcolor: COLORS.rule,
      ticklen: 4,
      tickfont: { family: FONT_MONO, size: 11, color: COLORS.inkMute },
      zeroline: false,
      automargin: true
    },
    yaxis: {
      showgrid: true,
      gridcolor: COLORS.rule,
      gridwidth: 1,
      griddash: 'dot',
      showline: false,
      tickfont: { family: FONT_MONO, size: 11, color: COLORS.inkMute },
      zeroline: false,
      automargin: true,
      autorange: false,
      tickprefix: '',
      ticksuffix: ''
    },
    hoverlabel: {
      bgcolor: COLORS.ink,
      bordercolor: COLORS.ink,
      font: { family: FONT_MONO, size: 12, color: COLORS.paper }
    },
    annotations: [],
    shapes: []
  };
}

/* ----------------------------------------------------------
   PAS 1 — Volum
   ---------------------------------------------------------- */
function chartVolume() {
  const x = HOTEL_DATA.months_ca;
  const data = [
    {
      x, y: HOTEL_DATA.city.n,
      type: 'scatter', mode: 'lines+markers',
      name: 'City Hotel',
      line: { color: COLORS.city, width: 3, shape: 'spline', smoothing: 0.8 },
      marker: { color: COLORS.city, size: 6 },
      hovertemplate: '<b>%{x}</b><br>City · %{y:,} reserves<extra></extra>'
    },
    {
      x, y: HOTEL_DATA.resort.n,
      type: 'scatter', mode: 'lines+markers',
      name: 'Resort Hotel',
      line: { color: COLORS.resort, width: 3, shape: 'spline', smoothing: 0.8 },
      marker: { color: COLORS.resort, size: 6 },
      hovertemplate: '<b>%{x}</b><br>Resort · %{y:,} reserves<extra></extra>'
    }
  ];
  const layout = baseLayout();
  layout.yaxis.range = [0, 10000];
  layout.yaxis.tickformat = ',';
  layout.yaxis.title = { text: 'Reserves / mes', font: { family: FONT_MONO, size: 11, color: COLORS.inkMute } };
  return { data, layout };
}

/* ----------------------------------------------------------
   PAS 2 i 3 — ADR
   highlight: 'city' (pas 2) | 'climax' (pas 3) | 'final' (pas 8)
   ---------------------------------------------------------- */
function chartADR(highlight) {
  const x = HOTEL_DATA.months_ca;

  const cityEmphasis = highlight === 'city';
  const resortEmphasis = highlight === 'climax' || highlight === 'final';

  const data = [
    {
      x, y: HOTEL_DATA.city.adr,
      type: 'scatter', mode: 'lines+markers',
      name: 'City Hotel',
      line: {
        color: cityEmphasis ? COLORS.city : COLORS.cityDim,
        width: cityEmphasis ? 4 : 2.5,
        shape: 'spline', smoothing: 0.8
      },
      marker: {
        color: cityEmphasis ? COLORS.city : COLORS.cityDim,
        size: cityEmphasis ? 7 : 5
      },
      hovertemplate: '<b>%{x}</b><br>City · €%{y:.0f}<extra></extra>'
    },
    {
      x, y: HOTEL_DATA.resort.adr,
      type: 'scatter', mode: 'lines+markers',
      name: 'Resort Hotel',
      line: {
        color: resortEmphasis ? COLORS.resort : (cityEmphasis ? COLORS.resortDim : COLORS.resort),
        width: resortEmphasis ? 4 : (cityEmphasis ? 2.5 : 3),
        shape: 'spline', smoothing: 0.8
      },
      marker: {
        color: resortEmphasis ? COLORS.resort : (cityEmphasis ? COLORS.resortDim : COLORS.resort),
        size: resortEmphasis ? 7 : (cityEmphasis ? 5 : 6)
      },
      hovertemplate: '<b>%{x}</b><br>Resort · €%{y:.0f}<extra></extra>'
    }
  ];

  const layout = baseLayout();
  layout.yaxis.range = [0, 220];
  layout.yaxis.tickprefix = '€';
  layout.yaxis.title = { text: 'Preu mig per nit (ADR)', font: { family: FONT_MONO, size: 11, color: COLORS.inkMute } };

  if (highlight === 'climax' || highlight === 'final') {
    layout.shapes.push({
      type: 'rect',
      xref: 'x', yref: 'paper',
      x0: 6.5, x1: 7.5,
      y0: 0, y1: 1,
      fillcolor: COLORS.gold,
      opacity: 0.18,
      line: { width: 0 },
      layer: 'below'
    });
    layout.annotations.push({
      x: 7, y: 215, xref: 'x', yref: 'y',
      text: 'AGOST',
      showarrow: false,
      font: { family: FONT_MONO, size: 10, color: COLORS.gold }
    });
    // anotació pic resort
    layout.annotations.push({
      x: 7, y: 188.5, xref: 'x', yref: 'y',
      ax: 50, ay: -10,
      text: '<b>€189</b><br><span style="font-size:10px">3,8× el mínim</span>',
      font: { family: FONT_DISPLAY, size: 14, color: COLORS.resort },
      bgcolor: COLORS.paper,
      bordercolor: COLORS.resort,
      borderwidth: 1, borderpad: 6,
      showarrow: true, arrowhead: 0, arrowwidth: 1, arrowcolor: COLORS.resort,
      align: 'left'
    });
    // anotació city
    layout.annotations.push({
      x: 4, y: 123.3, xref: 'x', yref: 'y',
      ax: -50, ay: -30,
      text: '<b>€123</b><br><span style="font-size:10px">1,5× el mínim</span>',
      font: { family: FONT_DISPLAY, size: 14, color: COLORS.city },
      bgcolor: COLORS.paper,
      bordercolor: COLORS.city,
      borderwidth: 1, borderpad: 6,
      showarrow: true, arrowhead: 0, arrowwidth: 1, arrowcolor: COLORS.city,
      align: 'left'
    });
  }

  if (highlight === 'final') {
    // anotacions resum del pas 8
    layout.annotations.push({
      x: 1, y: 200, xref: 'x', yref: 'y',
      text: '<b>RESORT</b><br>negoci estacional',
      font: { family: FONT_MONO, size: 11, color: COLORS.resort },
      showarrow: false,
      bgcolor: COLORS.paper,
      bordercolor: COLORS.resort,
      borderwidth: 1, borderpad: 8,
      align: 'left'
    });
    layout.annotations.push({
      x: 10, y: 60, xref: 'x', yref: 'y',
      text: '<b>CITY</b><br>negoci constant',
      font: { family: FONT_MONO, size: 11, color: COLORS.city },
      showarrow: false,
      bgcolor: COLORS.paper,
      bordercolor: COLORS.city,
      borderwidth: 1, borderpad: 8,
      align: 'left'
    });
  }

  return { data, layout };
}

/* ----------------------------------------------------------
   PAS 4 — Estada mitjana
   ---------------------------------------------------------- */
function chartStays() {
  const x = HOTEL_DATA.months_ca;
  const data = [
    {
      x, y: HOTEL_DATA.city.stays,
      type: 'scatter', mode: 'lines+markers',
      name: 'City Hotel',
      line: { color: COLORS.city, width: 3, shape: 'spline', smoothing: 0.8 },
      marker: { color: COLORS.city, size: 6 },
      hovertemplate: '<b>%{x}</b><br>City · %{y:.2f} nits<extra></extra>'
    },
    {
      x, y: HOTEL_DATA.resort.stays,
      type: 'scatter', mode: 'lines+markers',
      name: 'Resort Hotel',
      line: { color: COLORS.resort, width: 4, shape: 'spline', smoothing: 0.8 },
      marker: { color: COLORS.resort, size: 7 },
      hovertemplate: '<b>%{x}</b><br>Resort · %{y:.2f} nits<extra></extra>'
    }
  ];
  const layout = baseLayout();
  layout.yaxis.range = [0, 6.5];
  layout.yaxis.ticksuffix = ' nits';
  layout.yaxis.title = { text: 'Estada mitjana', font: { family: FONT_MONO, size: 11, color: COLORS.inkMute } };
  return { data, layout };
}

/* ----------------------------------------------------------
   PAS 5 — % famílies (àrea)
   ---------------------------------------------------------- */
function chartFamilies() {
  const x = HOTEL_DATA.months_ca;
  const data = [
    {
      x, y: HOTEL_DATA.city.families,
      type: 'scatter', mode: 'lines',
      name: 'City Hotel',
      fill: 'tozeroy',
      fillcolor: COLORS.cityDim,
      line: { color: COLORS.city, width: 2.5, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b><br>City · %{y:.1f}% famílies<extra></extra>'
    },
    {
      x, y: HOTEL_DATA.resort.families,
      type: 'scatter', mode: 'lines',
      name: 'Resort Hotel',
      fill: 'tozeroy',
      fillcolor: COLORS.resortDim,
      line: { color: COLORS.resort, width: 3.5, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b><br>Resort · %{y:.1f}% famílies<extra></extra>'
    }
  ];
  const layout = baseLayout();
  layout.yaxis.range = [0, 25];
  layout.yaxis.ticksuffix = ' %';
  layout.yaxis.title = { text: '% reserves amb nens o nadons', font: { family: FONT_MONO, size: 11, color: COLORS.inkMute } };
  return { data, layout };
}

/* ----------------------------------------------------------
   PAS 6 — Països × temporada (Resort)
   ---------------------------------------------------------- */
function chartCountries() {
  const c = HOTEL_DATA.countries.resort;
  const data = [
    {
      x: c.countries, y: c.alta,
      type: 'bar', name: 'Temporada alta (jun-set)',
      marker: { color: COLORS.resort, line: { width: 0 } },
      hovertemplate: '<b>%{x}</b><br>Alta · %{y:.1f}%<extra></extra>'
    },
    {
      x: c.countries, y: c.baixa,
      type: 'bar', name: 'Temporada baixa (oct-mai)',
      marker: { color: COLORS.resortSoft, line: { width: 0 } },
      hovertemplate: '<b>%{x}</b><br>Baixa · %{y:.1f}%<extra></extra>'
    }
  ];
  const layout = baseLayout();
  layout.barmode = 'group';
  layout.bargap = 0.28;
  layout.bargroupgap = 0.08;
  layout.yaxis.range = [0, 60];
  layout.yaxis.ticksuffix = ' %';
  layout.yaxis.title = { text: '% reserves del Resort per origen', font: { family: FONT_MONO, size: 11, color: COLORS.inkMute } };
  return { data, layout };
}

/* ----------------------------------------------------------
   PAS 7 — % ingressos per Q × hotel
   ---------------------------------------------------------- */
function chartRevenue() {
  const r = HOTEL_DATA.revenue_quarter;
  const data = [
    {
      x: r.labels, y: r.city,
      type: 'bar', name: 'City Hotel',
      marker: { color: COLORS.city, line: { width: 0 } },
      text: r.city.map(v => v.toFixed(1) + '%'),
      textposition: 'outside',
      textfont: { family: FONT_MONO, size: 11, color: COLORS.city },
      hovertemplate: '<b>%{x}</b><br>City · %{y:.1f}%<extra></extra>'
    },
    {
      x: r.labels, y: r.resort,
      type: 'bar', name: 'Resort Hotel',
      marker: { color: COLORS.resort, line: { width: 0 } },
      text: r.resort.map(v => v.toFixed(1) + '%'),
      textposition: 'outside',
      textfont: { family: FONT_MONO, size: 11, color: COLORS.resort },
      hovertemplate: '<b>%{x}</b><br>Resort · %{y:.1f}%<extra></extra>'
    }
  ];
  const layout = baseLayout();
  layout.barmode = 'group';
  layout.bargap = 0.32;
  layout.bargroupgap = 0.08;
  layout.yaxis.range = [0, 65];
  layout.yaxis.ticksuffix = ' %';
  layout.yaxis.title = { text: '% ingressos anuals per trimestre', font: { family: FONT_MONO, size: 11, color: COLORS.inkMute } };

  // banda Q3
  layout.shapes.push({
    type: 'rect',
    xref: 'x', yref: 'paper',
    x0: 1.5, x1: 2.5,
    y0: 0, y1: 1,
    fillcolor: COLORS.gold,
    opacity: 0.12,
    line: { width: 0 },
    layer: 'below'
  });
  return { data, layout };
}

/* ----------------------------------------------------------
   PAS 8 — Síntesi (ADR amb anotacions resum)
   ---------------------------------------------------------- */
function chartFinal() {
  return chartADR('final');
}

/* ==========================================================
   SÍNTESI FINAL — 4 mini-charts (small multiples poster)
   ========================================================== */
function miniLayout(yRange, ySuffix) {
  return {
    paper_bgcolor: COLORS.paper,
    plot_bgcolor:  COLORS.paper,
    font: { family: FONT_BODY, size: 11, color: COLORS.ink },
    margin: { l: 44, r: 16, t: 18, b: 28 },
    showlegend: false,
    xaxis: {
      showgrid: false,
      showline: true,
      linecolor: COLORS.rule,
      linewidth: 1,
      ticks: 'outside',
      tickcolor: COLORS.rule,
      ticklen: 3,
      tickfont: { family: FONT_MONO, size: 9, color: COLORS.inkMute },
      zeroline: false,
      automargin: false,
      fixedrange: true,
      tickvals: [0, 3, 6, 9, 11],
      ticktext: ['Gen', 'Abr', 'Jul', 'Oct', 'Des']
    },
    yaxis: {
      showgrid: true,
      gridcolor: COLORS.rule,
      griddash: 'dot',
      showline: false,
      tickfont: { family: FONT_MONO, size: 9, color: COLORS.inkMute },
      zeroline: false,
      automargin: false,
      autorange: false,
      range: yRange,
      ticksuffix: ySuffix || '',
      fixedrange: true,
      nticks: 4
    },
    hoverlabel: {
      bgcolor: COLORS.ink, bordercolor: COLORS.ink,
      font: { family: FONT_MONO, size: 11, color: COLORS.paper }
    },
    shapes: [
      {
        type: 'rect',
        xref: 'x', yref: 'paper',
        x0: 6.5, x1: 7.5,
        y0: 0, y1: 1,
        fillcolor: COLORS.gold, opacity: 0.14,
        line: { width: 0 },
        layer: 'below'
      }
    ],
    annotations: []
  };
}

function miniLine(elId, yKeyResort, yKeyCity, yRange, ySuffix, hoverFmt) {
  const x = HOTEL_DATA.months_ca;
  const data = [
    {
      x, y: HOTEL_DATA.city[yKeyCity],
      type: 'scatter', mode: 'lines',
      line: { color: COLORS.city, width: 2.2, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b> · City · ' + hoverFmt + '<extra></extra>'
    },
    {
      x, y: HOTEL_DATA.resort[yKeyResort],
      type: 'scatter', mode: 'lines',
      line: { color: COLORS.resort, width: 2.6, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b> · Resort · ' + hoverFmt + '<extra></extra>'
    }
  ];
  const layout = miniLayout(yRange, ySuffix);
  Plotly.newPlot(elId, data, layout, PLOTLY_CONFIG);
}

function miniArea(elId, yKey, yRange, ySuffix, hoverFmt) {
  const x = HOTEL_DATA.months_ca;
  const data = [
    {
      x, y: HOTEL_DATA.city[yKey],
      type: 'scatter', mode: 'lines',
      fill: 'tozeroy', fillcolor: COLORS.cityDim,
      line: { color: COLORS.city, width: 2, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b> · City · ' + hoverFmt + '<extra></extra>'
    },
    {
      x, y: HOTEL_DATA.resort[yKey],
      type: 'scatter', mode: 'lines',
      fill: 'tozeroy', fillcolor: COLORS.resortDim,
      line: { color: COLORS.resort, width: 2.4, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b> · Resort · ' + hoverFmt + '<extra></extra>'
    }
  ];
  const layout = miniLayout(yRange, ySuffix);
  Plotly.newPlot(elId, data, layout, PLOTLY_CONFIG);
}

function renderSynthesis() {
  // Top-left: volum (k reserves)
  const x = HOTEL_DATA.months_ca;
  const cityK   = HOTEL_DATA.city.n.map(v => v / 1000);
  const resortK = HOTEL_DATA.resort.n.map(v => v / 1000);
  Plotly.newPlot('synth-volume', [
    {
      x, y: cityK, type: 'scatter', mode: 'lines',
      line: { color: COLORS.city, width: 2.2, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b> · City · %{y:.1f}k reserves<extra></extra>'
    },
    {
      x, y: resortK, type: 'scatter', mode: 'lines',
      line: { color: COLORS.resort, width: 2.6, shape: 'spline', smoothing: 0.8 },
      hovertemplate: '<b>%{x}</b> · Resort · %{y:.1f}k reserves<extra></extra>'
    }
  ], (() => {
    const l = miniLayout([0, 10], 'k');
    return l;
  })(), PLOTLY_CONFIG);

  // Top-right: ADR (€)
  miniLine('synth-adr', 'adr', 'adr', [0, 220], '€', '€%{y:.0f}');

  // Bottom-left: estada (nits)
  miniLine('synth-stays', 'stays', 'stays', [0, 6.5], 'n', '%{y:.2f} nits');

  // Bottom-right: famílies (%) — àrea apilada visualment
  miniArea('synth-families', 'families', [0, 25], '%', '%{y:.1f}%');
}

/* ----------------------------------------------------------
   Renderitzador d'una passa
   ---------------------------------------------------------- */
function renderStep(stepNum) {
  let chart;
  switch (stepNum) {
    case 1: chart = chartVolume(); break;
    case 2: chart = chartADR('city'); break;
    case 3: chart = chartADR('climax'); break;
    case 4: chart = chartStays(); break;
    case 5: chart = chartFamilies(); break;
    case 6: chart = chartCountries(); break;
    case 7: chart = chartRevenue(); break;
    case 8: chart = chartFinal(); break;
    default: return;
  }

  // Actualitza el caption
  const labels = [
    'Volum de reserves per mes',
    'Preu mig per nit (ADR) · ressaltant la City',
    'Preu mig per nit (ADR) · pic d\'agost',
    'Estada mitjana per mes',
    '% reserves amb famílies (nens o nadons)',
    'Origen dels hostes del Resort · temporada',
    '% ingressos anuals per trimestre',
    'Preu mig per nit (ADR) · síntesi'
  ];
  const captionEl = document.getElementById('chart-caption-label');
  if (captionEl) captionEl.textContent = labels[stepNum - 1];
  const stepTagEl = document.getElementById('chart-step-tag');
  if (stepTagEl) stepTagEl.textContent = 'Pas ' + String(stepNum).padStart(2, '0') + ' / 08';

  Plotly.newPlot('chart', chart.data, chart.layout, PLOTLY_CONFIG);
}

/* ----------------------------------------------------------
   Scrollama
   ---------------------------------------------------------- */
function initScrolly() {
  const scroller = scrollama();

  scroller
    .setup({ step: '.step', offset: 0.55, debug: false })
    .onStepEnter(response => {
      response.element.classList.add('is-active');
      const stepNum = parseInt(response.element.dataset.step, 10);
      renderStep(stepNum);
    })
    .onStepExit(response => {
      response.element.classList.remove('is-active');
    });

  window.addEventListener('resize', () => {
    scroller.resize();
    Plotly.Plots.resize('chart');
  });
}

/* ----------------------------------------------------------
   Boot
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // render inicial (pas 1) per evitar gràfic buit
  renderStep(1);
  initScrolly();

  // poster final amb 4 mini-charts
  renderSynthesis();

  // resize també recalcula el poster
  window.addEventListener('resize', () => {
    ['synth-volume', 'synth-adr', 'synth-stays', 'synth-families'].forEach(id => {
      const el = document.getElementById(id);
      if (el) Plotly.Plots.resize(el);
    });
  });
});
