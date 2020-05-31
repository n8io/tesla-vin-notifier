#!/bin/bash
set -Eeuo pipefail
CHECK_FILE=/tmp/tesla-notifier.txt

trap "echo Something failed. See logs for details" ERR

if [[ -f "$CHECK_FILE" ]]; then
  echo "Aborting run. Check file exists at $CHECK_FILE"
  exit 0
fi

VIN=$(node ./test.js)

if [[ -z $VIN ]]; then
  echo "No VIN found"
else
  echo "VIN found: ${VIN}"
  echo $(date) > "$CHECK_FILE"
  echo $VIN >> "$CHECK_FILE"
fi
