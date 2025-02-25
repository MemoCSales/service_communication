import fetch from 'node-fetch';

const AUTH_SERVICE_URL = 'http://authentication:3000';

async function testApiCommunication() {
	try {
		// Test basic API connectivity
		const response = await fetch(`${AUTH_SERVICE_URL}/api/test`);
		const data = await response.json();
		console.log('API Test Response:', data);

		// Test user endpoint
		const userResponse = await fetch(`${AUTH_SERVICE_URL}/api/users/1`);
		const userData = await userResponse.json();
		console.log('User API Response:', userData);

	} catch (error) {
		console.error('Test failed:', error);
	}
}

testApiCommunication();