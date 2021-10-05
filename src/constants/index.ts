import { Lambda } from "@aws-sdk/client-lambda";
import { ResourceGroupsTaggingAPI } from "@aws-sdk/client-resource-groups-tagging-api";

export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;

const CONFIGURATION = {
	region: "us-west-2",
	credentials: {
		secretAccessKey: SECRET_ACCESS_KEY,
		accessKeyId: ACCESS_KEY_ID,
	},
};

export const LAMBDA = new Lambda(CONFIGURATION);
export const RESOURCE_GROUPS_TAGGING_API = new ResourceGroupsTaggingAPI(
	CONFIGURATION
);
