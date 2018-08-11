import { Auth } from 'aws-amplify';


export const getCurrentCredentials = () => (
  new Promise((resolve, reject) => {
    Auth.currentCredentials()
      .then(creds => resolve(creds))
      .catch(error => reject(error));
  })
);