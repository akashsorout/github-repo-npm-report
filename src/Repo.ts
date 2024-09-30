export class Repo {
    name: string;
    description: string;
    constructor(repoResponse: any) {
        this.name = repoResponse.name;
        this.description = repoResponse.description;
    }

}