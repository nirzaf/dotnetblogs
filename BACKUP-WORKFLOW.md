# Automatic Backup Branch Creation

This project includes an automated workflow that creates backup branches after successful builds. This provides a safety net and historical record of the codebase at key points in development.

## How It Works

1. When a push is made to the `main` branch, the `Build and Deploy` workflow runs.
2. If the build is successful, the `Create Backup Branch After Successful Build` workflow is triggered.
3. This workflow creates a new branch with a name that includes:
   - A timestamp in the format `YYYY-MM-DD-HHMMSS`
   - A sanitized version of the latest commit message
   - Example: `backup/2025-05-10-123045-fix-navigation-menu`
4. The workflow also includes an optional step to clean up old backup branches, keeping only the 10 most recent ones.

## Accessing Backup Branches

You can find all backup branches by:
1. Going to the GitHub repository
2. Clicking on the branch dropdown
3. Typing "backup/" in the filter box

## Restoring from a Backup Branch

To restore your codebase to the state of a backup branch:

```bash
# Fetch all branches
git fetch origin

# Checkout the backup branch
git checkout backup/YYYY-MM-DD-HHMMSS-commit-message

# Create a new branch from this point if you want to make changes
git checkout -b my-restoration-branch

# Or reset your main branch to this point (use with caution)
git checkout main
git reset --hard backup/YYYY-MM-DD-HHMMSS-commit-message
git push --force origin main  # CAUTION: This rewrites history
```

## Customizing the Workflow

You can customize the backup workflow by editing the `.github/workflows/backup-after-build.yml` file:

- Change the number of backup branches to keep by modifying the `10` in the cleanup step
- Adjust the branch naming format
- Add additional actions to take after creating the backup branch
