import glob
import os
import imagehash
from PIL import Image

# Open the target image
target_image = Image.open('goat_photo_test.jpg')
#target_image = target_image.resize((720, 648))
target_hash = imagehash.phash(target_image)

image_list = glob.glob(os.path.join('./', '*.jpg'))

# Open the comparison images
comparison_images = [Image.open(f) for f in ['goat_photo.jpg']]
comparison_hashes = [imagehash.phash(img) for img in comparison_images]

# Compare the target image with each comparison image
for i, comparison_hash in enumerate(comparison_hashes):
    similarity = target_hash - comparison_hash
    print(f'Similarity with image {i+1}: {similarity}')
