db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00Z"),
        $lt: ISODate("2016-03-10T23:59Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      diferencaTempo: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      transformandoEmMinutos: {
        $divide: ["$diferencaTempo", 60000],
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: "$transformandoEmMinutos",
      },
      _id: 0,
    },
  },
]);
