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
    const isString = typeof res === 'string'
    return {
        url: url,
        title: (!isString && "title" in res) ? res.title : null,
        description: (!isString && "description" in res) ? res.description : null,
        image: (!isString && "images" in res && res.images.length > 0) ? res.images[0] : null,
        siteName: (!isString &&"siteName" in res )? res.siteName : null,
        favicon: (!isString && "favicons" in res) ? getLargestFavicon(res.favicons) : null,
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

export function stripYouTubeUrl(url: string): string {
  const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/watch?v=${ytMatch[1]}`;
  }
  return url;
}