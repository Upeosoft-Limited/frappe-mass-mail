from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in massmail/__init__.py
from massmail import __version__ as version

setup(
	name="massmail",
	version=version,
	description="Frappe service to send mass emails",
	author="Karani Geoffrey",
	author_email="karani@upeosoft.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
