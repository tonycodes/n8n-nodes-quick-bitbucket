# n8n-nodes-quick-bitbucket

This is an n8n community node that provides simplified Bitbucket operations with smart defaults and common workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

Quick Bitbucket makes it easy to:
- **Commit Files**: Create or update files and commit them to a repository
- **Create Pull Requests**: Open new pull requests with ease
- **Manage PRs**: Add comments, get details, merge, and search pull requests
- **Branch Operations**: Create branches and get file content
- **Smart Defaults**: Sensible defaults reduce configuration time

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Or install directly via npm:

```bash
npm install n8n-nodes-quick-bitbucket
```

## Operations

### 1. Commit Files
Create or update multiple files in a single commit.

**Use case**: Automatically update configuration files, documentation, or code from workflow data.

**Example**: Update a README file based on workflow input
```
Repository: my-project
Branch: main
Files:
  - Path: README.md
    Content: # Updated Documentation\n\nThis was updated automatically.
Commit Message: Update README via n8n workflow
```

### 2. Create Pull Request
Open a new pull request from one branch to another.

**Use case**: Automate PR creation after feature branches are ready.

**Example**: Create a PR for a feature branch
```
Repository: my-project
Source Branch: feature/new-feature
Destination Branch: main
Title: Add new authentication feature
Description: This PR implements the new OAuth authentication flow.
```

### 3. Add PR Comment
Add a comment to an existing pull request.

**Use case**: Add automated test results, deployment status, or code review notes to PRs.

**Example**: Post test results to a PR
```
Repository: my-project
Pull Request ID: 42
Comment: ✅ All tests passed! Ready for review.
```

### 4. Get Pull Request
Retrieve details about a specific pull request.

**Use case**: Check PR status, get approval information, or extract PR metadata.

**Example**: Get PR details
```
Repository: my-project
Pull Request ID: 42
```

### 5. Merge Pull Request
Merge an approved pull request using different merge strategies.

**Use case**: Automate merging after all checks pass.

**Example**: Merge with squash strategy
```
Repository: my-project
Pull Request ID: 42
Merge Strategy: Squash
Close Source Branch: Yes
```

### 6. Search Pull Requests
Search and filter pull requests by state.

**Use case**: Find open PRs, check for merged PRs, or monitor PR status.

**Example**: Get all open PRs
```
Repository: my-project
State: Open
```

### 7. Get File Content
Retrieve the content of a file from the repository.

**Use case**: Read configuration files, check versions, or process file content in workflows.

**Example**: Read a configuration file
```
Repository: my-project
Branch: main
File Path: config/settings.json
```

### 8. Create Branch
Create a new branch from an existing branch.

**Use case**: Automatically create feature branches or release branches.

**Example**: Create a feature branch
```
Repository: my-project
Branch Name: feature/new-api-endpoint
Source Branch: main
```

## Credentials

This node requires Bitbucket credentials using an **App Password**. You'll need:

1. **Workspace**: Your Bitbucket workspace name (appears in URLs)
2. **Username**: Your Bitbucket username
3. **App Password**: Create from [Bitbucket App Passwords Settings](https://bitbucket.org/account/settings/app-passwords/)

Required permissions for the App Password:
- Repositories: Read, Write
- Pull requests: Read, Write

## Compatibility

Tested with n8n v1.0.0+

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Bitbucket API documentation](https://developer.atlassian.com/cloud/bitbucket/rest/)
* [Bitbucket App Passwords guide](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)

## Version history

- **0.1.0**: Initial release with commit, PR, and branch operations

## License

[MIT](LICENSE.md)

## Author

Tony James (me@tony.codes)
