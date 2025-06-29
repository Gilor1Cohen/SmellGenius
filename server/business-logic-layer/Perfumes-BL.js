const {
  getLikes,
  getPerfumeByName,
  getPerfumeByBrand,
  findByAccordsAndNotes,
  getPerfumeByCountry,
  getPerfumeBySmells,
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

function topN(items, n) {
  const freq = items.reduce((acc, v) => {
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

  return sorted.slice(0, n);
}

function topTwoFrequent(arr) {
  const freq = {};
  for (const v of arr) freq[v] = (freq[v] || 0) + 1;
  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([v]) => v);
}

async function GetBuyingRecommendations(_id, Gender) {
  try {
    const UserLikes = await getLikes(_id);

    let PerfumesCountries = [];
    let PerfumesBrands = [];
    let PerfumesSmells = [];

    for (const item of UserLikes.FavoritePerfumes) {
      const data = await getPerfumeByName(item, 1, 0);

      PerfumesCountries.push(data[0].Country);

      PerfumesBrands.push(data[0].Brand);

      PerfumesSmells.push({
        Top: data[0].Top,
        Middle: data[0].Middle,
        Base: data[0].Base,
        mainaccord1: data[0].mainaccord1,
        mainaccord2: data[0].mainaccord2,
        mainaccord3: data[0].mainaccord3,
        mainaccord4: data[0].mainaccord4,
        mainaccord5: data[0].mainaccord5,
      });
    }

    const top3Countries = topN(PerfumesCountries, 3);

    const top3Brands = topN(PerfumesBrands, 3);

    let brandsData = [[], [], []];
    let countriesData = [[], [], []];

    for (let i = 0; i < 3; i++) {
      const itemBrands = top3Brands[i];
      const itemCountries = top3Countries[i];

      const brands = await getPerfumeByBrand(
        itemBrands,
        Gender.toLowerCase() === "male" ? "men" : "women"
      );

      for (const item of brands) {
        brandsData[i].push({
          Perfume: item.Perfume,
          Brand: item.Brand,
          Year: item.Year,
        });
      }

      const countries = await getPerfumeByCountry(
        itemCountries,
        Gender.toLowerCase() === "male" ? "men" : "women"
      );

      for (const item of countries) {
        countriesData[i].push({
          Perfume: item.Perfume,
          Brand: item.Brand,
          Year: item.Year,
        });
      }
    }

    const mostTop = topTwoFrequent(PerfumesSmells.map((s) => s.Top));
    const mostMiddle = topTwoFrequent(PerfumesSmells.map((s) => s.Middle));
    const mostBase = topTwoFrequent(PerfumesSmells.map((s) => s.Base));
    const mostAccord1 = topTwoFrequent(
      PerfumesSmells.map((s) => s.mainaccord1)
    );
    const mostAccord2 = topTwoFrequent(
      PerfumesSmells.map((s) => s.mainaccord2)
    );
    const mostAccord3 = topTwoFrequent(
      PerfumesSmells.map((s) => s.mainaccord3)
    );
    const mostAccord4 = topTwoFrequent(
      PerfumesSmells.map((s) => s.mainaccord4)
    );
    const mostAccord5 = topTwoFrequent(
      PerfumesSmells.map((s) => s.mainaccord5)
    );

    const smells = await getPerfumeBySmells(
      [
        ...mostTop,
        ...mostMiddle,
        ...mostBase,
        ...mostAccord1,
        ...mostAccord2,
        ...mostAccord3,
        ...mostAccord4,
        ...mostAccord5,
      ],
      Gender.toLowerCase() === "male" ? "men" : "women"
    );

    let smellsData = [];

    for (const item of smells) {
      smellsData.push({
        Perfume: item.Perfume,
        Brand: item.Brand,
        Year: item.Year,
      });
    }

    return [
      {
        Arr1Name: top3Brands[0],
        Arr1: brandsData[0],
        Arr2Name: top3Brands[1],
        Arr2: brandsData[1],
        Arr3Name: top3Brands[2],
        Arr3: brandsData[2],
      },
      {
        Arr1Name: top3Countries[0],
        Arr1: countriesData[0],
        Arr2Name: top3Countries[1],
        Arr2: countriesData[1],
        Arr3Name: top3Countries[2],
        Arr3: countriesData[2],
      },
      { smellsData },
    ];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  GetUserLikes,
  SearchByName,
  GetPerfumeData,
  GetBySituation,
  GetBuyingRecommendations,
};
