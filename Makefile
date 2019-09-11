PROJECT_DIR = $(shell pwd)

build_frontend:
	cd $(PROJECT_DIR)/frontend && yarn build

create_frontend_static:
	rm -rf $(PROJECT_DIR)/backend/react/*
	rm -rf $(PROJECT_DIR)/frontend/build
	$(MAKE) build_frontend
	mv $(PROJECT_DIR)/frontend/build backend/react

deploy:
	$(MAKE) create_frontend_static
	cd $(PROJECT_DIR)/backend && eb deploy
