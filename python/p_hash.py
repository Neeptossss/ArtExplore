import glob
import os
import imagehash
from PIL import Image
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './upload'
app.config['MAX_CONTENT_PATH'] = 1000000000000 * 1000000000000

@app.route('/api/compare', methods=['POST'])

def compare():
    f = request.files['file']
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))
    target_image = Image.open('./upload/' + secure_filename(f.filename))
    target_hash = imagehash.phash(target_image)

    image_list = glob.glob(os.path.join('./stockPicture', '*.JPG'))
    comparison_images = [Image.open(f) for f in image_list]
    comparison_hashes = [imagehash.phash(img) for img in comparison_images]

    similarity = []
    for i, comparison_hash in enumerate(comparison_hashes):
        similarity.append((target_hash - comparison_hash, image_list[i]))

    return jsonify(min(similarity))

if __name__ == '__main__':
    app.run(debug=False, port=5000)
