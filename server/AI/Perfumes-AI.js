const { openai } = require("./openai");

async function recommendTopPerfumes(UserLikes, SimilarPerfumes, YearOfBirth) {
  try {
    const userPrompt = `
          Here are perfumes similar to your reference:
          ${JSON.stringify(SimilarPerfumes, null, 2)}

          Your favorite perfumes:
          ${JSON.stringify(UserLikes, null, 2)}


          User's birth year: ${YearOfBirth}

          Please pick the 20 perfumes from the "similar" list that the user is most likely to enjoy, and return them in the "filteredPerfumes" array.
                      `;

    const functions = [
      {
        name: "filterPerfumeNames",
        description:
          "From a list of candidate perfume names and the user's favorites & birth year, pick up to 20 names the user will most enjoy.",
        parameters: {
          type: "object",
          properties: {
            similarNames: {
              type: "array",
              description: "Array of up to ~110 perfume names (strings).",
              items: { type: "string" },
            },
            favoriteNames: {
              type: "array",
              description: "Perfume names the user already likes.",
              items: { type: "string" },
            },
            birthYear: {
              type: "integer",
              description: "User's year of birth.",
            },
          },
          required: ["similarNames", "favoriteNames", "birthYear"],
        },
      },
    ];

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a perfume recommendation assistant.",
        },
        { role: "user", content: userPrompt },
      ],
      functions,
    });

    const args = JSON.parse(res.choices[0].message.function_call.arguments);

    return args.similarNames;
  } catch (error) {
    return [];
  }
}

async function recommendPerfumesForSituation(
  situation,
  YearOfBirth,
  Gender,
  UserLikes
) {
  try {
    const userPrompt = `
    You have this list of perfumes that the user already likes:
    ${JSON.stringify(UserLikes)}.

    Please select up to 3 perfumes from that list which best fit the following situation:
      - Situation: "${situation}"
      - User birth year: ${YearOfBirth}
      - User gender: ${Gender}
    `;

    const functions = [
      {
        name: "filterUserLikes",
        description:
          "Selects perfumes from the user's likes that fit the situation",
        parameters: {
          type: "object",
          properties: {
            filteredPerfumes: {
              type: "array",
              description:
                "Up to 3 perfume names, chosen from the user's likes, unchanged",
              items: {
                type: "string",
                enum: UserLikes,
              },
              maxItems: 3,
            },
          },
          required: ["filteredPerfumes"],
        },
      },
    ];

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a perfume recommendation assistant.",
        },
        { role: "user", content: userPrompt },
      ],
      functions,
    });

    const args = JSON.parse(res.choices[0].message.function_call.arguments);

    return args.filteredPerfumes;
  } catch (error) {
    return [];
  }
}

module.exports = { recommendTopPerfumes, recommendPerfumesForSituation };
