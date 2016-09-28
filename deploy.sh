NEWNAME=startupevents$RANDOM
NEWCONTAINER=$NEWNAME-web-1
IP="209.177.85.124"
IMAGE="kevinsimper/startupevents:latest"
hyper pull $IMAGE
hyper compose up -f hyper-compose.yml -d -p $NEWNAME
OLD=$(hyper fip ls | grep $IP | awk '{print $2}')
hyper fip detach $OLD
hyper fip attach $IP $NEWCONTAINER
