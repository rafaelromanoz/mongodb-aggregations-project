db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  {
    $limit: 1,
  },
]);
