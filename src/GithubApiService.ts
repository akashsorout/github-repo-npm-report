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


    async getUserInfoAsync(username: string) {
        const it = await fetch("https://api.github.com/users/" + username);
        const it_1 = await it.json();
        return new User(it_1);
    }


    async getRepoInfoAsync(username: string) {
        const it = await fetch("https://api.github.com/users/" + username + "/repos");
        const it_1 = await it.json();
        return it_1.map((r: any) => new Repo(r));
    }

}