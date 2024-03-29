# Loadimpact k6 simple test

Test for simple API calls using k6 

run application https://drive.google.com/file/d/16er8Bzudf2k892AFSal4VYh94JJic5-Z/view?usp=sharing 
Make sure application started sucessfully at localhost:8080

## Important note: 
Update TestOrderAccept.js after cloning the project
Change <url> variable to your ip address, to find it run:
```ifconfig | grep inet```


## Installation
Install Docker 
```https://docs.docker.com/```
Install k6 using doker 
```docker pull loadimpact/k6```
Clone project to local folder

Build your project
```docker build -t load-testing -f Dockerfile .```

To start test run command
```docker run -d load-testing run TestOrderAccept.js```
By default it will simulate rampup of traffic from 1 to 200 users over 5 minutes.

This could be changed in TestOrderAccept.js file (you can find proper place via comments)

Optionaly parameters could be added from command line, see the reference here :https://docs.k6.io/docs/running-k6

## Usage
To generate reports you can use official K6 graphana documentation https://docs.k6.io/docs/influxdb-grafana
Once you have Graphana up and running at  http://localhost:3000
```docker run load-testing run --out influxdb=http://10.227.200.51:8086/myk6db TestOrderAccept.js```

Note: change ip address to yours

For best visualization use Graphana pre-configured Dashboard like:

https://grafana.com/dashboards/2587

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
