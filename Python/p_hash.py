import imagehash
from PIL import Image
from flask import Flask, jsonify, request

app = Flask(__name__)
@app.route('/api/compare', methods=['POST'])

def compare():
    target_image = Image.open(request.json['target_image'])
    target_hash = imagehash.phash(target_image)

    image_list = request.json['image_list']
    comparison_images = [Image.open(f) for f in image_list]
    comparison_hashes = [imagehash.phash(img) for img in comparison_images]

    similarity = []
    for i, comparison_hash in enumerate(comparison_hashes):
        similarity.append((target_hash - comparison_hash, image_list[i]))

    return jsonify(min(similarity))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
