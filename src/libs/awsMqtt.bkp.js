import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';

import { getCurrentCredentials } from './auth';

import config from "../config";

AWS.config.region = 'us-east-1'; // your region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:72fcd437-414d-4d78-92ba-5c9380c55d3f'
});

const c = params => AWSMqtt.connect(params);

export const c = async ({
        WebSocket: window.WebSocket, 
        region: config.iot.REGION,
        credentials: await getCurrentCredentials,
        endpoint: config.iot.ENDPOINT,
        clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)), // clientId to register with MQTT broker. Need to be unique per client
        will: {
            topic: 'WillMsg',
            payload: 'Connection Closed abnormally..!',
            qos: 0,
            retain: false
        } 
    });

export default c;