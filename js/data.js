// Dades agregades de l'anàlisi de hotel_bookings.csv (Antonio et al. 2019)
// Després de la neteja oficial del notebook docent: 117.398 reserves vàlides.
// Valors per hotel × mes (gener-desembre) calculats a notebooks/hotel_bookings.ipynb.

const HOTEL_DATA = {
  months_ca: ["Gen","Feb","Mar","Abr","Mai","Jun","Jul","Ago","Set","Oct","Nov","Des"],

  kpis: {
    total_bookings: 117398,
    n_hotels: 2,
    years: "2015-2017",
    cancel_rate_global: 37.5
  },

  resort: {
    n:        [2130, 3046, 3272, 3547, 3490, 3003, 4512, 4849, 3069, 3462, 2375, 2552],
    adr:      [50.9, 56.2, 58.6, 79.2, 80.3, 112.0, 157.3, 188.5, 94.4, 63.8, 49.5, 71.6],
    stays:    [2.96, 3.13, 4.17, 4.07, 4.35, 5.43, 5.36, 5.29, 5.07, 3.99, 3.65, 3.33],
    families: [4.9, 7.3, 5.7, 7.2, 7.7, 11.6, 17.9, 20.5, 6.4, 6.0, 4.0, 7.9],
    cancel:   [15.0, 26.0, 23.0, 30.0, 29.0, 33.0, 32.0, 34.0, 32.0, 28.0, 19.0, 24.0]
  },

  city: {
    n:        [3670, 4873, 6364, 7405, 8118, 7814, 7976, 8858, 7280, 7467, 4260, 4006],
    adr:      [84.1, 86.7, 93.1, 112.4, 123.3, 120.3, 112.3, 116.3, 111.8, 101.8, 89.9, 91.6],
    stays:    [3.03, 3.02, 3.07, 3.06, 2.86, 2.90, 3.15, 3.17, 2.80, 2.77, 3.00, 3.26],
    families: [6.0, 8.0, 5.0, 8.0, 4.0, 5.0, 11.0, 12.0, 4.0, 4.0, 3.0, 9.0],
    cancel:   [40.0, 39.0, 37.0, 47.0, 45.0, 45.0, 41.0, 41.0, 43.0, 44.0, 39.0, 43.0]
  },

  revenue_quarter: {
    labels: ["Q1 (gen-mar)", "Q2 (abr-jun)", "Q3 (jul-set)", "Q4 (oct-des)"],
    resort: [10.2, 23.0, 54.6, 12.1],
    city:   [16.6, 30.6, 34.9, 17.9]
  },

  countries: {
    resort: {
      countries: ["PRT","ESP","GBR","IRL","FRA","CN","ITA"],
      alta:     [45.9, 14.1, 11.9, 4.4, 3.1, 2.5, 0],
      baixa:    [54.6, 10.4, 13.7, 2.7, 4.1, 0, 1.9]
    },
    city: {
      countries: ["PRT","FRA","DEU","GBR","ESP","ITA"],
      alta:     [32.8, 10.7, 9.3, 8.4, 7.7, 5.2],
      baixa:    [39.1, 11.9, 4.8, 5.3, 7.3, 4.8]
    }
  },

  highlights: {
    resort_adr_low: 50, resort_adr_high: 189,
    city_adr_low: 84, city_adr_high: 123,
    resort_ratio: 3.8, city_ratio: 1.5,
    resort_q3_pct: 54.6, city_q3_pct: 34.9
  }
};
