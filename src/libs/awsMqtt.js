import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { getCurrentCredentials } from './auth';
import config from '../config';

/**
 * Attaches the current user credentials to the AWSIoTProvider so
 * the signed in user has the ability to recieve data from subscribed
 * MQTT Topics.
 *
 * Resolves a promise if the credentials were received and the Provider
 * was successfully attached to the amplify class
 */
export const attachIotPolicy = () => (
  new Promise((resolve, reject) => {
    getCurrentCredentials()
      .then((credentials) => {
        Amplify.addPluggable(new AWSIoTProvider({
          aws_pubsub_region: config.iot.REGION,
          aws_pubsub_endpoint: `wss://${config.iot.ENDPOINT}/mqtt`,
          credentials,
        }));
        resolve();
      })
      .catch((error) => {
        console.log('Error when getting credentials in order to attach an Iot policy', error);
        reject(error);
      });
  })
);

/**
 * Subscribes to multiple MQTT Topics
 *
 * @param {array} topics an array of strings of the topics that are being subscribed to
 * @param {fn} messageHandler the handler that should be called when a message is received
 */
export const IotSubs = (topics, messageHandler) => {
  attachIotPolicy()
    .then(() => {
      PubSub.subscribe(topics).subscribe({
        next: (data) => {
          console.log('Message received', data);
          if (messageHandler) messageHandler(data);
        },
        error: error => console.error(error),
        close: () => console.log('Done'),
      });
    })
    .catch(error => console.log('Error when trying to attach an Iot Policy: ', error));
};