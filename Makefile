include .env

login:
	docker login ${CI_REGISTRY} --username ${CI_REGISTRY_USER} --password ${CI_REGISTRY_PASSWORD}

pull-image:
	docker pull ${CONTAINER_REGISTRY_URL}:${CI_COMMIT_BRANCH}

push-image:
	docker push ${CONTAINER_REGISTRY_URL}:${CI_COMMIT_BRANCH}

build-image:
	docker build --progress=plain -t ${CONTAINER_REGISTRY_URL}:${CI_COMMIT_BRANCH} .
update-service:
	docker service update --force --with-registry-auth  --image  registry.gitlab.com/mahdiy-tech/arenda-atlas:${CI_COMMIT_BRANCH} mahdiy_${PROJECT_NAME}

clean:
	docker system prune --force --all

pull-all:
	git pull origin prod
	git pull origin preprod
	git pull origin test
	git pull origin dev