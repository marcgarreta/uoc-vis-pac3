# PAC3 — Visualització de Dades — Build Brief per Claude Code

> **Aquest README és una especificació tècnica completa.** Si ets Claude Code llegint això, has de generar tot el projecte descrit a continuació dins del repositori actual (que està buit). No facis preguntes opcionals; pren decisions raonables sobre detalls menors i avança. Quan acabis, fes un commit únic amb el missatge `feat: initial PAC3 storytelling project`.

---

## 0. Context de l'encàrrec

Aquest és el lliurament de la **PAC3 de l'assignatura Visualització de Dades (UOC)**. L'enunciat demana:

- Un **storytelling visual** publicat amb URL pública
- Un **vídeo de 4-6 minuts** que el presenti

El repositori final es publicarà via **GitHub Pages** i ha de servir dos públics:

1. **El tribunal**: entra a la pàgina principal i veu l'storytelling acabat
2. **L'autora** (jo): necessita una pàgina secundària amb el guió del vídeo per fer servir com a teleprompter durant la gravació, i opcionalment una pàgina amb l'anàlisi del dataset per documentar el procés

---

## 1. La història triada

**Títol**: *Dos hotels, un agost*  
**Subtítol**: Dos negocis amagats sota la mateixa categoria. Un descobreix les seves dues vides quan llegim el calendari.

**Tesi**: La columna `hotel` del dataset té només dos valors (Resort, City), però darrere hi ha dos models de negoci radicalment diferents. Un sol número — el preu mig de l'agost — ho fa visible: el Resort multiplica el preu per 3,8; la City només per 1,5.

**Dades**: Antonio, N., Almeida, A., & Nunes, L. (2019). *Hotel booking demand datasets*. Data in Brief, 22, 41-49. 119.390 reserves a dos hotels portuguesos entre juliol 2015 i agost 2017. Després de la neteja oficial del notebook docent (adults<10, ADR ∈ [0, 1000), estades >0 nits, ocupants >0, NA→0): **117.398 reserves**.

**Estructura narrativa** (piràmide de Freytag, segons Ramos, Ashqar & Contreiras 2024):

1. Introducció — dos hotels portuguesos, semblants a primera vista
2. Rising action — el volum creix a l'estiu en tots dos
3. **Clímax** — però el preu només es dispara en un (el Resort: €50 → €189)
4. Falling action — el Resort canvia estada, famílies, origen dels hostes, i acaba concentrant el 54,6% dels ingressos al Q3
5. Resolució — un negoci estacional i un negoci constant amagats sota la mateixa etiqueta

---

## 2. Estructura del repositori a generar

```
.
├── index.html                  # Storytelling principal (scrollytelling)
├── guio.html                   # Guió del vídeo per gravar (teleprompter)
├── analisi.html                # Documentació de l'anàlisi visual
├── css/
│   ├── style.css               # Estils compartits del storytelling
│   └── pages.css               # Estils de guio.html i analisi.html
├── js/
│   ├── data.js                 # Dades agregades inline (JSON)
│   └── charts.js               # Funcions Plotly + control Scrollama
├── img/                        # (opcional, per captures del notebook si calen)
└── README.md                   # Aquest fitxer (substituir per un README curt al final)
```

**Important sobre el README**: quan acabis de generar tot, substitueix aquest README llarg per un README curt (15-20 línies) amb: títol, URL pública un cop publicat, descripció breu, estructura del repositori i instruccions per activar GitHub Pages. Guarda aquest brief original en un fitxer `BUILD_BRIEF.md` per referència futura.

---

## 3. Stack tècnic

- **HTML/CSS vanilla** — sense framework, sense build step
- **Plotly.js 2.35.2** via CDN (`https://cdn.plot.ly/plotly-2.35.2.min.js`)
- **Scrollama 3.2.0** via CDN (`https://unpkg.com/scrollama@3.2.0/build/scrollama.min.js`)
- **Google Fonts**: Fraunces, Newsreader, JetBrains Mono

