from diffusers import AutoPipelineForText2Image
import torch
from flask import Flask, request, jsonify, send_file
import io
import os
import uuid
from flask_cors import CORS  # 添加这行
from translate import translate  # 假设translate.py在同一目录下
app = Flask(__name__)
CORS(app)  # 添加这行

# 初始化模型
pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/sdxl-turbo",
    torch_dtype=torch.float16,
    variant="fp16"
)
pipe = pipe.to("cuda")

# 创建输出目录
os.makedirs("outputs", exist_ok=True)


@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "active", "message": "Backend is running"}), 200


@app.route('/generate', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        # 打印接收到的prompt
        print(f"Received prompt: {prompt}")
        prompt = translate(prompt)  # 翻译为英文
        # 生成图像
        image = pipe(prompt, num_inference_steps=4, guidance_scale=0.0).images[0]

        # 保存图像
        filename = f"outputs/{uuid.uuid4()}.png"
        image.save(filename)

        # 返回图像URL
        return jsonify({
            "status": "success",
            "image_url": f"/get_image/{filename.split('/')[-1]}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_image/<filename>', methods=['GET'])
def get_image(filename):
    try:
        return send_file(f"..\\outputs\\{filename}", mimetype='image/png')
    except FileNotFoundError:
        return jsonify({"error": "Image not found"}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
