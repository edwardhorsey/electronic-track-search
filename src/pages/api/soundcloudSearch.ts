// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import type { NextApiRequest, NextApiResponse } from 'next';

// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<MixesDbResultsData>,
// ) {
//   const { artist, track } = req.query;
//   const searchString = `${artist} ${track}`;

//   const soundcloudResults = await fetch(
//     requestSC(searchString, process.env.keygmixesdb as string),
//   )
//     .then((data) => data.json())
//     .then((jsonData) => mixesDbTitles(jsonData.items))
//     .catch((error) => error);

//   res.status(200).json({
//     name: 'Soundcloud search',
//     soundcloudResults,
//   });
// }
export {};
