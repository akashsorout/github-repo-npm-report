import { GithubApiService } from './GithubApiService';
import { Repo } from './Repo';
import { User } from './user';
import * as _ from "lodash";

let githubApiService = new GithubApiService();

let username = '';
// let username = "akashsorout";
if (process.argv.length < 3) {
    console.error("Please pass username as argument");
    process.exit(1);
}
else {
    username = process.argv[2];
}

githubApiService.getUserInfo(username, (user: User) => {

    // This is callback hell -- callback -- callback -- callback

    githubApiService.getRepos(username, (repos: Repo[]) => {
        let sortedRepos = _.sortBy(repos, it => it.name)
        let top5Repos = _.take(sortedRepos, 5);
        user.repos = top5Repos;
        console.log(user)
    });
});




