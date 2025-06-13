export const getMimeType = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;

    if (/youtube\.com|youtu\.be/.test(url)) return 'video/youtube';
    if (pathname.includes('.m3u8')) return 'application/x-mpegURL';
    if (pathname.includes('.mp4')) return 'video/mp4';
    if (pathname.includes('.webm')) return 'video/webm';

    return 'video/mp4'; // default fallback
  } catch (error) {
    console.error('Invalid URL:', url);
    return 'video/mp4'; // safe fallback
  }
};
