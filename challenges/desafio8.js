db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { voo_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$airline.name", "$$voo_name"] },
              ],
            },
          },
        },
      ],
      as: "voosbrabos",
    } },
  {
    $unwind: "$voosbrabos",
  },
  {
    $match: {
      "voosbrabos.airplane": {
        $in: ["747", "380"],
      },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
