db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /Won\s\d\sOsca[rs|r]/i,
      },
    },
  },
  {
    $group: {
      _id: null,
      max_im: {
        $max: "$imdb.rating",
      },
      min_im: {
        $min: "$imdb.rating",
      },
      avg_im: {
        $avg: "$imdb.rating",
      },
      desv_padr: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$max_im",
      menor_rating: "$min_im",
      media_rating: {
        $round: ["$avg_im", 1],
      },
      desvio_padrao: {
        $round: ["$desv_padr", 1],
      },
    },
  },
]);
