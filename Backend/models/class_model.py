import zipfile
import os

def extract_images(zip_path):
    extract_folder = zip_path.replace(".zip", "")
    os.makedirs(extract_folder, exist_ok=True)

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_folder)

    return extract_folder
