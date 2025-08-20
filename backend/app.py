import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PyPDF2 import PdfReader
from pptx import Presentation
import google.generativeai as genai
from dotenv import load_dotenv

# Load API Key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)

# ---------- Helper Functions ----------

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        if page.extract_text():
            text += page.extract_text() + "\n"
    return text.strip()

def generate_summary(text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Summarize the following PDF content in a clear, concise way for presentation slides:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text


def create_ppt(summary, output_file="summary.pptx"):
    from pptx import Presentation

    prs = Presentation()
    layout = prs.slide_layouts[1]  # Title + Content

    lines = [line.strip() for line in summary.split("\n") if line.strip()]
    
    current_title = "Summary"
    current_bullets = []

    for line in lines:
        # Treat as heading if it’s not a bullet
        if not line.startswith("-") and not line.startswith("•"):
            # If bullets already collected → save slide
            if current_bullets:
                slide = prs.slides.add_slide(layout)
                slide.shapes.title.text = current_title
                slide.placeholders[1].text = "\n".join(current_bullets)
                current_bullets = []

            current_title = line.replace("**", "").strip()
        else:
            bullet = line.replace("-", "•").strip()
            current_bullets.append(bullet)

            # Force slide break after 5 bullets
            if len(current_bullets) >= 5:
                slide = prs.slides.add_slide(layout)
                slide.shapes.title.text = current_title
                slide.placeholders[1].text = "\n".join(current_bullets)
                current_bullets = []

    # Add last slide
    if current_bullets:
        slide = prs.slides.add_slide(layout)
        slide.shapes.title.text = current_title
        slide.placeholders[1].text = "\n".join(current_bullets)

    # If still empty, fallback
    if not prs.slides:
        slide = prs.slides.add_slide(layout)
        slide.shapes.title.text = "Summary"
        slide.placeholders[1].text = summary

    prs.save(output_file)
    return output_file


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to AIdeaDeck API! Use /upload to upload your PDF."})

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(file_path)

    text = extract_text_from_pdf(file_path)

    summary = generate_summary(text)

    ppt_path = create_ppt(summary)

    return jsonify({
        "summary": summary,
        "ppt_download_url": "http://127.0.0.1:5000/download_ppt"
    })

@app.route("/download_ppt", methods=["GET"])
def download_ppt():
    return send_file("summary.pptx", as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)

