
.PHONY: del
del:
	find ./backend/src/log -mindepth 1 ! -name '.gitignore' -delete
	rm -f ./backend/install/installed
	cat /dev/null > ./backend/install/install.conf
	docker stop todojs_server || echo "..."
	docker stop todojs_mysql || echo "..."
	docker rm todojs_server || echo "..."
	docker rm todojs_mysql || echo "..."
	docker rmi backend-todojs_server || echo "..."
	docker rmi backend-todojs_mysql || echo "..."

.PHONY: build
build:
	docker-compose -f backend/docker-compose.yaml up -d

.PHONY: rebuild
rebuild: del build
