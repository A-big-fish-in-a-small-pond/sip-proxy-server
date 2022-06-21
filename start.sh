pm2 start ./dist/index.js --name prepay-proxy -i 3 --max-memory-restart 140M
pm2 start /var/lib/asterisk/agi-bin/server.js --name prepay-agi -i 3 --max-memory-restart 140M
