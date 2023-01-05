import { Lambda } from "@aws-sdk/client-lambda";
import { ResourceGroupsTaggingAPI } from "@aws-sdk/client-resource-groups-tagging-api";

export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;

export type Region = "us-west-2" | "us-west-1" | "us-east-1" | "us-east-2";
export const REGIONS: Region[] = [
	"us-west-2",
	"us-west-1",
	"us-east-1",
	"us-east-2",
];
export const REGION_OPTIONS = REGIONS.map((r) => ({ label: r, value: r }));

const createConfiguration = (region: Region) => ({
	region,
	credentials: {
		secretAccessKey: SECRET_ACCESS_KEY,
		accessKeyId: ACCESS_KEY_ID,
	},
});

export const createLambda = (region: Region) =>
	new Lambda(createConfiguration(region));
export const createResourcesGroupsTaggingAPI = (region: Region) =>
	new ResourceGroupsTaggingAPI(createConfiguration(region));
