import type { Action } from "@sveltejs/kit";
import { TwitterApi } from "twitter-api-v2";

export const POST: Action = async ({ request, url }) => {

	const message = await request.text();
	const consumerKey = url.searchParams.get("consumer_key") ?? "";
	const consumerSecret = url.searchParams.get("consumer_secret") ?? "";
	const accessTokenKey = url.searchParams.get("access_token_key") ?? "";
	const accessTokenSecret = url.searchParams.get("access_token_secret") ?? "";

	if (!consumerKey ||
		!consumerSecret ||
		!accessTokenKey ||
		!accessTokenSecret) {
		throw new Error("consumer_key、consumer_secret、access_token_key または access_token_secretを URL で指定してください。");
	}

	// 記録情報で認証
	const client = new TwitterApi({
		appKey: consumerKey,
		appSecret: consumerSecret,
		accessToken: accessTokenKey,
		accessSecret: accessTokenSecret,
	});

	client.v2.tweet(message);

	return new Response("{}");
}
