from setuptools import setup, find_packages

setup(
    name="digit-recognition-api",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "flask==2.2.2",
        "pillow==9.3.0",
        "numpy==1.23.5",
        "flask-cors",
    ],
    python_requires=">=3.8",
)