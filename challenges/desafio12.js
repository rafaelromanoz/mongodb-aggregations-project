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
      _id: {
        diaDasemana: "$diaDaSemana",
        estacao: "$startStationName",
      },
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
      nomeEstacao: "$_id.estacao",
      total: "$total",
      _id: 0,
    },
  },
  {
    $limit: 1,
  },
]);
