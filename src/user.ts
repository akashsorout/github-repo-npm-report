import { Repo } from "./Repo";

export class User {
    login: string;
    fullName: string;
    repoCount: number;
    repos?: Repo[];
    constructor(userResponse: any) {
        this.login = userResponse.login;
        this.fullName = userResponse.name;
        this.repoCount = userResponse.public_repos;
    }

}