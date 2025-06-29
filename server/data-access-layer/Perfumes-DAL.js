const User = require("../models/Users.model");
const Perfumes = require("../models/Perfumes.model");

async function getLikes(_id) {
  const user = await User.findOne({ _id }, "FavoritePerfumes");

  if (!user) {
    throw new Error(`User with id ${_id} not found`);
  }

  return user;
}

async function getPerfumeByName(name, limit, skip) {
  const data = await Perfumes.find({
    Perfume: {
      $regex: name,
      $options: "i",
    },
  })
    .skip(skip)
    .limit(limit);

  if (!data) {
    throw new Error("No perfume found.");
  }

  return data;
}

async function getPerfumeByBrand(Brand, Gender) {
  const data = await Perfumes.find({
    Brand: Brand,
    Gender: Gender,
  }).limit(15);

  if (!data) {
    throw new Error("No perfume found.");
  }

  return data;
}

async function findByAccordsAndNotes(PerfumeData, _id) {
  const data = [];

  for (let i = 1; i <= 5; i++) {
    const field = `mainaccord${i}`;
    const value = PerfumeData[field];
    if (!value) continue;

    const results = await Perfumes.find(
      {
        [field]: value,
        Gender: PerfumeData.Gender,
        _id: { $ne: PerfumeData._id },
      },
      { Perfume: 1, Year: 1, Brand: 1, _id: 0 }
    )
      .limit(10)
      .lean();

    data.push(...results);
  }

  for (const field of ["Top", "Middle"]) {
    const notes = (PerfumeData[field] || "")
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n);

    for (const note of notes) {
      const results = await Perfumes.find(
        {
          [field]: { $regex: `\\b${note}\\b`, $options: "i" },
          Gender: PerfumeData.Gender,
          _id: { $ne: PerfumeData._id },
        },
        { Perfume: 1, Year: 1, Brand: 1, _id: 0 }
      )
        .limit(10)
        .lean();

      data.push(...results);
    }
  }

  return data;
}

async function getPerfumeByCountry(Country, Gender) {
  const data = await Perfumes.find({
    Country: Country,
    Gender: Gender,
  }).limit(15);

  if (!data) {
    throw new Error("No perfume found.");
  }

  return data;
}

async function getPerfumeBySmells(smells, gender) {
  const pipeline = [
    { $match: { Gender: gender } },
    {
      $addFields: {
        _allSmells: [
          "$Top",
          "$Middle",
          "$Base",
          "$mainaccord1",
          "$mainaccord2",
          "$mainaccord3",
          "$mainaccord4",
          "$mainaccord5",
        ],
      },
    },
    {
      $addFields: {
        matchedCount: {
          $size: { $setIntersection: ["$_allSmells", smells] },
        },
      },
    },
    { $match: { matchedCount: { $gte: 2 } } },
    { $limit: 15 },
    { $project: { _allSmells: 0, matchedCount: 0 } },
  ];

  const results = await Perfumes.aggregate(pipeline);
  if (!results || results.length === 0) {
    throw new Error(
      "No perfume found with at least " + minMatches + " matching smells."
    );
  }
  return results;
}

module.exports = {
  getLikes,
  getPerfumeByName,
  getPerfumeByBrand,
  findByAccordsAndNotes,
  getPerfumeByCountry,
  getPerfumeBySmells,
};
