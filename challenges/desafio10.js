db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      diferencaTempo: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: {
        $divide: ["$diferencaTempo", 3.6e+6],
      },
      _id: 0,
    },
  },
  {
    $project: {
      tipo: "$tipo",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
