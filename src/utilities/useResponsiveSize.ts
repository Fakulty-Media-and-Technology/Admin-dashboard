import { useWindowSize } from "@/hooks/useWindowSize";

function useResponsiveSize(size: number, otherParams?: string): number {
  const { height, width } = useWindowSize();

  if (otherParams === "getHeight") return height;
  if (otherParams === "getWidth") return width;

  if (otherParams === "useHeight") return (height / 100) * size;

  if (otherParams === "useWidth") return (width / 100) * size;

  return 0;
}

const Size = {
  calcHeight(size: number) {
    return useResponsiveSize(size, "useHeight");
  },

  calcWidth(size: number) {
    return useResponsiveSize(size, "useWidth");
  },

  calcAverage(size: number) {
    return useResponsiveSize(size);
  },

  getHeight() {
    return useResponsiveSize(1, "getHeight");
  },

  getWidth() {
    return useResponsiveSize(1, "getWidth");
  },
};

export default Size;
