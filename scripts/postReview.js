const { Octokit } = require('@octokit/rest');
const fs = require('fs');

const githubToken = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: githubToken });

const postReview = async () => {
    const reviewComments = fs.readFileSync('scripts/reviewComments.txt', 'utf8');

    if (!reviewComments) {
        console.log('No comments to post.');
        return;
    }

    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    const pull_number = process.env.GITHUB_REF.split('/').pop();

    try {
        await octokit.pulls.createReview({
            owner,
            repo,
            pull_number,
            body: reviewComments,
            event: 'COMMENT',
        });

        console.log('Review posted successfully');
    } catch (error) {
        console.error('Error posting review to GitHub:', error);
        process.exit(1);
    }
};

postReview();
