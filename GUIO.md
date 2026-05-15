# Guió del vídeo · PAC3

**Dos hotels, un agost** — UOC · Visualització de Dades · maig 2026
Marc Garreta Basora

Vídeo de 4–6 minuts. 6 parts.
Pantalla a la dreta de la càmera. *Cursiva = text a llegir.*

---

## Índex

| #  | Part                       | Pes      | Temps         |
| -- | -------------------------- | -------- | ------------- |
| 01 | Títol i descripció         | 10%      | ~30 s         |
| 02 | Dataset i analítica visual | 20%      | ~1 min        |
| 03 | Eina i funcionalitats      | 10%      | ~30 s         |
| 04 | Navegació i animació       | 25%      | ~1 min 30 s   |
| 05 | Justificació visual        | 20%      | ~1 min        |
| 06 | Reflexió final             | 15%      | ~45 s         |
|    | **Total**                  | **100%** | **~5 min**    |

---

## Part 01 — Títol i descripció · 10% · ~30 s

**Beat únic** · *Pantalla: portada del storytelling visible.*

> *Aquesta visualització es titula Dos hotels, un agost. És un storytelling de dades que mostra com darrere d'una mateixa categoria — hotel — hi ha amagats dos models de negoci radicalment diferents. I que un sol número, el preu de l'agost, és tot el que cal per fer-los visibles.*

---

## Part 02 — Dataset i analítica visual · 20% · ~1 min

**Beat 1** · ~15 s · *Pantalla: portada de l'article Antonio et al. 2019 o notebook obert.*

> *Les dades vénen de l'article de l'Antonio, Almeida i Nunes publicat a Data in Brief el 2019. Recullen totes les reserves de dos hotels portuguesos — un resort a l'Algarve i un city hotel a Lisboa — entre juliol de 2015 i agost de 2017. Són 119.390 reserves amb 32 variables cada una: data d'arribada, nacionalitat, preu, si la reserva es va cancel·lar, tipus d'habitació, segment de mercat…*

**Beat 2** · ~20 s · *Pantalla: cel·les del notebook amb `describe()`, histograma adults, gràfic ADR ordenat.*

> *L'anàlisi visual mostra problemes evidents: hi ha reserves amb fins a 55 adults, preus per nit negatius o superiors als cinc mil euros, estades de zero nits sense ocupants. Aplicant la neteja proposada al notebook docent — eliminar aquests valors anòmals i tractar els valors absents — el dataset queda en 117.398 reserves vàlides, que és sobre el que treballo a partir d'aquí.*

**Beat 3** · ~25 s · *Pantalla: histograma ADR per hotel, gràfic temporal reserves/dia.*

> *Comparant els dos hotels veig que les distribucions de preu són clarament diferents. I quan creuo el preu amb el calendari apareix la troballa que motiva la història: el resort multiplica el preu mig per 3,8 entre l'hivern i l'agost, mentre que el city hotel amb prou feines puja 1,5. Una diferència tan gran que suggereix que no estem davant del mateix tipus de negoci. La història del meu storytelling parteix d'aquí.*

---

## Part 03 — Eina i funcionalitats · 10% · ~30 s

**Beat únic** · *Pantalla: vista del repositori a GitHub i de la URL pública.*

> *He fet l'analítica visual amb Python i pandas. La visualització és un HTML estàtic amb Plotly.js per als gràfics interactius i Scrollama per al control de scroll. Tot està hostatjat a GitHub Pages. He triat aquesta combinació en comptes d'una eina com Flourish per tenir control total sobre el disseny editorial i perquè em queda com a portfoli.*

---

## Part 04 — Navegació i animació · 25% · ~1 min 30 s

**Beat 1** · ~15 s · *Pantalla: hero. Fer scroll molt lent.*

> *Comença amb el títol i les xifres clau del dataset.*

**Beat 2** · ~15 s · *Pantalla: pas 1 — volum.*

> *Primer veiem el volum de reserves per mes. Tots dos hotels creixen a l'estiu. Res estrany.*

**Beat 3** · ~10 s · *Pantalla: pas 2 — ADR amb City emphasized.*

> *Però mirem el preu. La City es manté plana.*

**Beat 4** · ~15 s · *Pantalla: pas 3 — clímax. Esperar a veure la banda d'agost i les anotacions.*

> *I aquí és on apareix el descobriment. La línia del Resort es dispara fins a 189 euros a l'agost: multiplica el preu per 3,8.*

**Beat 5** · ~25 s · *Pantalla: passos 4, 5, 6 en seqüència.*

> *Què més canvia? Les estades es fan més llargues al Resort, les famílies passen del 4% al 20%, i l'origen dels hostes es diversifica: espanyols, irlandesos, xinesos arriben només a l'estiu.*

**Beat 6** · ~15 s · *Pantalla: pas 7 — ingressos. Pas 8 — síntesi.*

> *I el Resort acaba concentrant més de la meitat dels seus ingressos en un sol trimestre. La City, en canvi, reparteix tot l'any.*

---

## Part 05 — Justificació dels elements visuals · 20% · ~1 min

**Beat 1 · Tipus de gràfic** · ~20 s · *Pantalla: passos 1, 6 i 7 alternant.*

> *He triat els gràfics seguint el diagrama d'Abela citat per Ramos et al. 2024. Per a sèries temporals — volum, preu, estada — línies amb suavització spline. Per a la composició al llarg del temps de famílies, gràfic d'àrea. Per als orígens i els trimestres, un Sankey i barres agrupades respectivament.*

**Beat 2 · Color** · ~20 s · *Pantalla: clímax (pas 3).*

> *La paleta és terracota i blau pissarra sobre paper crema. Vull evocar la Mediterrània portuguesa, però sobretot dos colors saturats i contrastats perquè la divergència de l'agost sigui visible sense haver de llegir la llegenda. La banda daurada marca el moment clau.*

**Beat 3 · Tipografia i interacció** · ~20 s · *Pantalla: hero + scroll cap a un pas.*

> *La tipografia combina Fraunces per als titulars, Newsreader per al cos i JetBrains Mono per als números. És una estètica editorial pensada per allunyar-se del dashboard genèric. Pel que fa a la interacció, el scroll funciona com a metàfora del temps que passa, hi ha hover per als valors exactes, i anotacions fixes al clímax dirigeixen la lectura.*

---

## Part 06 — Reflexió final · 15% · ~45 s

**Beat únic** · *Pantalla: torna al pas 8 (síntesi) i acaba a la coda.*

> *Aquesta visualització mostra que les agregacions anuals enganyen. Si miréssim només la mitjana global d'ADR — 103 euros — no veuríem que un dels hotels duplica el preu mig any i l'altre amb prou feines es mou.*
>
> *La història capta l'atenció perquè planteja un misteri al començament — les dues corbes semblen iguals fins que canviem la vista — construeix tensió cap al clímax visual de l'agost, i tanca amb una conclusió que té implicacions pràctiques: qualsevol model de revenue management que tracti aquests dos hotels igual començarà amb un error d'origen.*
>
> *Gràcies.*

---

## Notes de ritme

- Respira entre parts.
- Pausa més llarga abans del clímax (Part 04 · Beat 4).
- Tanca la frase final amb mig segon de silenci abans de tallar el vídeo.
- **Total objectiu**: 5 min ± 30 s.
