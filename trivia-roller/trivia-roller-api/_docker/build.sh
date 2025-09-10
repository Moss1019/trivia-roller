#!/bin/bash

current_dir=$(pwd)

cd ..

gradle clean && gradle quarkusBuild -Dquarkus.profile=docker

cd _docker
mv ../build/quarkus-app quarkus-app

docker build -t trivia-roller-api .

rm -r $current_dir/quarkus-app
