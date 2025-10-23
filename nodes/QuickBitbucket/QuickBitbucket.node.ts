import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

export class QuickBitbucket implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Quick Bitbucket',
		name: 'quickBitbucket',
		icon: 'file:bitbucket.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Simplified Bitbucket operations with smart defaults',
		defaults: {
			name: 'Quick Bitbucket',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'quickBitbucketApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Add PR Comment',
						value: 'addPRComment',
						description: 'Add a comment to a pull request',
						action: 'Add comment to pull request',
					},
					{
						name: 'Commit Files',
						value: 'commitFiles',
						description: 'Create or update files and commit to repository',
						action: 'Commit files to repository',
					},
					{
						name: 'Create Branch',
						value: 'createBranch',
						description: 'Create a new branch',
						action: 'Create a branch',
					},
					{
						name: 'Create Pull Request',
						value: 'createPR',
						description: 'Create a new pull request',
						action: 'Create a pull request',
					},
					{
						name: 'Get File Content',
						value: 'getFileContent',
						description: 'Get the content of a file from repository',
						action: 'Get file content',
					},
					{
						name: 'Get Pull Request',
						value: 'getPR',
						description: 'Get details of a pull request',
						action: 'Get pull request details',
					},
					{
						name: 'Merge Pull Request',
						value: 'mergePR',
						description: 'Merge a pull request',
						action: 'Merge a pull request',
					},
					{
						name: 'Search Pull Requests',
						value: 'searchPRs',
						description: 'Search for pull requests',
						action: 'Search pull requests',
					},
				],
				default: 'commitFiles',
			},

			// Commit Files operation
			{
				displayName: 'Repository',
				name: 'repository',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['commitFiles', 'createPR', 'getFileContent', 'createBranch'],
					},
				},
				default: '',
				placeholder: 'my-repo',
				description: 'The repository slug (appears in URLs)',
			},
			{
				displayName: 'Branch',
				name: 'branch',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['commitFiles', 'getFileContent'],
					},
				},
				default: 'main',
				description: 'The branch to commit to or read from',
			},
			{
				displayName: 'Files',
				name: 'files',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						operation: ['commitFiles'],
					},
				},
				default: {},
				placeholder: 'Add File',
				options: [
					{
						name: 'fileData',
						displayName: 'File',
						values: [
							{
								displayName: 'File Path',
								name: 'path',
								type: 'string',
								default: '',
								placeholder: 'src/index.js',
								description: 'Path to the file in the repository',
								required: true,
							},
							{
								displayName: 'Content',
								name: 'content',
								type: 'string',
								typeOptions: {
									rows: 5,
								},
								default: '',
								description: 'Content of the file',
								required: true,
							},
						],
					},
				],
			},
			{
				displayName: 'Commit Message',
				name: 'commitMessage',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['commitFiles'],
					},
				},
				default: '',
				placeholder: 'Update files',
			},

			// Create PR operation
			{
				displayName: 'Source Branch',
				name: 'sourceBranch',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createPR'],
					},
				},
				default: '',
				placeholder: 'feature/new-feature',
				description: 'The branch containing your changes',
			},
			{
				displayName: 'Destination Branch',
				name: 'destinationBranch',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createPR'],
					},
				},
				default: 'main',
				description: 'The branch you want to merge into',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createPR'],
					},
				},
				default: '',
				placeholder: 'Add new feature',
				description: 'The title of the pull request',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						operation: ['createPR'],
					},
				},
				default: '',
				description: 'The description of the pull request',
			},

			// PR operations
			{
				displayName: 'Pull Request ID',
				name: 'pullRequestId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						operation: ['addPRComment', 'getPR', 'mergePR'],
					},
				},
				default: 0,
				placeholder: '123',
				description: 'The ID of the pull request',
			},
			{
				displayName: 'Repository',
				name: 'repository',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['addPRComment', 'getPR', 'mergePR', 'searchPRs'],
					},
				},
				default: '',
				placeholder: 'my-repo',
				description: 'The repository slug',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				displayOptions: {
					show: {
						operation: ['addPRComment'],
					},
				},
				default: '',
				description: 'The comment to add',
			},

			// Merge PR options
			{
				displayName: 'Merge Strategy',
				name: 'mergeStrategy',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['mergePR'],
					},
				},
				options: [
					{
						name: 'Merge Commit',
						value: 'merge_commit',
					},
					{
						name: 'Squash',
						value: 'squash',
					},
					{
						name: 'Fast Forward',
						value: 'fast_forward',
					},
				],
				default: 'merge_commit',
				description: 'The merge strategy to use',
			},
			{
				displayName: 'Close Source Branch',
				name: 'closeSourceBranch',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['mergePR'],
					},
				},
				default: false,
				description: 'Whether to close the source branch after merging',
			},

			// Search PRs
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['searchPRs'],
					},
				},
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Declined',
						value: 'DECLINED',
					},
					{
						name: 'Merged',
						value: 'MERGED',
					},
					{
						name: 'Open',
						value: 'OPEN',
					},
					{
						name: 'Superseded',
						value: 'SUPERSEDED',
					},
				],
				default: 'OPEN',
				description: 'Filter pull requests by state',
			},

			// Get File Content
			{
				displayName: 'File Path',
				name: 'filePath',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['getFileContent'],
					},
				},
				default: '',
				placeholder: 'src/index.js',
				description: 'Path to the file in the repository',
			},

			// Create Branch
			{
				displayName: 'Branch Name',
				name: 'branchName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createBranch'],
					},
				},
				default: '',
				placeholder: 'feature/new-feature',
				description: 'The name of the new branch',
			},
			{
				displayName: 'Source Branch',
				name: 'sourceBranchForNew',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['createBranch'],
					},
				},
				default: 'main',
				description: 'The branch to create the new branch from',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0);
		const credentials = await this.getCredentials('quickBitbucketApi');
		const workspace = credentials.workspace as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'commitFiles') {
					const repository = this.getNodeParameter('repository', i) as string;
					const branch = this.getNodeParameter('branch', i) as string;
					const commitMessage = this.getNodeParameter('commitMessage', i) as string;
					const files = this.getNodeParameter('files', i) as IDataObject;

					const fileDataArray = (files.fileData as IDataObject[]) || [];

					// Bitbucket API requires form-data for file commits
					const formData: IDataObject = {};

					fileDataArray.forEach((file) => {
						const path = file.path as string;
						const content = file.content as string;
						formData[path] = content;
					});

					formData['message'] = commitMessage;
					formData['branch'] = branch;

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'POST',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/src`,
							body: formData,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
							},
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else if (operation === 'createPR') {
					const repository = this.getNodeParameter('repository', i) as string;
					const sourceBranch = this.getNodeParameter('sourceBranch', i) as string;
					const destinationBranch = this.getNodeParameter('destinationBranch', i) as string;
					const title = this.getNodeParameter('title', i) as string;
					const description = this.getNodeParameter('description', i, '') as string;

					const body = {
						title,
						description,
						source: {
							branch: {
								name: sourceBranch,
							},
						},
						destination: {
							branch: {
								name: destinationBranch,
							},
						},
						close_source_branch: false,
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'POST',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests`,
							body,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else if (operation === 'addPRComment') {
					const repository = this.getNodeParameter('repository', i) as string;
					const pullRequestId = this.getNodeParameter('pullRequestId', i) as number;
					const comment = this.getNodeParameter('comment', i) as string;

					const body = {
						content: {
							raw: comment,
						},
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'POST',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests/${pullRequestId}/comments`,
							body,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else if (operation === 'getPR') {
					const repository = this.getNodeParameter('repository', i) as string;
					const pullRequestId = this.getNodeParameter('pullRequestId', i) as number;

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'GET',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests/${pullRequestId}`,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else if (operation === 'mergePR') {
					const repository = this.getNodeParameter('repository', i) as string;
					const pullRequestId = this.getNodeParameter('pullRequestId', i) as number;
					const mergeStrategy = this.getNodeParameter('mergeStrategy', i, 'merge_commit') as string;
					const closeSourceBranch = this.getNodeParameter('closeSourceBranch', i, false) as boolean;

					const body = {
						type: mergeStrategy,
						close_source_branch: closeSourceBranch,
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'POST',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests/${pullRequestId}/merge`,
							body,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else if (operation === 'searchPRs') {
					const repository = this.getNodeParameter('repository', i) as string;
					const state = this.getNodeParameter('state', i, '') as string;

					let url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests`;

					if (state) {
						url += `?state=${state}`;
					}

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'GET',
							url,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				} else if (operation === 'getFileContent') {
					const repository = this.getNodeParameter('repository', i) as string;
					const branch = this.getNodeParameter('branch', i) as string;
					const filePath = this.getNodeParameter('filePath', i) as string;

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'GET',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/src/${branch}/${filePath}`,
							json: false,
						},
					);

					returnData.push({
						json: {
							content: response,
							path: filePath,
							branch,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'createBranch') {
					const repository = this.getNodeParameter('repository', i) as string;
					const branchName = this.getNodeParameter('branchName', i) as string;
					const sourceBranch = this.getNodeParameter('sourceBranchForNew', i) as string;

					// First, get the hash of the source branch
					const branchInfo = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'GET',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/refs/branches/${sourceBranch}`,
							json: true,
						},
					);

					const targetHash = (branchInfo as IDataObject).target as IDataObject;
					const hash = targetHash.hash as string;

					// Create the new branch
					const body = {
						name: branchName,
						target: {
							hash,
						},
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'quickBitbucketApi',
						{
							method: 'POST',
							url: `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/refs/branches`,
							body,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
