const {
  getLikes,
  getPerfumeByName,
  getPerfumeByBrand,
  findByAccordsAndNotes,
} = require("../data-access-layer/Perfumes-DAL");

const {
  recommendTopPerfumes,
  recommendPerfumesForSituation,
} = require("../AI/Perfumes-AI");

async function GetUserLikes(_id, amount) {
  try {
    const likes = await getLikes(_id);

    if (likes.FavoritePerfumes.length == 0) {
      throw new Error("No favorite perfumes found for this user");
    }

    if (amount === null || amount >= likes.FavoritePerfumes.length) {
      return likes.FavoritePerfumes;
    }

    return likes.FavoritePerfumes.slice(0, amount);
  } catch (error) {
    throw error;
  }
}

async function SearchByName(name, limit, skip) {
  try {
    const data = await getPerfumeByName(name, limit, skip);

    return data;
  } catch (error) {
    throw error;
  }
}

async function GetPerfumeData(name, _id, YearOfBirth) {
  try {
    const PerfumeData = await getPerfumeByName(name, 1, 0);

    const UserLikes = await getLikes(_id);
    const Like = UserLikes.FavoritePerfumes.includes(name);

    const SameBrand = await getPerfumeByBrand(
      PerfumeData[0].Brand,
      PerfumeData[0].Gender
    );

    const SimilarPerfumes = await findByAccordsAndNotes(PerfumeData[0], _id);

    const AiData = await recommendTopPerfumes(
      UserLikes,
      SimilarPerfumes,
      YearOfBirth
    );

    let SimilarPerfumesData = [];

    for (const item of AiData) {
      const data = SimilarPerfumes.find(
        (p) => p.Perfume.toLowerCase() === item.toLowerCase()
      );

      SimilarPerfumesData.push(data);
    }

    return {
      PerfumeData,
      Like,
      SameBrand,
      SimilarPerfumes: SimilarPerfumesData,
    };
  } catch (error) {
    throw error;
  }
}

async function GetBySituation(situation, id, YearOfBirth, Gender) {
  try {
    const UserLikes = await getLikes(id);

    const AiData = await recommendPerfumesForSituation(
      situation,
      YearOfBirth,
      Gender,
      UserLikes.FavoritePerfumes
    );

    let PerfumesData = [];

    for (const item of AiData) {
      const data = await getPerfumeByName(item, 1, 0);

      PerfumesData.push({
        Perfume: data[0].Perfume,
        Brand: data[0].Brand,
        Year: data[0].Year ?? null,
      });
    }

    return PerfumesData;
  } catch (error) {
    throw error;
  }
}

module.exports = { GetUserLikes, SearchByName, GetPerfumeData, GetBySituation };
