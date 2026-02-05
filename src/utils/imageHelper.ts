import snowboardImage from "@/assets/snowboard.avif";
import skiImage from "@/assets/ski.jpg";
import bootsImage from "@/assets/boots.jpg";
import clothingImage from "@/assets/clothing.jpg";
import accessoriesImage from "@/assets/accessories.jpg";

// Map of image filenames to their imported paths
const imageMap: Record<string, string> = {
  "snowboard.avif": snowboardImage,
  "ski.jpg": skiImage,
  "boots.jpg": bootsImage,
  "clothing.jpg": clothingImage,
  "accessories.jpg": accessoriesImage,
};

/**
 * Get the full image path from a filename
 * Falls back to snowboard image if not found
 */
export const getImageUrl = (filename: string | null | undefined): string => {
  if (!filename) {
    return snowboardImage;
  }

  // Return the mapped image or fallback to snowboard
  return imageMap[filename] || snowboardImage;
};
