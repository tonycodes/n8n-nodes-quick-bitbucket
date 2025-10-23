import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class QuickBitbucketApi implements ICredentialType {
	name = 'quickBitbucketApi';

	displayName = 'Quick Bitbucket API';

	documentationUrl = 'https://support.atlassian.com/bitbucket-cloud/docs/api-tokens/';

	icon = 'file:bitbucket.svg' as const;

	properties: INodeProperties[] = [
		{
			displayName: 'Workspace',
			name: 'workspace',
			type: 'string',
			default: '',
			placeholder: 'my-workspace',
			description: 'Your Bitbucket workspace name (appears in URLs)',
			required: true,
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			placeholder: 'john.doe',
			description: 'Your Bitbucket username or email address',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Generate an API key from your <a href="https://bitbucket.org/account/settings/api-keys/" target="_blank">Bitbucket API Keys Settings</a>. Required permissions: Repositories (Read, Write), Pull requests (Read, Write)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.bitbucket.org/2.0',
			url: '/user',
		},
	};
}
