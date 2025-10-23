import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class QuickBitbucketApi implements ICredentialType {
	name = 'quickBitbucketApi';

	displayName = 'Quick Bitbucket API';

	documentationUrl = 'https://support.atlassian.com/bitbucket-cloud/docs/oauth-consumer-tokens/';

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
			description: 'Your Bitbucket username',
			required: true,
		},
		{
			displayName: 'App Password',
			name: 'appPassword',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Create an app password from your <a href="https://bitbucket.org/account/settings/app-passwords/" target="_blank">Bitbucket App Passwords Settings</a>. Required permissions: Repositories (Read, Write), Pull requests (Read, Write)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.appPassword}}',
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
