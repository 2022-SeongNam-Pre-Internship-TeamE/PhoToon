#!/bin/bash
# wait-for 적용파일
set -e
set -x

host="$1"
shift
cmd="$@"

until mysql -h "$host" -u root -p 1234 tts -e 'select 1'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "Mysql is up - executing command"
exec $cmd
