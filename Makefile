
.PHONY: del
del:
	find ./backend/src/log -mindepth 1 ! -name '.gitignore' -delete
	rm -f ./backend/install/install.log
	cat /dev/null > ./backend/install/installed.conf
	rm -rf ./backend/node_modules
	rm -f ./backend/package.json
	rm -f ./backend/package-lock.json
	docker stop todojs_server || echo "..."
	docker stop todojs_postgres || echo "..."
	docker rm todojs_server || echo "..."
	docker rm todojs_postgres || echo "..."
	docker rmi backend-todojs_server || echo "..."

.PHONY: build
build:
	docker-compose -f backend/docker-compose.yaml up -d

.PHONY: rebuild
rebuild: del build
