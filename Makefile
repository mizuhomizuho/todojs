
.PHONY: del
del:
	node backend/src/script/clear.js
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

.PHONY: dev
dev:
	chokidar "backend/src/server/app/**/*" -c "docker exec todojs_server pm2 restart server"
