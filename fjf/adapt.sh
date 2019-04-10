#!/bin/sh

file=$1

convert "$file" -crop 16x658+0+0 +repage jobs.png
convert "$file" -crop 16x30+300+0 +repage dead.png
convert jobs.png dead.png -append "$file"

rm jobs.png dead.png