**Restriccions**:
- NO `localStorage`, `sessionStorage`, `IndexedDB` ni cap browser storage
- NO React, Vue, Svelte ni cap framework
- NO `fetch()` per carregar dades (van inline a `js/data.js`)
- L'HTML s'ha de poder obrir directament al navegador (file://) i funcionar

---

## 4. Disseny — sistema visual

### Paleta (variables CSS)

```css
--color-paper: #F5EFE4;        /* fons crema mediterrani */
--color-paper-dark: #EDE5D3;
--color-ink: #1F1A15;          /* text principal */
--color-ink-soft: #4A4239;
--color-ink-mute: #8A8073;

--color-resort: #C04A30;       /* terracota — Resort Hotel (Algarve) */
--color-resort-soft: #E8B5A8;
--color-resort-dim: rgba(192, 74, 48, 0.25);

--color-city: #2E5077;         /* blau pissarra — City Hotel (Lisboa) */
--color-city-soft: #B5C5D6;
--color-city-dim: rgba(46, 80, 119, 0.25);

--color-gold: #C4915C;         /* accent (banda de l'agost) */
--color-rule: #D8CFB8;
```

### Tipografies

- **Display** (titulars): `Fraunces` (Google Fonts, opsz variable, weights 300-900, SOFT 0-100)
- **Body** (prosa): `Newsreader` (opsz variable, weights 300-700, també italic)
- **Mono** (números, eyebrows, captions): `JetBrains Mono` (weights 400, 500, 700)

Import recomanat:
```
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=JetBrains+Mono:wght@400;500;700&display=swap
```

### Aproximació estètica

**Editorial mediterrani**. Mira referents tipus *The Pudding*, articles del NYT "The Upshot", peces visuals de Reuters Graphics. Característiques:
- Fons crema textit subtil (radial gradients molt suaus, opcional gra puntejat fons)
- Tipografia gran als titulars (clamp(72px, 11vw, 168px) per al hero)
- Cursiva amb caràcter al títol clau ("un agost" en cursiva terracota)
- Espai blanc generós entre seccions
- Hairlines a 1px en color `--color-rule`
- Cap ombra, cap arrodoniment excessiu (2px màxim)

---

## 5. `index.html` — Storytelling principal

### Arquitectura

```
hero            → títol gran + deck + KPIs (no chart)
intro           → 2 paràgrafs amb dropcap, fons paper-dark
scrolly         → la peça central: text scroll esquerra + gràfic sticky dreta
coda            → "Mètode" amb 4 blocs (dades / neteja / eines / inspiració), fons fosc
footer          → línia única, fons fosc
```

### Scrolly — 8 passos

| # | data-step | Títol | Gràfic | Y-range |
|---|---|---|---|---|
| 1 | 1 | Comencem pel volum | Línies volum/mes (City i Resort) | 0-10000 |
| 2 | 2 | Però mirem el preu | Línies ADR/mes (City emphasized) | 0-220 € |
| 3 | 3 | **L'agost no és igual per a tothom** (clímax) | Línies ADR amb banda gold a l'agost + 2 anotacions | 0-220 € |
| 4 | 4 | Quanta estona es queden | Línies estada/mes | 0-6.5 |
| 5 | 5 | Qui ve, i amb qui | Àrees apilades % famílies/mes | 0-25 % |
| 6 | 6 | D'on vénen | Barres agrupades país × temporada (Resort) | 0-60 % |
| 7 | 7 | I al final, els ingressos | Barres agrupades % ingressos/Q × hotel | 0-60 % |
| 8 | 8 | Dos negocis, una taula | ADR amb 2 anotacions resum | 0-220 € |

### Layout scrolly

```css
.scrolly-container {
  display: grid;
  grid-template-columns: minmax(380px, 1fr) minmax(560px, 1.5fr);
  gap: 80px;
}
.scrolly-steps { grid-column: 1; padding: 30vh 0; gap: 70vh; }
.scrolly-graphic { grid-column: 2; position: sticky; top: 8vh; height: 84vh; }
```

### Plotly — convencions

- `Plotly.newPlot()` a cada canvi de pas (no `react`, evita problemes de rang enganxat)
- Cada chart retorna `{data, layout}` amb `layout.yaxis.range` explícit i `autorange: false`
- `tickprefix`/`ticksuffix` definits a cada chart (buit si no aplica)
- Llegenda horitzontal a sobre del gràfic: `{orientation: 'h', x: 0, y: 1.12, xanchor: 'left', yanchor: 'bottom'}`
- Línies amb `shape: 'spline'`, `smoothing: 0.8`, `width: 3` (4 al clímax)
- Configurar `displayModeBar: false`, `responsive: true`

### Anotacions del clímax (pas 3 i 8)

Banda vertical agost: `{type: 'rect', xref: 'x', yref: 'paper', x0: 6.5, x1: 7.5, y0: 0, y1: 1, fillcolor: COLORS.gold, opacity: 0.18, line: {width: 0}}`

Anotacions: una al pic del Resort (€189, "3,8× el mínim") i una a la City (€116, "1,4× el mínim"), amb fonts Fraunces, fons paper, bordura del color del hotel.

### Tags inline al text

Crea classes `.tag.tag-resort` i `.tag.tag-city` per marcar "Resort" i "City" inline en text:

```css
.tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.78em; font-weight: 500;
  padding: 1px 8px; border-radius: 2px;
}
.tag-resort { background: var(--color-resort); color: var(--color-paper); }
.tag-city { background: var(--color-city); color: var(--color-paper); }
```

També una classe `.num` per a xifres destacades inline:

```css
.num {
  font-family: var(--font-mono); font-weight: 700;
  background: rgba(196, 145, 92, 0.18);
  padding: 1px 6px; border-radius: 2px;
}
```

### Contingut textual exacte dels 8 passos

Estan al final d'aquest document, secció **Annex A**.

---

## 6. `guio.html` — Teleprompter del vídeo

Pàgina secundària, NO enllaçada des de l'storytelling (el tribunal no la veu llevat que sàpiga la URL). Ús: tenir-la oberta en una pantalla secundària mentre es grava el vídeo.

### Estructura

- Header curt amb el títol "Guió del vídeo · PAC3"
- Sidebar fixa esquerra amb índex de les 6 parts (numerades, amb percentatge i temps estimat)
- Contingut central amb les 6 seccions, una sota l'altra
- Cada secció:
  - Encapçalament amb número de part, títol, pes (%), temps estimat
  - Subdividida en "beats" amb:
    - Indicació de **pantalla** (què s'ha de veure)
    - **Text a llegir** (en cursiva, font Newsreader gran 22-24px per llegir bé)
  - Notes complementàries al final (consells de ritme, transicions)

### Característiques específiques per a ús com a teleprompter

- Text gran (≥22px) i contrast alt
- Line-height generós (1.7-1.9)
- Cursiva del text a llegir amb un fons subtil per distingir-lo de les indicacions
- Cap distractor: ni navegació externa, ni footer pesant

### Contingut de les 6 parts

Detallat a l'**Annex B** d'aquest document.

---

## 7. `analisi.html` — Documentació de l'anàlisi visual

Pàgina secundària, també no enllaçada des de l'storytelling. Ús: deixar constància del procés analític que va portar a la història (utilitat addicional per al punt 2 de la rúbrica del vídeo si el tribunal vol verificar).

### Estructura

- Header amb títol "Anàlisi visual · Procés"
- Introducció breu (3-4 frases) sobre el procés
- Seccions:
  1. **El dataset** — origen, dimensions, variables
  2. **Detecció d'anomalies** — adults màx 55, ADR negatius o >1000€, etc.
  3. **Neteja aplicada** — regles, abans/després
  4. **Primera comparació entre hotels** — distribució d'ADR
  5. **Patró estacional** — reserves per dia/any
  6. **El descobriment** — el ràtio pic/vall que motiva la història
  7. **Referències** — citació completa Antonio et al. 2019, Ramos et al. 2024, link al notebook
- Estètica coherent amb l'storytelling però més sòbria (tipus article)

### Característiques

- Una sola columna centrada, max-width ~720px
- Pot incloure petits gràfics inline si vols (no obligatori — un placeholder textual amb la xifra clau ja serveix)
- Aprofita els mateixos colors i tipografies

---

## 8. `js/data.js` — Dades inline

Estructura JSON sencera (a generar literalment com a `const HOTEL_DATA = {...}`):

```js
{
  "months_ca": ["Gen","Feb","Mar","Abr","Mai","Jun","Jul","Ago","Set","Oct","Nov","Des"],
  "kpis": {
    "total_bookings": 117398,
    "n_hotels": 2,
    "years": "2015-2017",
    "cancel_rate_global": 37.5
  },
  "resort": {
    "n":        [2130, 3046, 3272, 3547, 3490, 3003, 4512, 4849, 3069, 3462, 2375, 2552],
    "adr":      [50.9, 56.2, 58.6, 79.2, 80.3, 112.0, 157.3, 188.5, 94.4, 63.8, 49.5, 71.6],
    "stays":    [2.96, 3.13, 4.17, 4.07, 4.35, 5.43, 5.36, 5.29, 5.07, 3.99, 3.65, 3.33],
    "families": [4.9, 7.3, 5.7, 7.2, 7.7, 11.6, 17.9, 20.5, 6.4, 6.0, 4.0, 7.9],
    "cancel":   [15.0, 26.0, 23.0, 30.0, 29.0, 33.0, 32.0, 34.0, 32.0, 28.0, 19.0, 24.0]
  },
  "city": {
    "n":        [3670, 4873, 6364, 7405, 8118, 7814, 7976, 8858, 7280, 7467, 4260, 4006],
    "adr":      [84.1, 86.7, 93.1, 112.4, 123.3, 120.3, 112.3, 116.3, 111.8, 101.8, 89.9, 91.6],
    "stays":    [3.03, 3.02, 3.07, 3.06, 2.86, 2.90, 3.15, 3.17, 2.80, 2.77, 3.00, 3.26],
    "families": [6.0, 8.0, 5.0, 8.0, 4.0, 5.0, 11.0, 12.0, 4.0, 4.0, 3.0, 9.0],
    "cancel":   [40.0, 39.0, 37.0, 47.0, 45.0, 45.0, 41.0, 41.0, 43.0, 44.0, 39.0, 43.0]
  },
  "revenue_quarter": {
    "labels": ["Q1 (gen-mar)", "Q2 (abr-jun)", "Q3 (jul-set)", "Q4 (oct-des)"],
    "resort": [10.2, 23.0, 54.6, 12.1],
    "city":   [16.6, 30.6, 34.9, 17.9]
  },
  "countries": {
    "resort": {
      "countries": ["PRT","ESP","GBR","IRL","FRA","CN","ITA"],
      "alta":     [45.9, 14.1, 11.9, 4.4, 3.1, 2.5, 0],
      "baixa":    [54.6, 10.4, 13.7, 2.7, 4.1, 0, 1.9]
    },
    "city": {
      "countries": ["PRT","FRA","DEU","GBR","ESP","ITA"],
      "alta":     [32.8, 10.7, 9.3, 8.4, 7.7, 5.2],
      "baixa":    [39.1, 11.9, 4.8, 5.3, 7.3, 4.8]
    }
  },
  "highlights": {
    "resort_adr_low": 50, "resort_adr_high": 189,
    "city_adr_low": 84, "city_adr_high": 123,
    "resort_ratio": 3.8, "city_ratio": 1.5,
    "resort_q3_pct": 54.6, "city_q3_pct": 34.9
  }
}
```

---

## 9. `js/charts.js` — Convencions de codi

Constants de color al principi del fitxer:

```js
const COLORS = {
  resort: '#C04A30', resortSoft: '#E8B5A8', resortDim: 'rgba(192, 74, 48, 0.25)',
  city: '#2E5077', citySoft: '#B5C5D6', cityDim: 'rgba(46, 80, 119, 0.25)',
  paper: '#F5EFE4', ink: '#1F1A15', inkSoft: '#4A4239', inkMute: '#8A8073',
  rule: '#D8CFB8', gold: '#C4915C'
};
```

Funcions a implementar:

- `baseLayout()` — layout comú (paper bg, fonts, margins, llegenda h, yaxis amb autorange: false)
- `chartVolume()` — pas 1
- `chartADR(highlight)` — passos 2, 3 (param `'city'`, `'climax'`, etc.)
- `chartStays()` — pas 4
- `chartFamilies()` — pas 5 (area chart)
- `chartCountries()` — pas 6 (barres agrupades, dataset Resort)
- `chartRevenue()` — pas 7 (barres agrupades, totes dues hotels)
- `chartFinal()` — pas 8 (reusa `chartADR('climax')` amb anotacions extra "Resort: negoci estacional" i "City: negoci constant")

Lògica Scrollama:

```js
const scroller = scrollama();
scroller
  .setup({ step: '.step', offset: 0.55, debug: false })
  .onStepEnter(r => {
    r.element.classList.add('is-active');
    renderStep(parseInt(r.element.dataset.step, 10));
  })
  .onStepExit(r => r.element.classList.remove('is-active'));

window.addEventListener('resize', () => {
  scroller.resize();
  Plotly.Plots.resize('chart');
});
```

Configuració Plotly:

```js
const PLOTLY_CONFIG = {
  displayModeBar: false, responsive: true, staticPlot: false,
  scrollZoom: false, doubleClick: false
};
```

---

## 10. Comprovacions finals abans de commitar

1. Obre `index.html` directament (file://) i comprova que les 8 passes renderitzen sense errors a la consola
2. Comprova que els eixos Y no es queden "enganxats" entre transicions (és el motiu de fer `newPlot` enlloc de `react`)
3. Obre `guio.html` i verifica que es llegeix còmodament a 1 metre de distància (tipografia gran)
4. Obre `analisi.html` i verifica que la prosa flueix com una pàgina d'article
5. Substitueix aquest README per un README curt; mou aquest a `BUILD_BRIEF.md`
6. Commit únic: `feat: initial PAC3 storytelling project`

---

## Annex A — Textos exactes dels 8 passos de l'storytelling

### Pas 1 (Acte I · Introducció)
**Títol**: Comencem pel volum

> Tots dos hotels reben més reserves a l'estiu. La `[tag-city]City Hotel[/tag]` de Lisboa, més gran, en concentra més en termes absoluts. La `[tag-resort]Resort Hotel[/tag]` de l'Algarve la segueix amb un patró similar.
>
> Fins aquí, res estrany. Dos hotels portuguesos amb pic estival. Una història coneguda.

### Pas 2 (Acte II · Rising action)
**Títol**: Però mirem el preu

> Ara canviem la vista: en comptes de comptar reserves, mesurem el **preu mitjà per nit** que paga cada client. I la història es trenca.
>
> La `[tag-city]City[/tag]` es manté en una franja estreta tot l'any: `[num]€84[/num]` al gener, `[num]€123[/num]` al maig. Pugen els preus, sí, però poc.

### Pas 3 (Acte III · Clímax) — marcar `.step.climax`
**Títol**: L'agost no és igual per a tothom

> La línia del `[tag-resort]Resort[/tag]` es dispara. De `[num]€50[/num]` al novembre a `[num]€189[/num]` a l'agost. **Multiplica el preu per 3,8**. Mentrestant, la City amb prou feines puja 1,5×.
>
> *[paràgraf amb classe `.emphasis`]* No estem davant del mateix tipus de negoci. Un sol número, l'agost, els fa irreconciliables.

### Pas 4 (Acte IV · Falling action)
**Títol**: Quanta estona es queden

> Si el preu varia tant, què més canvia? Comencem per l'**estada mitjana**. Al Resort, els clients que arriben al gener es queden 3 nits. Els que arriben al juny, 5,4. **Vacances reals.**
>
> A la City, el patró és pla: entre 2,8 i 3,3 nits tot l'any. Sempre *city break*.

### Pas 5 (Acte IV · Falling action)
**Títol**: Qui ve, i amb qui

> El percentatge de reserves amb **nens o nadons** al Resort passa del `[num]4%[/num]` a l'hivern al `[num]20%[/num]` a l'agost. És literalment un altre lloc: a l'hivern, parelles i jubilats; a l'estiu, famílies.
>
> La City també creix en famílies estivals, però discreta: del 3% al 12%.

### Pas 6 (Acte IV · Falling action)
**Títol**: D'on vénen

> A l'hivern, el Resort és un destí **local**: 55% portuguesos, 14% britànics buscant sol. A l'estiu hi arriben espanyols, irlandesos, fins i tot xinesos.
>
> La City té una barreja europea més estable: francesos, alemanys, italians, tot l'any. **El Resort es transforma. La City respira igual.**

### Pas 7 (Acte IV · Falling action)
**Títol**: I al final, els ingressos

> La conseqüència econòmica és brutal. El Resort guanya el `[num]54,6%[/num]` dels seus ingressos anuals només al Q3 (jul-set). **Més de la meitat de l'any en tres mesos.**
>
> La City reparteix: el seu Q3 és el 35%, però amb un Q2 (30,6%) gairebé igual de fort. Negoci pla; risc pla.

### Pas 8 (Acte V · Resolució) — marcar `.step.final`
**Títol**: Dos negocis, una taula

> La columna `<code>hotel</code>` del dataset té només dos valors: *Resort* i *City*. Però darrere d'aquesta etiqueta hi ha dos models radicalment diferents: un negoci **estacional** que viu de l'estiu i que es transforma cada any, i un negoci **constant** que rep clients europeus tot l'any al mateix ritme.
>
> *[`.emphasis`]* Qualsevol model que els tracti igual — predicció de cancel·lacions, pricing dinàmic, inversió en plantilla — començarà amb un error d'origen. **El calendari no és un detall: és l'eix.**

---

## Annex B — Contingut complet de `guio.html`

### Part 1 — Títol i descripció (10% · ~30 s)

**Beat únic** · *Pantalla*: portada del storytelling visible.

*Lectura*:
> "Aquesta visualització es titula *Dos hotels, un agost*. És un storytelling de dades que mostra com darrere d'una mateixa categoria — *hotel* — hi ha amagats dos models de negoci radicalment diferents. I que un sol número, el preu de l'agost, és tot el que cal per fer-los visibles."

---

### Part 2 — Dataset i analítica visual (20% · ~1 min)

**Beat 1** (~15 s) · *Pantalla*: portada de l'article Antonio et al. 2019 / notebook obert.

*Lectura*:
> "Les dades vénen de l'article de l'Antonio, Almeida i Nunes publicat a Data in Brief el 2019. Recullen totes les reserves de dos hotels portuguesos — un resort a l'Algarve i un city hotel a Lisboa — entre juliol de 2015 i agost de 2017. Són 119.390 reserves amb 32 variables cada una: data d'arribada, nacionalitat, preu, si la reserva es va cancel·lar, tipus d'habitació, segment de mercat..."

**Beat 2** (~20 s) · *Pantalla*: cel·les del notebook amb describe(), histograma adults, gràfic adr ordenat.

*Lectura*:
> "L'anàlisi visual mostra problemes evidents: hi ha reserves amb fins a 55 adults, preus per nit negatius o superiors als cinc mil euros, estades de zero nits sense ocupants. Aplicant la neteja proposada al notebook docent — eliminar aquests valors anòmals i tractar els valors absents — el dataset queda en 117.398 reserves vàlides, que és sobre el que treballo a partir d'aquí."

**Beat 3** (~25 s) · *Pantalla*: histograma ADR per hotel, gràfic temporal reserves/dia.

*Lectura*:
> "Comparant els dos hotels veig que les distribucions de preu són clarament diferents. I quan creuo el preu amb el calendari apareix la troballa que motiva la història: el resort multiplica el preu mig per 3,8 entre l'hivern i l'agost, mentre que el city hotel amb prou feines puja 1,5. Una diferència tan gran que suggereix que no estem davant del mateix tipus de negoci. La història del meu storytelling parteix d'aquí."

---

### Part 3 — Eina i funcionalitats (10% · ~30 s)

**Beat únic** · *Pantalla*: vista del repositori a GitHub i de la URL pública.

*Lectura*:
> "He fet l'analítica visual amb Python i pandas. La visualització és un HTML estàtic amb Plotly.js per als gràfics interactius i Scrollama per al control de scroll. Tot està hostatjat a GitHub Pages. He triat aquesta combinació en comptes d'una eina com Flourish per tenir control total sobre el disseny editorial i perquè em queda com a portfoli."

---

### Part 4 — Navegació/animació (25% · ~1 min 30 s)

**Beat 1** (~15 s) · *Pantalla*: hero. Fer scroll molt lent.

*Lectura*:
> "Comença amb el títol i les xifres clau del dataset."

**Beat 2** (~15 s) · *Pantalla*: pas 1 (volum).

*Lectura*:
> "Primer veiem el volum de reserves per mes. Tots dos hotels creixen a l'estiu. Res estrany."

**Beat 3** (~10 s) · *Pantalla*: pas 2 (ADR City emphasized).

*Lectura*:
> "Però mirem el preu. La City es manté plana."

**Beat 4** (~15 s) · *Pantalla*: pas 3 (clímax, esperar a que es vegi la banda agost i les anotacions).

*Lectura*:
> "I aquí és on apareix el descobriment. La línia del Resort es dispara fins a 189 euros a l'agost: multiplica el preu per 3,8."

**Beat 5** (~25 s) · *Pantalla*: passos 4, 5, 6 en seqüència.

*Lectura*:
> "Què més canvia? Les estades es fan més llargues al Resort, les famílies passen del 4% al 20%, i l'origen dels hostes es diversifica: espanyols, irlandesos, xinesos arriben només a l'estiu."

**Beat 6** (~15 s) · *Pantalla*: pas 7 (ingressos) i pas 8 (síntesi).

*Lectura*:
> "I el Resort acaba concentrant més de la meitat dels seus ingressos en un sol trimestre. La City, en canvi, reparteix tot l'any."

---

### Part 5 — Justificació dels elements visuals (20% · ~1 min)

**Beat 1 — Tipus de gràfic** (~20 s) · *Pantalla*: passes 1, 6 i 7 alternant.

*Lectura*:
> "He triat els gràfics seguint el diagrama d'Abela citat per Ramos et al. 2024. Per a sèries temporals — volum, preu, estada — línies amb suavització spline. Per a la composició al llarg del temps de famílies, gràfic d'àrea. Per a comparacions entre poques categories — països i trimestres — barres agrupades."

**Beat 2 — Color** (~20 s) · *Pantalla*: clímax (pas 3).

*Lectura*:
> "La paleta és terracota i blau pissarra sobre paper crema. Vull evocar la Mediterrània portuguesa, però sobretot dos colors saturats i contrastats perquè la divergència de l'agost sigui visible sense haver de llegir la llegenda. La banda daurada marca el moment clau."

**Beat 3 — Tipografia i interacció** (~20 s) · *Pantalla*: hero + scroll cap a un pas.

*Lectura*:
> "La tipografia combina Fraunces per als titulars, Newsreader per al cos i JetBrains Mono per als números. És una estètica editorial pensada per allunyar-se del dashboard genèric. Pel que fa a la interacció, el scroll funciona com a metàfora del temps que passa, hi ha hover per als valors exactes, i anotacions fixes al clímax dirigeixen la lectura."

---

### Part 6 — Reflexió final (15% · ~45 s)

**Beat únic** · *Pantalla*: torna al pas 8 (síntesi) i acaba a la coda.

*Lectura*:
> "Aquesta visualització mostra que les agregacions anuals enganyen. Si miréssim només la mitjana global d'ADR — 103 euros — no veuríem que un dels hotels duplica el preu mig any i l'altre amb prou feines es mou.
>
> La història capta l'atenció perquè planteja un misteri al començament — les dues corbes semblen iguals fins que canviem la vista — construeix tensió cap al clímax visual de l'agost, i tanca amb una conclusió que té implicacions pràctiques: qualsevol model de revenue management que tracti aquests dos hotels igual començarà amb un error d'origen.
>
> Gràcies."

---

## Annex C — Contingut de `analisi.html`

### Introducció

> Aquesta pàgina documenta el procés d'anàlisi visual que va portar a triar la història *Dos hotels, un agost*. El procés segueix les fases proposades per Ramos, Ashqar & Contreiras (2024): planificació, definició dels insights, contextualització, adaptació al públic, i consolidació.

### 1. El dataset

> Antonio, Almeida i Nunes (2019) van publicar a *Data in Brief* dues bases de dades de reserves d'hotel portugueses, recopilades des dels sistemes PMS dels dos hotels. Cada observació representa una reserva i té 31 variables. Aquí s'analitzen totes dues conjuntament: 119.390 reserves amb arribada prevista entre l'1 de juliol de 2015 i el 31 d'agost de 2017.

### 2. Detecció d'anomalies

> L'anàlisi exploratori amb `describe()` i histogrames revela diverses anomalies:
> - **Adults**: màxim de 55 (un sol cas extrem)
> - **Children**: màxim de 10 amb 4 NA
> - **Babies**: màxim de 10
> - **ADR**: valors negatius i un pic anòmal a 5.400 €
> - **Estades**: alguna reserva amb 0 nits totals
> - **Ocupació**: alguna reserva amb 0 ocupants totals

### 3. Neteja aplicada

> Seguint les regles del notebook docent:
> 1. Eliminar reserves amb `adults ≥ 10`
> 2. Limitar `adr` al rang `[0, 1000)`
> 3. Eliminar `adr == 0` (estades de cost zero)
> 4. Eliminar estades de 0 nits totals
> 5. Eliminar reserves sense ocupants
> 6. Substituir `NA` de `children` per 0
>
> **Resultat**: 119.390 → **117.398 reserves vàlides**.

### 4. Primera comparació entre hotels

> Els histogrames d'ADR per hotel mostren distribucions diferents: el City Hotel concentra preus al voltant de 100 €, el Resort té una distribució més asimètrica amb cua llarga cap a valors alts.

### 5. Patró estacional

> Comptant les reserves per data d'arribada al llarg dels tres anys, es veu clarament un patró estacional fort: pic a l'estiu, vall a l'hivern. Aquesta observació és consistent amb el sector turístic portuguès.

### 6. El descobriment

> El gir narratiu apareix en creuar **preu × mes × hotel**:
> - **Resort**: ADR mínim 50 € (novembre), màxim 189 € (agost). Ràtio pic/vall **3,8×**.
> - **City**: ADR mínim 84 € (gener), màxim 123 € (maig). Ràtio pic/vall **1,5×**.
>
> Aquesta divergència — tres punts cinc vegades el ràtio en un cas, només un punt cinc en l'altre — és l'evidència que motiva la història. No és el mateix tipus de negoci.

### 7. Referències

> - Antonio, N., de Almeida, A., & Nunes, L. (2019). Hotel booking demand datasets. *Data in Brief*, 22, 41–49. https://doi.org/10.1016/j.dib.2018.11.126
> - Ramos, C. M. Q., Ashqar, R. I., & Contreiras, A. (2024). Design of Dashboards for CRM Associated with Health and Wellbeing Tourism. *HCII 2024*, LNCS 15376, 154–172. https://doi.org/10.1007/978-3-031-76809-5_12
> - Minguillón, J. (2025). Visual analytics of hotel bookings data [Notebook docent]. UOC.

---

## Annex D — README curt final (per substituir aquest)

```markdown
# Dos hotels, un agost

Storytelling de dades sobre l'estacionalitat oculta a les reserves de dos hotels portuguesos.

**PAC3 · Visualització de Dades · UOC**

🔗 **Storytelling**: https://EL-TEU-USUARI.github.io/EL-TEU-REPO/

## Estructura

- `index.html` — storytelling principal (scrollytelling amb Plotly)
- `guio.html` — guió del vídeo (per a ús intern, no enllaçat)
- `analisi.html` — documentació de l'anàlisi visual

## Dades

Antonio, N., Almeida, A., & Nunes, L. (2019). *Hotel booking demand datasets*. Data in Brief, 22, 41-49.

## Activar GitHub Pages

Settings → Pages → Source: branch `main` / root → Save.

Veure `BUILD_BRIEF.md` per a la documentació tècnica del projecte.
```

---

**Fi del brief.** Genera tot el projecte ara.