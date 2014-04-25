
install:
	# TEMPORARY_FIX: http://blog.npmjs.org/post/78085451721/npms-self-signed-certificate-is-no-more
	npm config set ca=""

	npm install

dev:
	@node server.js

.PHONY: install dev
