db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      dura: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $addFields: {
      emMinutos: {
        $ceil: {
          $divide: ["$dura", 60000],
        },
      },
    },
  },
  {
    $sort: {
      emMinutos: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: "$emMinutos",
      _id: 0,
    },
  },
]);
