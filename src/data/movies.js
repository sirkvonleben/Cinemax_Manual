// src/data/movies.js

export const movies = [
  // En cartelera (releaseDate en el pasado)
  {
    id: 'now-1',
    title: 'Película activa 1',
    image: 'https://via.placeholder.com/300x170?text=En+Cartelera',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1h 40min',
    format: 'Doblada',
    cinema: 'Cinemark Gamarra',
    schedule: 'Sábado 5 Abril 2026 | 08:00PM',
    genre: 'Acción',
    synopsis: 'Una épica aventura de prueba.',
    releaseDate: '2025-04-05',
    cast: [
      {
        name: 'Sharlto Copley',
        character: 'Wikus van de Merwe',
        avatar:
          'https://static.wikia.nocookie.net/fx-powers/images/0/00/Sharlto-copley.jpg/revision/latest?cb=20150403174440',
      },
      {
        name: 'Vanessa Haywood',
        character: 'Tania van de Merwe',
        avatar: 'https://via.placeholder.com/140?text=Vanessa+Haywood',
      },
    ],
  },
  {
    id: 'now-2',
    title: 'Película activa 2',
    image: 'https://via.placeholder.com/300x170?text=En+Cartelera',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '1h 50min',
    format: '2D',
    cinema: 'Cinemark Centro',
    schedule: 'Viernes 21 Junio 2026 | 07:30PM',
    genre: 'Comedia',
    synopsis: 'Risas sin parar en cada escena.',
    releaseDate: '2025-05-10',
    cast: [
      {
        name: 'Jason Cope',
        character: 'Grey Bradnam',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Jason_Cope.jpg',
      },
    ],
  },
  {
    id: 'now-3',
    title: 'Película activa 3',
    image: 'https://via.placeholder.com/300x170?text=En+Cartelera',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '2h 05min',
    format: '4DX',
    cinema: 'Cinemax Gamarra',
    schedule: 'Miércoles 2 Julio 2026 | 06:00PM',
    genre: 'Drama bélico',
    synopsis: 'Amor y sacrificio en medio del conflicto.',
    releaseDate: '2025-03-12',
    cast: [
      {
        name: 'David James',
        character: 'Koobus Venter',
        avatar: 'https://via.placeholder.com/140?text=David+James',
      },
      {
        name: 'Eugene Khumbanyiwa',
        character: 'Obesandjo',
        avatar: 'https://via.placeholder.com/140?text=Eugene+Khumbanyiwa',
      },
    ],
  },

  // Próximos estrenos (releaseDate en el futuro)
  {
    id: 'u1',
    title: 'Aventura Espacial',
    image: 'https://via.placeholder.com/300x170?text=Aventura+Espacial',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    genre: 'Ciencia ficción',
    synopsis: 'Una odisea en las estrellas que desafía la imaginación.',
    duration: '2h 10min',
    format: 'IMAX',
    cinema: 'CineMax Solar',
    schedule: 'Domingo 10 Mayo 2026 | 09:00PM',
    releaseDate: '2099-01-01',
    cast: [
      {
        name: 'Actor Uno',
        character: 'Comandante Zeta',
        avatar: 'https://via.placeholder.com/140?text=Actor+Uno',
      },
    ],
  },
  {
    id: 'u2',
    title: 'Misterio en la Ciudad',
    image: 'https://via.placeholder.com/300x170?text=Misterio+en+la+Ciudad',
    trailer: 'https://www.youtube.com/embed/oHg5SJYRHA0',
    genre: 'Thriller',
    synopsis: 'Un detective sigue pistas que no deberían existir.',
    duration: '1h 50min',
    format: '2D',
    cinema: 'CineMax Centro',
    schedule: 'Viernes 21 Junio 2026 | 07:30PM',
    releaseDate: '2099-02-15',
    cast: [
      {
        name: 'Actriz Dos',
        character: 'Detective Luna',
        avatar: 'https://via.placeholder.com/140?text=Actriz+Dos',
      },
    ],
  },
  {
    id: 'u3',
    title: 'Corazones en Guerra',
    image: 'https://via.placeholder.com/300x170?text=Corazones+en+Guerra',
    trailer: 'https://www.youtube.com/embed/5NV6Rdv1a3I',
    genre: 'Drama bélico',
    synopsis: 'Amor y sacrificio en medio del conflicto.',
    duration: '2h 5min',
    format: '4DX',
    cinema: 'CineMax Gamarra',
    schedule: 'Miércoles 2 Julio 2026 | 06:00PM',
    releaseDate: '2099-03-05',
    cast: [
      {
        name: 'Actor Tres',
        character: 'Capitán Valor',
        avatar: 'https://via.placeholder.com/140?text=Actor+Tres',
      },
    ],
  },
];
