import { DiscogsResponse } from '../types';

export const discogsData: DiscogsResponse = {
    country: 'Germany',
    year: '2014',
    format: ['Vinyl', '12"', 'Stereo'],
    label: ['Blue Hour'],
    type: 'master',
    genre: ['Electronic'],
    style: ['Techno'],
    id: 1107260,
    barcode: [],
    user_data: { in_wantlist: false, in_collection: false },
    master_id: 1107260,
    master_url: 'https://api.discogs.com/masters/1107260',
    uri: '/Blue-Hour-Common-Ground/master/1107260',
    catno: 'BLUEHOUR004',
    title: 'Blue Hour - Common Ground',
    thumb: 'https://img.discogs.com/H8t6v5oSVVBWcZc-RFUbUvakUN0=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-6105267-1411206959-8636.jpeg.jpg',
    cover_image:
        'https://img.discogs.com/wTK2uc7BRplAFGD1urC5YqmV564=/fit-in/580x819/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6105267-1411206959-8636.jpeg.jpg',
    resource_url: 'https://api.discogs.com/masters/1107260',
    community: {
        want: 135,
        have: 222,
    },
};

export const mockData = {
    discogsResults: discogsData,
    youtubeResult: '50M6B-YRTe8',
    mixesDbResults: [
        'Stranger - Strobe FM Podcast 059',
        'Slam - Cadenza Podcast 155',
        'Frank Biazzi - Transmissions 361',
        'Stranger - Invite%27s Choice Podcast 262',
        ' - Sigha - Resident Advisor Top 10',
        'Dustin Zahn - Awakenings Podcast 038',
        'Chris Liebing @ Rekids Label Party, Revier S%C3%BCdost, Griessm%C3%BChle, Berlin (am/fm)',
        'Sedvs - HATE Podcast 005',
        'Regis @ %CE%A013: 2 years of %CF%80, Six D.O.G.S, Athens',
        'Joris Voorn @ Awakenings, Spaarnwoude, Amsterdam',
    ],
    test: 'doobie-smoking-quote',
};

export const mockSoundcloudLinks = [
    { title: 'DD@PARALLEL_19_PART.1', url: 'https://soundcloud.com/donato-dozzy/ddparallel_19_part1' },
    { title: 'DD@PARALLEL_19_PART.2', url: 'https://soundcloud.com/donato-dozzy/ddparallel_19_part2' },
    {
        title: 'Oscar Mulero - Source Artists Live Streaming - 11.04.2020',
        url: 'https://soundcloud.com/oscarmulero/oscar-mulero-source-artists-live-streaming-11042020',
    },
    {
        title: 'Nada Records / Stanislav Tolkachev @ Gare Porto',
        url: 'https://soundcloud.com/nadarecords/nada-records-stanislav-tolkachev-gare-porto',
    },
    {
        title: 'Vladimir Dubyshkin live at Reaktor 2019',
        url: 'https://soundcloud.com/reaktorevents/vladimir-dubyshkin-live-at-reaktor-2019',
    },
    {
        title: 'Fugal at Tresor, Berlin (New Faces | May 3, 2017)',
        url: 'https://soundcloud.com/fugal/fugal-at-tresor-berlin-new-faces-2017',
    },
    {
        title: "Invite's Choice Podcast 588 - Roseen",
        url: 'https://soundcloud.com/invite-1/invites-choice-podcast-588-roseen',
    },
];
