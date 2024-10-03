import request from "request";
import { User } from "./user";
import { Repo } from "./Repo";

const options: any = {
    headers: {
        'User-Agent': 'request'
    },
    json: true

}

export class GithubApiService {
    getUserInfo(userName: string, callbackF?: (user: User) => any) {
        return request.get('https://api.github.com/users/' + userName, options,
            (error: any, response: any, body: any) => {
                if (error != null) {
                    console.error(error);
                }
                else {
                    let user = new User(body);
                    if (callbackF) {
                        callbackF(user);
                    }

                }

            }
        );
    }

    getRepos(userName: string, callbackF?: (repos: Repo[]) => any) {
        request.get('https://api.github.com/users/' + userName + "/repos", options,
            (error: any, response: any, body: any) => {
                if (error != null) {
                    console.error(error);
                }
                else {
                    let repos: Repo[] = body.map((it: any) => new Repo(it));
                    if (callbackF) {
                        callbackF(repos);
                    }

                }

            }
        );
    }


    getUserInfoAsync(username: string) {
        return fetch("https://api.github.com/users/" + username)
            .then(it => it.json())
            .then(it => new User(it));
    }


    getRepoInfoAsync(username: string) {
        return fetch("https://api.github.com/users/" + username + "/repos")
            .then(it => it.json())
            .then(it => it.map((r: any) => new Repo(r)));
    }

}