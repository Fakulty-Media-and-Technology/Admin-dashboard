import { LinkViewProps } from "@/types/packages"

function getLargestFavicon(favicons: string[]): string {
    return favicons.sort((a: string, b: string) => {
        const matchA = a.match(/favicon-(\d+)/)
        const matchB = b.match(/favicon-(\d+)/)
        const sizeA = matchA ? parseInt(matchA[1]) : 0
        const sizeB = matchB ? parseInt(matchB[1]) : 0
        return sizeB - sizeA
    })[0]
}


export function transformResponse(res: any, url: string): LinkViewProps {
    return {
        title: "title" in res ? res.title : null,
        description: "description" in res ? res.description : null,
        image: "images" in res && res.images.length > 0 ? res.images[0] : null,
        url: url,
        siteName: "siteName" in res ? res.siteName : null,
        favicon: "favicons" in res ? getLargestFavicon(res.favicons) : null,
    }
}

export function normalizeUrl(url: string): string {
    if (!/^https?:\/\//i.test(url)) {
        return "https://" + url
    }
    return url
}

export function isValidUrl(url: string): boolean {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
    return urlPattern.test(url);
}