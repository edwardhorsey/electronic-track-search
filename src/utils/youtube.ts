import { keyYoutube } from '../config';

export async function getYoutubeData(searchString: string): Promise<string> {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${keyYoutube}&type=video&q=${searchString}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data?.items.length) {
            const { videoId } = data.items[0].id;

            return videoId;
        }
    } catch (error) {
        console.log(error);
    }

    return '';
}
