import glob
import os
import imagehash
from PIL import Image

target_image = Image.open('goat_photo_test.jpg')
target_hash = imagehash.phash(target_image)

image_list = glob.glob(os.path.join('./stockPicture', '*.jpg'))

comparison_images = [Image.open(f) for f in image_list]
comparison_hashes = [imagehash.phash(img) for img in comparison_images]

similarity = []
for i, comparison_hash in enumerate(comparison_hashes):
    similarity.append((target_hash - comparison_hash, image_list[i]))

print(min(similarity))
