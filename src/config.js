export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "app-dog-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://v3dfcliq23.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_lZyNzxLpl",
    APP_CLIENT_ID: "7a470d45rirfsjbd01llt6em0s",
    IDENTITY_POOL_ID: "us-east-1:c8858a20-180f-45ac-b6fd-cc096cafdb94"
  },
  iot: {
    REGION: "us-east-1",
    ENDPOINT: "a1ibjimaoot6ov.iot.us-east-1.amazonaws.com"
  }
};